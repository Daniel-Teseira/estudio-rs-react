import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createServer, loadEnv } from 'vite';

const projectRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distDirectory = path.join(projectRoot, 'dist');
const siteUrlValue = process.env.VITE_SITE_URL ?? loadEnv('production', projectRoot, 'VITE_').VITE_SITE_URL;
const siteUrl = siteUrlValue ? new URL(siteUrlValue).origin : null;
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.mjs'),
  appType: 'custom',
  logLevel: 'error',
  mode: 'production',
  server: { middlewareMode: true },
});

const setMeta = (html, attribute, key, content) => {
  const safeContent = escapeHtml(content);
  const selector = new RegExp('<meta\\b(?=[^>]*\\b' + attribute + '=["\']' + key + '["\'])[^>]*>', 'i');
  const tag = '<meta ' + attribute + '="' + key + '" content="' + safeContent + '" />';
  if (selector.test(html)) return html.replace(selector, tag);
  return html.replace('</head>', '    ' + tag + '\n  </head>');
};

try {
  // Rutas, títulos y datos salen de los mismos módulos que usa el sitio.
  const load = (file) => vite.ssrLoadModule(file);
  const [{ default: App }, metadata, siteRoutes, { default: services }, { default: studio }, studioDetails] = await Promise.all([
    load('/src/App.jsx'),
    load('/src/pageMetadata.js'),
    load('/src/routes.js'),
    load('/src/data/services.json'),
    load('/src/data/studio.json'),
    load('/src/utils/studioDetails.js'),
  ]);

  const routes = [
    { path: siteRoutes.HOME_PATH, file: 'index.html', canonicalPath: '/', structuredData: true, ...metadata.HOME_PAGE },
    {
      path: siteRoutes.CONTACT_PATH,
      file: siteRoutes.CONTACT_PATH.slice(1) + '.html',
      canonicalPath: siteRoutes.CONTACT_PATH,
      ...metadata.CONTACT_PAGE,
    },
    ...services.map((service) => ({
      path: siteRoutes.servicePath(service),
      file: siteRoutes.servicePath(service).slice(1) + '.html',
      canonicalPath: siteRoutes.servicePath(service),
      ...metadata.servicePage(service),
    })),
    { path: '/__not-found__', file: '404.html', noIndex: true, ...metadata.NOT_FOUND_PAGE },
  ];

  // Datos estructurados (schema.org) para que los buscadores identifiquen al estudio.
  const structuredData = () => {
    const address = studioDetails.fullAddress();
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: studio.name,
      description: metadata.HOME_PAGE.description,
      telephone: '+' + studio.whatsapp,
      knowsAbout: services.map((service) => service.title),
      sameAs: studio.social.map((profile) => profile.url),
    };
    if (studio.email) data.email = studio.email;
    if (studio.hours) data.openingHours = studio.hours;
    if (address) {
      data.address = {
        '@type': 'PostalAddress',
        streetAddress: studio.address || undefined,
        addressLocality: studio.city || undefined,
        addressRegion: studio.province || undefined,
        addressCountry: 'AR',
      };
    }
    if (studio.lawyer) data.employee = { '@type': 'Person', name: studio.lawyer };
    if (siteUrl) {
      data.url = siteUrl + '/';
      data.image = siteUrl + metadata.HOME_PAGE.image;
      data.logo = siteUrl + '/icons/icon-512.png';
    }
    // Se escapa < para que el contenido nunca pueda cerrar la etiqueta script.
    return JSON.stringify(data).replaceAll('<', '\\u003c');
  };

  const renderRoute = (baseHtml, route) => {
    const markup = renderToString(
      React.createElement(StaticRouter, { location: route.path }, React.createElement(App))
    );
    let html = baseHtml.replace('<div id="root"></div>', '<div id="root">' + markup + '</div>');

    html = html.replace(/<title>[^<]*<\/title>/, '<title>' + escapeHtml(route.title) + '</title>');
    html = setMeta(html, 'name', 'description', route.description);
    html = setMeta(html, 'property', 'og:title', route.title);
    html = setMeta(html, 'property', 'og:description', route.description);
    html = setMeta(html, 'name', 'twitter:title', route.title);
    html = setMeta(html, 'name', 'twitter:description', route.description);

    if (route.structuredData) {
      html = html.replace('</head>', '    <script type="application/ld+json">' + structuredData() + '</script>\n  </head>');
    }
    if (route.noIndex) {
      html = setMeta(html, 'name', 'robots', 'noindex, nofollow');
    }
    if (siteUrl && route.canonicalPath) {
      const canonicalUrl = siteUrl + route.canonicalPath;
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
  for (const route of routes) {
    const destination = path.join(distDirectory, route.file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, renderRoute(baseHtml, route));
    process.stdout.write('Página generada: ' + route.file + '\n');
  }

  const sitemapRoutes = routes.filter((route) => !route.noIndex && route.canonicalPath);
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
} finally {
  await vite.close();
}
