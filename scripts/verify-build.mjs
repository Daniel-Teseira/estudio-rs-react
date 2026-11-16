import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Data from '../src/json/Data.json' with { type: 'json' };

const projectRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distDirectory = path.join(projectRoot, 'dist');
const htmlAt = (file) => readFile(path.join(distDirectory, file), 'utf8');

const homeHtml = await htmlAt('index.html');
assert.match(homeHtml, /id="root">[\s\S]+<\/div>/, 'la portada debe llegar renderizada');
assert.match(homeHtml, /Áreas de práctica/, 'la portada debe incluir contenido visible');
assert.match(homeHtml, /\bsrcset=/i, 'la portada debe servir imágenes responsivas');

for (const route of ['home.html', 'contact.html']) {
  const html = await htmlAt(route);
  assert.match(html, /id="root">[\s\S]+<\/div>/, route + ' debe llegar renderizada');
}

for (const service of Data) {
  const slug = service.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const html = await htmlAt(path.join('servicios', slug + '.html'));
  assert.ok(html.includes(service.title), 'el HTML del servicio debe incluir su título: ' + service.title);
  assert.ok(html.includes(service.description), 'el HTML del servicio debe incluir su descripción: ' + service.title);
  assert.match(html, /\bsrcset=/i, 'el servicio debe servir imágenes responsivas: ' + service.title);
  await access(path.join(distDirectory, service.picture.replace(/^\//, '')));
}

const notFoundHtml = await htmlAt('404.html');
assert.match(notFoundHtml, /name="robots" content="noindex, nofollow"/, 'el 404 debe excluirse de buscadores');
assert.match(notFoundHtml, /ERROR 404/, 'el 404 debe renderizar el contenido propio del sitio');
await access(path.join(distDirectory, 'robots.txt'));

process.stdout.write('Build verificado: páginas, rutas, imágenes y 404 estático.\n');
