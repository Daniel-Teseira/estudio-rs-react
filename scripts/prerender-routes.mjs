import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { createServer, loadEnv } from 'vite';

const projectRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distDirectory = path.join(projectRoot, 'dist');
const siteUrlValue = process.env.VITE_SITE_URL ?? loadEnv('production', projectRoot, 'VITE_').VITE_SITE_URL;
const siteUrl = siteUrlValue ? new URL(siteUrlValue).origin : null;
const serviceData = JSON.parse(await readFile(path.join(projectRoot, 'src/json/Data.json'), 'utf8'));
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const routes = [
  {
    path: '/',
    file: 'index.html',
    canonicalPath: '/',
    title: 'Estudio Jurídico RS | Asesoramiento legal',
    description: 'Conocé las áreas de práctica de Estudio Jurídico RS y encontrá información para iniciar tu consulta.',
    image: '/images/home/justice-gavel-1920.webp',
  },
  {
    path: '/home',
    file: 'home.html',
    canonicalPath: '/',
    title: 'Estudio Jurídico RS | Asesoramiento legal',
    description: 'Conocé las áreas de práctica de Estudio Jurídico RS y encontrá información para iniciar tu consulta.',
    image: '/images/home/justice-gavel-1920.webp',
  },
  {
    path: '/contact',
    file: 'contact.html',
    canonicalPath: '/contact',
    title: 'Contacto | Estudio Jurídico RS',
    description: 'Contactá a Estudio Jurídico RS por WhatsApp para iniciar una consulta.',
  },
  ...serviceData.map((service) => {
    const slug = service.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      path: '/servicios/' + slug,
      file: 'servicios/' + slug + '.html',
      canonicalPath: '/servicios/' + slug,
      title: service.title + ' | Estudio Jurídico RS',
      description: service.description,
      image: service.picture,
    };
  }),
  {
    path: '/__not-found__',
    file: '404.html',
    title: 'Página no encontrada | Estudio Jurídico RS',
    description: 'La página que buscás no está disponible. Volvé al sitio de Estudio Jurídico RS.',
    noIndex: true,
  },
];

const setMeta = (html, attribute, key, content) => {
  const safeContent = escapeHtml(content);
  const selector = new RegExp("<meta\\b(?=[^>]*\\b" + attribute + "=[\"']" + key + "[\"'])[^>]*>", 'i');
  const tag = '<meta ' + attribute + '="' + key + '" content="' + safeContent + '" />';
  if (selector.test(html)) return html.replace(selector, tag);
  return html.replace('</head>', '    ' + tag + '\n  </head>');
};

const renderRoute = async (App, baseHtml, route) => {
  const app = React.createElement(
    StaticRouter,
    { location: route.path },
    React.createElement(App)
  );
  const markup = renderToString(app);
  let html = baseHtml.replace(
    '<div id="root"></div>',
    '<div id="root">' + markup + '</div>'
  );

  html = html.replace(/<title>[^<]*<\/title>/, '<title>' + escapeHtml(route.title) + '</title>');
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);

  if (route.noIndex) {
    html = setMeta(html, 'name', 'robots', 'noindex, nofollow');
  }

  if (siteUrl) {
    const canonicalUrl = siteUrl + (route.canonicalPath || route.path);
    const canonicalTag = '<link rel="canonical" href="' + escapeHtml(canonicalUrl) + '" />';
    html = html.replace(/<link\s+rel="canonical"[^>]*>/i, '').replace('</head>', '    ' + canonicalTag + '\n  </head>');
    html = setMeta(html, 'property', 'og:url', canonicalUrl);
    if (route.image) {
      html = setMeta(html, 'property', 'og:image', siteUrl + route.image);
      html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
      html = setMeta(html, 'name', 'twitter:image', siteUrl + route.image);
    }
  }

  return html;
};

const baseHtml = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.mjs'),
  appType: 'custom',
  logLevel: 'error',
  mode: 'production',
  server: { middlewareMode: true },
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  for (const route of routes) {
    const html = await renderRoute(App, baseHtml, route);
    const destination = path.join(distDirectory, route.file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html);
    process.stdout.write('Página generada: ' + route.file + '\n');
  }
} finally {
  await vite.close();
}

const sitemapRoutes = [...new Map(
  routes
    .filter((route) => !route.noIndex && route.canonicalPath !== undefined)
    .map((route) => [route.canonicalPath, route])
).values()];
const sitemap = siteUrl
  ? '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapRoutes.map((route) => '  <url><loc>' + escapeHtml(siteUrl + route.canonicalPath) + '</loc></url>').join('\n') +
    '\n</urlset>\n'
  : null;
const robots = 'User-agent: *\nAllow: /\n' + (siteUrl ? 'Sitemap: ' + siteUrl + '/sitemap.xml\n' : '');

await writeFile(path.join(distDirectory, 'robots.txt'), robots);
if (sitemap) await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap);
else await rm(path.join(distDirectory, 'sitemap.xml'), { force: true });
