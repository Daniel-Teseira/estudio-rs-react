import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Data from '../src/json/Data.json' with { type: 'json' };
import serviceSlug from '../src/utils/serviceSlug.js';

const optimizerSource = await readFile(new URL('../scripts/optimize-images.mjs', import.meta.url), 'utf8');
const imageSource = await readFile(new URL('../src/images/image.js', import.meta.url), 'utf8');
const responsiveImage = await import('../src/utils/responsiveImage.js');

test('las áreas tienen slugs únicos y direcciones legibles', () => {
  const slugs = Data.map((service) => serviceSlug(service.title));
  assert.equal(new Set(slugs).size, Data.length, 'cada servicio debe tener una URL distinta');
  assert.ok(slugs.includes('prescripcion-adquisitiva'));
  assert.ok(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
});

test('cada tarjeta tiene texto e imagen incluidos en el optimizador', () => {
  for (const service of Data) {
    assert.ok(service.title.trim(), 'el servicio debe tener título');
    assert.ok(service.description.trim(), 'el servicio debe tener descripción');
    assert.ok(service.picture.startsWith('/images/services/'), 'la imagen debe apuntar a servicios');
    const name = service.picture.split('/').at(-1).replace(/-\d+\.webp$/, '');
    assert.ok(optimizerSource.includes(`name: '${name}'`), 'la imagen debe estar configurada para optimizarse');
  }
});

test('las tres imágenes del carrusel están configuradas para optimizarse', () => {
  for (const image of ['justice-gavel-1920.webp', 'law-books-1920.webp', 'public-demonstration-1920.webp']) {
    const name = image.replace(/-\d+\.webp$/, '');
    assert.ok(imageSource.includes('/images/home/' + image));
    assert.ok(optimizerSource.includes(`name: '${name}'`));
  }
});

test('las imágenes generan srcset con tamaños candidatos correctos', () => {
  const props = responsiveImage.getResponsiveImageProps('/images/services/family-640.webp', '100vw');
  assert.equal(props.src, '/images/services/family-640.webp');
  assert.equal(props.sizes, '100vw');
  assert.match(props.srcSet, /family-360\.webp 360w/);
  assert.match(props.srcSet, /family-480\.webp 480w/);
  assert.match(props.srcSet, /family-640\.webp 640w/);
});
