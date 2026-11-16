import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import * as routes from '../src/routes.js';
import * as pageMetadata from '../src/pageMetadata.js';

const monitoringSource = (await readFile(new URL('../src/monitoring/clientErrors.js', import.meta.url), 'utf8'))
  .replaceAll('import.meta.env.PROD', 'true')
  .replaceAll('export const ', 'var ');

test('un beacon rechazado o fallido usa fetch y limita los errores extensos', () => {
  for (const [accepted, beacon] of [
    [false, () => false],
    [
      false,
      () => {
        throw new Error('unavailable');
      },
    ],
    [true, () => true],
  ]) {
    const requests = [];
    const context = vm.createContext({
      window: { location: { pathname: '/' } },
      Blob,
      navigator: { sendBeacon: beacon },
      fetch: (...args) => {
        requests.push(args);
        return Promise.resolve();
      },
    });
    vm.runInContext(monitoringSource, context);
    context.reportClientError({ name: 'Error', message: '\u0000'.repeat(20000), stack: '\u0000'.repeat(20000) });
    if (accepted) assert.equal(requests.length, 0);
    else {
      assert.equal(requests.length, 1);
      assert.ok(Buffer.byteLength(requests[0][1].body) <= 6000);
      context.reportPerformanceMetrics({ loadMs: 100 });
      assert.equal(requests.length, 2);
    }
  }
});

const metadataSource = (await readFile(new URL('../src/hooks/usePageMetadata.js', import.meta.url), 'utf8'))
  .replace(/^import .*;\r?\n/gm, '')
  .replace('import.meta.env.VITE_SITE_URL', '"https://example.com"')
  .replace('export default usePageMetadata;', 'globalThis.updateMetadata = usePageMetadata;');

test('volver del 404 restaura indexación y cada ruta actualiza la imagen social', () => {
  const elements = new Map();
  let pathname = '/inexistente';
  const document = {
    querySelector: (selector) => elements.get(selector),
    createElement: (tag) => ({
      tag,
      attributes: {},
      setAttribute(key, value) {
        this.attributes[key] = value;
      },
      remove() {
        for (const [key, value] of elements) if (value === this) elements.delete(key);
      },
    }),
    head: {
      appendChild(element) {
        const key =
          element.tag === 'link'
            ? 'link[rel="canonical"]'
            : Object.hasOwn(element.attributes, 'name')
              ? `meta[name="${element.attributes.name}"]`
              : `meta[property="${element.attributes.property}"]`;
        elements.set(key, element);
      },
    },
  };
  const context = vm.createContext({
    document,
    URL,
    ...routes,
    ...pageMetadata,
    useEffect: (effect) => effect(),
    useLocation: () => ({ pathname }),
  });
  vm.runInContext(metadataSource, context);
  const update = (route) => {
    pathname = route;
    context.updateMetadata('Título', 'Descripción');
  };
  update('/inexistente');
  assert.equal(elements.get('meta[name="robots"]').attributes.content, 'noindex, nofollow');
  update('/');
  assert.equal(elements.get('meta[name="robots"]').attributes.content, 'index, follow');
  assert.match(elements.get('meta[property="og:image"]').attributes.content, /justice-gavel/);
  update('/servicios/familia');
  assert.match(elements.get('meta[property="og:image"]').attributes.content, /family/);
  update('/contacto');
  assert.equal(elements.has('meta[property="og:image"]'), false);
  assert.equal(elements.has('meta[name="twitter:image"]'), false);
  assert.equal(elements.get('link[rel="canonical"]').href, 'https://example.com/contacto');
});
