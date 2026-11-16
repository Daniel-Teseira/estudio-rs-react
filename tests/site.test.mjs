import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import services from '../src/data/services.json' with { type: 'json' };
import images from '../src/data/images.json' with { type: 'json' };
import studio from '../src/data/studio.json' with { type: 'json' };
import vercel from '../vercel.json' with { type: 'json' };
import { getResponsiveImageProps, imageUrl } from '../src/utils/responsiveImage.js';
import { legacyRedirects } from '../src/routes.js';
import { whatsappUrl } from '../src/utils/whatsapp.js';

test('las áreas tienen slugs únicos y direcciones legibles', () => {
  const slugs = services.map((service) => service.slug);
  assert.equal(new Set(slugs).size, services.length, 'cada servicio debe tener una URL distinta');
  assert.ok(slugs.includes('prescripcion-adquisitiva'));
  assert.ok(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
});

test('cada área tiene contenido completo e imagen configurada', () => {
  for (const service of services) {
    for (const field of ['title', 'description', 'intro']) {
      assert.ok(service[field]?.trim(), `${service.slug} debe tener ${field}`);
    }
    for (const field of ['cases', 'documents', 'faq']) {
      assert.ok(service[field]?.length > 0, `${service.slug} debe tener ${field}`);
    }
    assert.ok(service.faq.every(({ question, answer }) => question.trim() && answer.trim()));
    assert.equal(images[service.image]?.folder, 'services', `${service.slug} debe usar una imagen de servicios`);
  }
});

test('las imágenes del carrusel están configuradas para optimizarse', async () => {
  const carousel = await readFile(new URL('../src/components/Carrusel/Carrusel.jsx', import.meta.url), 'utf8');
  for (const name of ['justice-gavel', 'law-books', 'public-demonstration']) {
    assert.ok(carousel.includes(`'${name}'`));
    assert.equal(images[name].folder, 'home');
  }
});

test('las imágenes generan srcset con todos los anchos configurados', () => {
  const props = getResponsiveImageProps('family', '100vw');
  assert.equal(props.src, '/images/services/family-640.webp');
  assert.equal(props.sizes, '100vw');
  assert.equal(props.srcSet, '/images/services/family-360.webp 360w, /images/services/family-480.webp 480w, /images/services/family-640.webp 640w');
  assert.equal(imageUrl('justice-gavel'), '/images/home/justice-gavel-1920.webp');
  assert.throws(() => imageUrl('no-existe'), /no configurada/);
});

test('las redirecciones del sitio coinciden con las de Vercel y el NUC', () => {
  assert.deepEqual(
    legacyRedirects,
    vercel.redirects.map(({ source, destination }) => ({ source, destination })),
  );
});

test('el enlace de WhatsApp codifica el mensaje', () => {
  assert.equal(whatsappUrl(), `https://wa.me/${studio.whatsapp}`);
  assert.equal(whatsappUrl('Hola & chau'), `https://wa.me/${studio.whatsapp}?text=Hola%20%26%20chau`);
});
