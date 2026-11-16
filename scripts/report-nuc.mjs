// Resume los registros del sitio que llegan por la entrada estándar (journald o nuc-server.log):
// tiempos de carga, errores del navegador y contactos iniciados. Lo usa scripts/report-nuc.sh.
import { createInterface } from 'node:readline';

const days = process.argv[2];
const performance = [];
const errors = new Map();
const events = new Map();

const percentile = (values, fraction) => {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(fraction * sorted.length) - 1)];
};
const increment = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);
const top = (map, limit) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);

for await (const line of createInterface({ input: process.stdin })) {
  const match = line.match(/(client_performance|client_error|client_event) (\{.*\})\s*$/);
  if (!match) continue;
  let data;
  try {
    data = JSON.parse(match[2]);
  } catch {
    continue;
  }
  if (match[1] === 'client_performance') performance.push(data);
  else if (match[1] === 'client_error') increment(errors, `${data.name}: ${data.message} (${data.pathname})`);
  else increment(events, `${data.name}|${data.area ?? data.pathname}`);
}

const format = (value, unit) => (value === null ? '—' : `${Math.round(value * 1000) / 1000}${unit}`);
const metric = (key) => performance.map((entry) => entry.metrics?.[key]).filter((value) => typeof value === 'number');
const eventNames = { whatsapp: 'WhatsApp', social: 'Redes sociales', contact_form: 'Formulario de contacto' };

console.log(`Informe de Estudio Jurídico RS${days ? ` (últimos ${days} días)` : ''}\n`);

console.log(`Visitas con métricas de carga: ${performance.length}`);
if (performance.length > 0) {
  console.log('  Percentil 75 (lo que experimenta 3 de cada 4 visitas):');
  console.log(
    `  - LCP (carga del contenido principal): ${format(percentile(metric('lcpMs'), 0.75), ' ms')} (bueno: < 2500 ms)`,
  );
  console.log(`  - CLS (saltos de la página): ${format(percentile(metric('cls'), 0.75), '')} (bueno: < 0,1)`);
  console.log(
    `  - Interacción más lenta: ${format(percentile(metric('maxInteractionMs'), 0.75), ' ms')} (bueno: < 200 ms)`,
  );
  const pages = new Map();
  for (const entry of performance) increment(pages, entry.pathname);
  console.log('  Páginas más visitadas:');
  for (const [page, count] of top(pages, 5)) console.log(`  - ${page}: ${count}`);
}

const totalEvents = [...events.values()].reduce((sum, count) => sum + count, 0);
console.log(`\nContactos iniciados: ${totalEvents}`);
for (const [key, count] of top(events, 15)) {
  const [name, where] = key.split('|');
  console.log(`  - ${eventNames[name] ?? name} desde ${where}: ${count}`);
}

const totalErrors = [...errors.values()].reduce((sum, count) => sum + count, 0);
console.log(`\nErrores del navegador: ${totalErrors}`);
for (const [error, count] of top(errors, 5)) console.log(`  - ${count} × ${error}`);
