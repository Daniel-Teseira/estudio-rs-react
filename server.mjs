import { createReadStream } from 'node:fs';
import { access, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import clientErrors from './api/client-errors.js';

const root = fileURLToPath(new URL('./', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

// Extensiones que scripts/compress-build.mjs deja también en .br y .gz.
const compressible = new Set(['.html', '.css', '.js', '.json', '.webmanifest', '.svg', '.txt', '.xml']);
const encodings = [
  { encoding: 'br', suffix: '.br' },
  { encoding: 'gzip', suffix: '.gz' },
];

const acceptedEncodings = (header = '') =>
  new Set(
    header
      .split(',')
      .map((part) => part.trim().split(';'))
      .filter(([, quality]) => !quality || Number(quality.trim().replace('q=', '')) > 0)
      .map(([encoding]) => encoding.toLowerCase()),
  );

const stripWeak = (value) => value.trim().replace(/^W\//, '');
const etagMatches = (header, etag) =>
  Boolean(header) && header.split(',').some((value) => value.trim() === '*' || stripWeak(value) === stripWeak(etag));

const fileDetails = async (filename) => {
  try {
    const details = await stat(filename);
    return details.isFile() ? details : null;
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
    throw error;
  }
};

/** Convierte un "source" de vercel.json (por ejemplo /assets/(.*)) en una expresión regular. */
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, (character) => `\\${character}`);
const sourcePattern = (source) => new RegExp(`^${source.split('(.*)').map(escapeRegExp).join('(.*)')}$`);

const receiveReport = (request, response) => {
  response.status = (code) => {
    response.statusCode = code;
    return response;
  };
  // This server receives requests directly; forwarded addresses are not trusted.
  request.headers['x-forwarded-for'] = request.socket.remoteAddress || 'unknown';
  if (request.method !== 'POST') return clientErrors(request, response);

  let size = 0;
  const chunks = [];
  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > 6000) {
      if (!response.writableEnded) {
        response.writeHead(413, { 'Cache-Control': 'no-store' });
        response.end();
      }
      return;
    }
    chunks.push(chunk);
  });
  request.on('end', () => {
    if (response.writableEnded) return;
    request.body = Buffer.concat(chunks).toString('utf8');
    clientErrors(request, response);
  });
  request.on('error', () => {
    if (!response.writableEnded) {
      response.writeHead(400);
      response.end();
    }
  });
};

export async function createProductionServer({ distDirectory = path.join(root, 'dist') } = {}) {
  await access(path.join(distDirectory, 'index.html'));
  await access(path.join(distDirectory, '404.html'));
  const configuration = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  // Cada regla de vercel.json se aplica solo a las rutas que coinciden con su "source".
  const headerRules = configuration.headers.map((rule) => ({
    pattern: sourcePattern(rule.source),
    headers: rule.headers,
  }));
  // Mismas redirecciones permanentes que publica Vercel (308).
  const redirects = new Map((configuration.redirects ?? []).map((rule) => [rule.source, rule]));

  const server = createServer(async (request, response) => {
    const requestPath = request.url.split('?')[0];
    for (const rule of headerRules) {
      if (!rule.pattern.test(requestPath)) continue;
      for (const { key, value } of rule.headers) {
        // El NUC se accede por HTTP en la red local.
        response.setHeader(
          key,
          key.toLowerCase() === 'content-security-policy'
            ? value
                .split(';')
                .filter((directive) => directive.trim() !== 'upgrade-insecure-requests')
                .join(';')
            : value,
        );
      }
    }
    // Sin una regla propia, el navegador revalida cada vez (con ETag puede responderse 304).
    if (!response.hasHeader('Cache-Control')) response.setHeader('Cache-Control', 'no-cache');

    try {
      const pathname = decodeURIComponent(requestPath);
      if (pathname === '/api/client-errors') return receiveReport(request, response);
      const redirect = redirects.get(pathname.replace(/(.)\/+$/, '$1'));
      if (redirect) {
        const query = request.url.includes('?') ? request.url.slice(request.url.indexOf('?')) : '';
        response.writeHead(redirect.permanent ? 308 : 307, { Location: redirect.destination + query });
        return response.end();
      }
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        return response.end();
      }
      if (
        !pathname.startsWith('/') ||
        pathname.includes('\\') ||
        pathname.includes('\0') ||
        pathname.split('/').some((segment) => segment.startsWith('.'))
      ) {
        response.writeHead(400);
        return response.end();
      }

      const relative = pathname.replace(/^\/+|\/+$/g, '');
      // Las versiones comprimidas solo se entregan a través de Accept-Encoding.
      const candidates = !relative
        ? ['index.html']
        : /\.(br|gz)$/i.test(relative)
          ? []
          : path.extname(relative)
            ? [relative]
            : [`${relative}.html`, `${relative}/index.html`, relative];
      let selected;
      for (const candidate of candidates) {
        const filename = path.resolve(distDirectory, candidate);
        const within = path.relative(distDirectory, filename);
        if (within.startsWith('..') || path.isAbsolute(within)) continue;
        if (await fileDetails(filename)) {
          selected = filename;
          break;
        }
      }
      if (!selected) {
        selected = path.join(distDirectory, '404.html');
        response.statusCode = 404;
        response.setHeader('Cache-Control', 'no-cache');
      }

      const extension = path.extname(selected).toLowerCase();
      response.setHeader('Content-Type', types[extension] || 'application/octet-stream');
      let servedFile = selected;
      if (compressible.has(extension)) {
        response.setHeader('Vary', 'Accept-Encoding');
        const accepted = acceptedEncodings(request.headers['accept-encoding']);
        for (const { encoding, suffix } of encodings) {
          if (accepted.has(encoding) && (await fileDetails(selected + suffix))) {
            servedFile = selected + suffix;
            response.setHeader('Content-Encoding', encoding);
            break;
          }
        }
      }

      const information = await fileDetails(servedFile);
      const etag = `W/"${information.size.toString(16)}-${Math.trunc(information.mtimeMs).toString(16)}"`;
      response.setHeader('ETag', etag);
      response.setHeader('Last-Modified', information.mtime.toUTCString());
      if (response.statusCode === 200 && etagMatches(request.headers['if-none-match'], etag)) {
        response.statusCode = 304;
        response.removeHeader('Content-Type');
        response.removeHeader('Content-Encoding');
        return response.end();
      }
      response.setHeader('Content-Length', information.size);
      if (request.method === 'HEAD') return response.end();
      const stream = createReadStream(servedFile);
      stream.on('error', (error) => response.destroy(error));
      stream.pipe(response);
    } catch (error) {
      if (error instanceof URIError) {
        response.writeHead(400);
        return response.end();
      }
      console.error('server_error', error);
      if (!response.headersSent) response.writeHead(500);
      response.end();
    }
  });
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const port = Number(process.env.PORT || 3004);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT debe ser un puerto válido.');
    const host = process.env.HOST || '0.0.0.0';
    const server = await createProductionServer();
    server.on('error', (error) => {
      console.error('No se pudo iniciar el servidor:', error.message);
      process.exitCode = 1;
    });
    server.listen(port, host, () => console.log(`Estudio Jurídico RS disponible en http://${host}:${port}`));
    for (const signal of ['SIGTERM', 'SIGINT']) {
      process.on(signal, () => {
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(0), 5000).unref();
      });
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
