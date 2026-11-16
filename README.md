# Estudio Jurídico RS

Sitio institucional de una sola página creado con React, React Router y Vite.

## Requisitos

- Node.js 24.x
- npm

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

Vite genera la versión desplegable en `dist/`. El postbuild renderiza cada ruta con React, deja metadatos específicos y datos estructurados, y prepara una página 404 estática. Vercel publica los archivos HTML con URLs limpias.

En Vercel, configurá Node.js `24.x` en **Project Settings → Build & Development Settings**. El proyecto usa `npm run build` y publica `dist/`.

Para generar URLs canónicas, etiquetas completas para compartir, datos estructurados con URL y `sitemap.xml`, agregá `VITE_SITE_URL` en las variables de entorno de Vercel con el dominio público (ver `.env.example`), por ejemplo `https://tu-dominio.com`. Mientras el sitio no tenga dominio, esos metadatos absolutos y el sitemap se omiten.

## NUC en el puerto 3004

Con la compilación actual en `dist/`, ejecutá en PowerShell:

```powershell
& .\scripts\deploy-nuc.ps1
```

El script copia la versión compilada a `daniel@192.168.1.250:~/estudio-rs-react` y arranca `server.mjs` en `0.0.0.0:3004`. SSH solicita la contraseña para copiar y nuevamente para iniciar. Busca Node.js 18 o superior en el entorno y en NVM. Si falta, instala el binario oficial de Node.js 24 en `~/.local/share/estudio-rs/` después de verificar su SHA256, sin sudo ni cambios globales. Esta instalación requiere Linux x64 o arm64, curl o wget, tar y sha256sum. No requiere instalar las dependencias del proyecto. Para generar una compilación nueva, el proyecto sigue requiriendo Node.js 24.x y `npm run check`.

Abrí `http://192.168.1.250:3004`. El servidor publica las rutas HTML renderizadas, las imágenes, el 404, las redirecciones de `vercel.json` y `/api/client-errors`. Conserva los encabezados de seguridad y permite HTTP en la red local. Los registros quedan en `~/estudio-rs-react/nuc-server.log`.

El proceso continúa al cerrar PowerShell o SSH.

### Arranque automático (systemd)

Para que el sitio arranque solo después de reiniciar el NUC y se reinicie si falla, ejecutá una vez por SSH:

```bash
cd ~/estudio-rs-react && bash scripts/service-nuc.sh
```

Instala el servicio de usuario `estudio-rs` (sin sudo) y detiene el proceso iniciado con nohup. Si la distribución no permite habilitar *linger*, el script indica el único comando con sudo necesario. Desde entonces, `deploy-nuc.ps1` y `start-nuc.sh` reinician el servicio. Estado: `systemctl --user status estudio-rs`. Si actualizás Node.js en el NUC, volvé a ejecutar el script.

Sin el servicio, después de reiniciar el NUC ejecutá `cd ~/estudio-rs-react && bash scripts/start-nuc.sh` por SSH. El script comprueba el puerto y solo reinicia un proceso anterior si verifica que corresponde a este servidor.

## Verificación

```bash
npm run lint
npm test
npm run check
```

`npm run check` ejecuta ESLint y los tests, y luego compila, renderiza y verifica las páginas de producción. GitHub Actions corre lo mismo en cada push a `main` y en cada pull request (`.github/workflows/ci.yml`).

## Rutas

- `/` es la portada, `/contacto` el contacto y `/servicios/<slug>` cada área.
- `/home` y `/contact` redirigen de forma permanente (308) a `/` y `/contacto`. Las redirecciones se definen en `vercel.json`; `server.mjs` las aplica igual en el NUC y `src/routes.js` en la navegación interna. Un test verifica que coincidan.
- `/contacto?area=<slug>` abre el formulario con el área preseleccionada.

## Datos del sitio

- `src/data/studio.json`: nombre, WhatsApp, redes y datos profesionales (abogada/o, matrícula, dirección, horario, correo). Los campos vacíos no se muestran; al completarlos aparecen en contacto, en el pie y en los datos estructurados para buscadores.
- `src/data/services.json`: cada área con su `slug` (URL), descripción, introducción, casos, documentación útil y preguntas frecuentes.
- `src/data/images.json`: imágenes, carpeta y anchos generados. Lo usan el optimizador y los componentes.
- `src/pageMetadata.js`: títulos y descripciones de cada página, compartidos con el prerender.

## Imágenes e íconos

Las fuentes originales están en `src/assets/images/source/`. Cuando se actualicen, ejecutá:

```bash
npm run images:optimize
```

El script genera imágenes WebP optimizadas en `public/images/` y los íconos (favicon, Apple y PWA) en `public/icons/` a partir del logo propio `src/assets/icons/logo.svg`. Ambas carpetas se regeneran en cada `dev` y `build`, por eso no se versionan.

Se generan varios anchos por imagen; los componentes usan `srcset` y `sizes` para que el navegador elija la variante adecuada para cada pantalla.

## Estilos y fuentes

- Bootstrap se compila desde SCSS con solo los componentes usados (`src/styles/bootstrap.scss`). Para usar otro componente de Bootstrap, agregá su `@import` ahí.
- La fuente Quattrocento se sirve desde el propio sitio con `@fontsource/quattrocento`; la CSP no permite dominios externos.

## Seguridad y monitoreo en Vercel

`vercel.json` configura encabezados de seguridad para el sitio. La función `api/client-errors.js` recibe errores del navegador y métricas de carga (FCP, LCP, CLS, TTFB, carga total e interacción máxima) y las escribe en los logs de funciones de Vercel. En producción, revisá **Vercel → Project → Logs** y filtrá por `client_error` o `client_performance`. Estos registros empiezan a aparecer después del despliegue; el sitio sigue usando WhatsApp para las consultas y no guarda datos del formulario.
