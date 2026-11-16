import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Deja dist/version.json para saber qué versión está publicada y si el build
// corresponde al commit actual (lo usa scripts/deploy-nuc.ps1).
const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const git = (...args) => {
  try {
    return execFileSync('git', args, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
};

const { version } = JSON.parse(await readFile(path.join(projectRoot, 'package.json'), 'utf8'));
const commit = process.env.VERCEL_GIT_COMMIT_SHA || git('rev-parse', 'HEAD');
const status = process.env.VERCEL ? '' : git('status', '--porcelain', '--untracked-files=no');
const info = {
  version,
  commit: commit ?? 'desconocido',
  // true si había cambios sin commitear al compilar.
  dirty: status === null ? null : status.length > 0,
  builtAt: new Date().toISOString(),
};
await writeFile(path.join(projectRoot, 'dist/version.json'), `${JSON.stringify(info, null, 2)}\n`);
console.log(`Versión ${info.version} (${info.commit.slice(0, 7)}${info.dirty ? ', con cambios sin commitear' : ''})`);
