import AxeBuilder from '@axe-core/playwright';
import { expect, test as base } from '@playwright/test';

// Cada test falla si la página registra errores en la consola (incluidas violaciones de la CSP).
// El 404 esperado de /servicios/no-existe no cuenta como error de la página.
const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await use(page);
    expect(errors, 'errores en la consola').toEqual([]);
  },
});

for (const route of ['/', '/contacto', '/servicios/familia', '/privacidad', '/no-existe']) {
  test(`${route} cumple WCAG 2.2 AA según axe`, async ({ page }) => {
    await page.goto(route);
    // Recorre la página para que aparezcan las tarjetas que se animan al hacer scroll.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const summary = result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    expect(summary).toEqual([]);
  });
}

test('sin JavaScript se ve todo el contenido prerenderizado', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  const card = page.locator('.service-card').first();
  await expect(card).toBeVisible();
  expect(await card.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  await context.close();
});

test('la portada muestra el carrusel, las áreas y el proceso de trabajo', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Estudio Jurídico RS/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Asesoramiento jurídico');
  await expect(page.getByRole('heading', { name: 'Áreas de práctica' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Familia', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Claridad desde la primera consulta.' })).toBeVisible();
});

test('una tarjeta lleva al servicio con un clic en cualquier parte', async ({ page }) => {
  await page.goto('/');
  // El enlace del título cubre toda la tarjeta: se hace clic en la tarjeta, lejos del título.
  const card = page.locator('article', { hasText: 'Asesoramiento en consultas y conflictos vinculados' });
  await card.getByText('Asesoramiento en consultas').scrollIntoViewIfNeeded();
  await card.click({ position: { x: 20, y: 20 } });
  await expect(page).toHaveURL('/servicios/laboral');
  await expect(page.getByRole('heading', { level: 1, name: 'Laboral' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Preguntas frecuentes' })).toBeVisible();
});

test('al cambiar de página se vuelve arriba', async ({ page }) => {
  await page.goto('/contacto');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page
    .getByRole('contentinfo')
    .getByRole('link', { name: /Volver al inicio/ })
    .click();
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('el formulario arma el mensaje de WhatsApp con el área elegida', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      window.__openedUrl = url;
      return null;
    };
  });
  await page.goto('/servicios/laboral');
  await page.getByRole('link', { name: 'Usar el formulario' }).click();
  await expect(page).toHaveURL('/contacto?area=laboral');
  const area = page.getByLabel('Área de consulta');
  await expect(area).toHaveValue('laboral');

  await page.getByLabel('Nombre').fill('Ana Pérez');
  await page.getByLabel('Mensaje').fill('Quisiera consultar por un despido.');
  await page.getByRole('button', { name: /Preparar mensaje/ }).click();

  const opened = await page.evaluate(() => window.__openedUrl);
  expect(opened).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  const message = decodeURIComponent(new URL(opened).searchParams.get('text'));
  expect(message).toContain('Hola, soy Ana Pérez.');
  expect(message).toContain('Área de consulta: Laboral.');
  expect(message).toContain('Quisiera consultar por un despido.');
});

test('las direcciones antiguas redirigen y las inexistentes muestran el 404', async ({ page }) => {
  await page.goto('/home');
  await expect(page).toHaveURL('/');
  await page.goto('/contact');
  await expect(page).toHaveURL('/contacto');

  const response = await page.goto('/servicios/no-existe');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /Este camino no lleva/ })).toBeVisible();
});

test('la política de privacidad se abre desde el pie', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Privacidad' }).click();
  await expect(page).toHaveURL('/privacidad');
  await expect(page.getByRole('heading', { level: 1, name: 'Política de privacidad' })).toBeVisible();
});

test('el carrusel se puede pausar y recorrer con los controles', async ({ page }) => {
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pausar el carrusel' });
  await pause.click();
  await expect(page.getByRole('button', { name: 'Reanudar el carrusel' })).toHaveAttribute('aria-pressed', 'true');

  await expect(page.getByRole('button', { name: 'Mostrar imagen 1' })).toHaveAttribute('aria-current', 'true');
  await page.getByRole('button', { name: 'Imagen siguiente' }).click();
  await expect(page.getByRole('button', { name: 'Mostrar imagen 2' })).toHaveAttribute('aria-current', 'true');
  await page.getByRole('button', { name: 'Mostrar imagen 1' }).click();
  await expect(page.getByRole('button', { name: 'Mostrar imagen 1' })).toHaveAttribute('aria-current', 'true');
});

test.describe('navegación de escritorio', () => {
  test.skip(({ isMobile }) => isMobile, 'solo en escritorio');

  test('el menú de servicios funciona con mouse y teclado', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Servicios' });
    const menu = page.locator('#services-menu');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(menu.getByRole('link', { name: 'Familia' })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu.getByRole('link', { name: 'Laboral' })).toBeFocused();

    await page.mouse.click(10, 400);
    await expect(menu).toBeHidden();

    await toggle.click();
    await menu.getByRole('link', { name: 'Previsional' }).click();
    await expect(page).toHaveURL('/servicios/previsional');
  });
});

test.describe('navegación móvil', () => {
  test.skip(({ isMobile }) => !isMobile, 'solo en móvil');

  test('el menú se abre, navega y se cierra', async ({ page }) => {
    await page.goto('/');
    const toggler = page.getByRole('button', { name: 'Abrir navegación' });
    await expect(
      page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Contacto' }),
    ).toBeHidden();

    await toggler.click();
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    await nav.getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL('/contacto');
    await expect(page.getByRole('button', { name: 'Abrir navegación' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('no hay desplazamiento horizontal', async ({ page }) => {
    for (const route of ['/', '/contacto', '/servicios/prescripcion-adquisitiva', '/privacidad']) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, route).toBe(false);
    }
  });
});
