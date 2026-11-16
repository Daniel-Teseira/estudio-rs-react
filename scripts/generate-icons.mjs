import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Genera el favicon y los íconos de la app a partir del logo propio en SVG.
const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = path.join(projectRoot, 'src/assets/icons/logo.svg');
const outputDirectory = path.join(projectRoot, 'public/icons');
const background = '#171715';

await mkdir(outputDirectory, { recursive: true });
await copyFile(source, path.join(outputDirectory, 'logo.svg'));

for (const { file, size } of [
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]) {
  await sharp(source, { density: 300 }).resize(size, size).png().toFile(path.join(outputDirectory, file));
  console.log(`logo.svg → ${file}`);
}

// Versión "maskable": el logo dentro de la zona segura (80 %) sobre fondo completo.
const inner = await sharp(source, { density: 300 }).resize(410, 410).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(path.join(outputDirectory, 'icon-maskable-512.png'));
console.log('logo.svg → icon-maskable-512.png');
