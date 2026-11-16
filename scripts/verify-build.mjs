import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import services from '../src/data/services.json' with { type: 'json' };
import { imageUrl } from '../src/utils/responsiveImage.js';

const projectRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distDirectory = path.join(projectRoot, 'dist');
const htmlAt = (file) => readFile(path.join(distDirectory, file), 'utf8');

const homeHtml = await htmlAt('index.html');
assert.match(homeHtml, /id="root">[\s\S]+<\/div>/, 'la portada debe llegar renderizada');
assert.match(homeHtml, /Áreas de práctica/, 'la portada debe incluir contenido visible');
assert.match(homeHtml, /\bsrcset=/i, 'la portada debe servir imágenes responsivas');
const jsonLd = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLd, 'la portada debe incluir datos estructurados');
assert.equal(JSON.parse(jsonLd[1])['@type'], 'LegalService');
assert.doesNotMatch(homeHtml, /fonts\.googleapis\.com/, 'las fuentes deben servirse desde el propio sitio');

const contactHtml = await htmlAt('contacto.html');
assert.match(contactHtml, /id="root">[\s\S]+<\/div>/, 'contacto debe llegar renderizada');
assert.match(contactHtml, /Área de consulta/, 'el formulario debe pedir el área de consulta');

for (const service of services) {
  const html = await htmlAt(path.join('servicios', service.slug + '.html'));
  assert.ok(html.includes(service.title), 'el HTML del servicio debe incluir su título: ' + service.title);
  assert.ok(html.includes(service.description), 'el HTML del servicio debe incluir su descripción: ' + service.title);
  assert.match(html, /Preguntas frecuentes/, 'el servicio debe incluir preguntas frecuentes: ' + service.title);
  assert.match(html, /\bsrcset=/i, 'el servicio debe servir imágenes responsivas: ' + service.title);
  await access(path.join(distDirectory, imageUrl(service.image).replace(/^\//, '')));
}

for (const icon of ['logo.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']) {
  await access(path.join(distDirectory, 'icons', icon));
}

const notFoundHtml = await htmlAt('404.html');
assert.match(notFoundHtml, /name="robots" content="noindex, nofollow"/, 'el 404 debe excluirse de buscadores');
assert.match(notFoundHtml, /ERROR 404/, 'el 404 debe renderizar el contenido propio del sitio');
await access(path.join(distDirectory, 'robots.txt'));

process.stdout.write('Build verificado: páginas, rutas, imágenes, íconos y 404 estático.\n');
