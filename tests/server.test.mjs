import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { createProductionServer } from '../server.mjs';

let directory;
let server;
let baseUrl;

before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'estudio-server-test-'));
  await mkdir(path.join(directory, 'servicios'));
  for (const [file, contents] of Object.entries({
    'index.html': '<h1>Estudio Jurídico RS</h1>',
    'contacto.html': '<h1>Contacto</h1>',
    'servicios/familia.html': '<h1>Familia</h1>',
    '404.html': '<h1>ERROR 404</h1>',
    'site.css': 'body { color: black; }',
  })) {
    await writeFile(path.join(directory, file), contents);
  }
  server = await createProductionServer({ distDirectory: directory });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    const closed = new Promise((resolve) => server.close(resolve));
    server.closeAllConnections();
    await closed;
  }
  if (directory) {
    const relative = path.relative(tmpdir(), directory);
    assert.ok(relative.startsWith('estudio-server-test-') && !path.isAbsolute(relative) && !relative.includes(path.sep));
    await rm(directory, { recursive: true, force: true });
  }
});

test('el servidor publica las páginas renderizadas con rutas limpias', async () => {
  for (const [route, text] of [['/', 'Estudio Jurídico RS'], ['/contacto', 'Contacto'], ['/servicios/familia', 'Familia']]) {
    const response = await fetch(baseUrl + route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.ok((await response.text()).includes(text));
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.ok(!response.headers.get('content-security-policy').includes('upgrade-insecure-requests'));
  }
});

test('las direcciones antiguas redirigen de forma permanente y conservan la consulta', async () => {
  for (const [route, destination] of [['/home', '/'], ['/contact', '/contacto'], ['/contact/?area=laboral', '/contacto?area=laboral']]) {
    const response = await fetch(baseUrl + route, { redirect: 'manual' });
    assert.equal(response.status, 308, route);
    assert.equal(response.headers.get('location'), destination);
  }
});

test('los archivos tienen su tipo y HEAD no envía contenido', async () => {
  const response = await fetch(baseUrl + '/site.css');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/css/);
  const head = await fetch(baseUrl + '/contacto', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.ok(Number(head.headers.get('content-length')) > 0);
  assert.equal(await head.text(), '');
});

test('las páginas y los recursos inexistentes devuelven el 404 del sitio', async () => {
  for (const route of ['/no-existe', '/no-existe.js', '/package.json']) {
    const response = await fetch(baseUrl + route);
    assert.equal(response.status, 404);
    assert.match(await response.text(), /ERROR 404/);
  }
});

test('se rechazan rutas ocultas o malformadas y métodos no admitidos', async () => {
  for (const route of ['/.env', '/%ZZ', '/%00', '/%2eenv']) {
    const response = await fetch(baseUrl + route);
    assert.equal(response.status, 400, route);
  }
  const response = await fetch(baseUrl + '/contacto', { method: 'POST' });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
});

test('el monitoreo recibe reportes en el NUC y valida origen y tamaño', async () => {
  const body = JSON.stringify({ category: 'performance', pathname: '/', metrics: { loadMs: 150 } });
  const valid = await fetch(baseUrl + '/api/client-errors', {
    method: 'POST', body, headers: { Origin: baseUrl, 'Content-Type': 'application/json' },
  });
  assert.equal(valid.status, 204);
  assert.equal(valid.headers.get('cache-control'), 'no-store');

  const foreign = await fetch(baseUrl + '/api/client-errors', {
    method: 'POST', body, headers: { Origin: 'https://otro-sitio.example' },
  });
  assert.equal(foreign.status, 403);

  const invalid = await fetch(baseUrl + '/api/client-errors', { method: 'POST', body: '{' });
  assert.equal(invalid.status, 400);
  const oversized = await fetch(baseUrl + '/api/client-errors', { method: 'POST', body: 'x'.repeat(6001) });
  assert.equal(oversized.status, 413);
  const unsupported = await fetch(baseUrl + '/api/client-errors');
  assert.equal(unsupported.status, 405);
});
