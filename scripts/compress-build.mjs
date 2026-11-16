import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

// Precomprime los archivos de texto para que server.mjs los entregue en brotli o gzip
// sin comprimir en cada pedido. Vercel comprime por su cuenta, así que ahí se omite.
if (process.env.VERCEL) {
  console.log('Compresión omitida: Vercel comprime las respuestas automáticamente.');
  process.exit(0);
}

const distDirectory = path.resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const extensions = new Set(['.html', '.css', '.js', '.json', '.webmanifest', '.svg', '.txt', '.xml']);
const minimumBytes = 1024;

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : [fullPath];
    }),
  );
  return files.flat();
};

let original = 0;
let compressed = 0;
for (const file of await walk(distDirectory)) {
  if (!extensions.has(path.extname(file)) || (await stat(file)).size < minimumBytes) continue;
  const contents = await readFile(file);
  const brotli = brotliCompressSync(contents, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: contents.length },
  });
  await writeFile(`${file}.br`, brotli);
  await writeFile(`${file}.gz`, gzipSync(contents, { level: 9 }));
  original += contents.length;
  compressed += brotli.length;
}
console.log(`Compresión: ${Math.round(original / 1024)} KB → ${Math.round(compressed / 1024)} KB en brotli.`);
