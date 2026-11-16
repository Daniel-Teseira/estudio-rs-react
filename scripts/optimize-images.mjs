import { mkdir, readFile, readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
// La lista de imágenes y sus anchos se define una sola vez en src/data/images.json.
const images = JSON.parse(await readFile(path.join(projectRoot, 'src/data/images.json'), 'utf8'));
const jobs = Object.entries(images).map(([name, image]) => ({ name, ...image }));

const formatBytes = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const job of jobs) {
  const sourcePath = path.join(projectRoot, 'src/assets/images/source', job.source);
  const sourceBytes = (await stat(sourcePath)).size;
  const metadata = await sharp(sourcePath).metadata();
  const outputDirectory = path.join(projectRoot, 'public/images', job.folder);
  await mkdir(outputDirectory, { recursive: true });
  const previousOutputs = await readdir(outputDirectory);
  await Promise.all(
    previousOutputs
      .filter((file) => file === `${job.name}.webp` || new RegExp(`^${job.name}-\\d+\\.webp$`).test(file))
      .map((file) => rm(path.join(outputDirectory, file), { force: true })),
  );
  // Cada ancho configurado genera una URL en srcset: no puede superar al original.
  const tooWide = job.widths.filter((width) => width > metadata.width);
  if (tooWide.length > 0) {
    throw new Error(
      `${job.source} mide ${metadata.width} px: quitá ${tooWide.join(', ')} de src/data/images.json o reemplazá la foto.`,
    );
  }
  // Las fotos se muestran a pantalla completa; por debajo de 1600 px se ven ampliadas en monitores grandes.
  if (metadata.width < 1600) {
    console.warn(`Aviso: ${job.source} mide solo ${metadata.width} px y se verá ampliada a pantalla completa.`);
  }
  const widths = [...job.widths].sort((a, b) => a - b);

  for (const width of widths) {
    const outputPath = path.join(outputDirectory, `${job.name}-${width}.webp`);
    const temporaryPath = `${outputPath}.tmp`;
    let selectedBytes = Infinity;
    let selectedQuality = 0;
    let selectedPath;

    for (const quality of [job.quality, 74, 66, 58, 50, 42]) {
      const candidatePath = `${outputPath}.${quality}.tmp`;
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(candidatePath);
      const candidateBytes = (await stat(candidatePath)).size;

      if (candidateBytes < selectedBytes) {
        if (selectedPath) await rm(selectedPath, { force: true });
        selectedBytes = candidateBytes;
        selectedQuality = quality;
        selectedPath = candidatePath;
      } else {
        await rm(candidatePath, { force: true });
      }
      if (candidateBytes < sourceBytes) break;
    }

    await rm(outputPath, { force: true });
    await rename(selectedPath, outputPath);
    await rm(temporaryPath, { force: true });
    if (!selectedQuality) throw new Error(`No se pudo generar ${outputPath}`);
    console.log(
      `${job.source} → ${job.name}-${width}.webp (${formatBytes(selectedBytes)}, calidad ${selectedQuality})`,
    );
  }
}
