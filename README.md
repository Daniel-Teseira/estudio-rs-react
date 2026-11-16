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

Vite genera la versión desplegable en `dist/`. El postbuild renderiza cada ruta con React, deja metadatos específicos y prepara una página 404 estática. Vercel publica los archivos HTML con URLs limpias.

En Vercel, configurá Node.js `24.x` en **Project Settings → Build & Development Settings**. El proyecto usa `npm run build` y publica `dist/`.

Para generar URLs canónicas, etiquetas completas para compartir y `sitemap.xml`, agregá `VITE_SITE_URL` en las variables de entorno de Vercel con el dominio público, por ejemplo `https://tu-dominio.com`. Mientras el sitio no tenga dominio, esos metadatos absolutos y el sitemap se omiten.

## NUC en el puerto 3004

Con la compilación actual en `dist/`, ejecutá en PowerShell:

```powershell
& .\scripts\deploy-nuc.ps1
```

El script copia la versión compilada a `daniel@192.168.1.250:~/estudio-rs-react` y arranca `server.mjs` en `0.0.0.0:3004`. SSH solicita la contraseña para copiar y nuevamente para iniciar. Busca Node.js 18 o superior en el entorno y en NVM. Si falta, instala el binario oficial de Node.js 24 en `~/.local/share/estudio-rs/` después de verificar su SHA256, sin sudo ni cambios globales. Esta instalación requiere Linux x64 o arm64, curl o wget, tar y sha256sum. No requiere instalar las dependencias del proyecto. Para generar una compilación nueva, el proyecto sigue requiriendo Node.js 24.x y `npm run check`.

Abrí `http://192.168.1.250:3004`. El servidor publica las rutas HTML renderizadas, las imágenes, el 404 y `/api/client-errors`. Conserva los encabezados de seguridad y permite HTTP en la red local. Los registros quedan en `~/estudio-rs-react/nuc-server.log`.

El proceso continúa al cerrar PowerShell o SSH. Después de reiniciar el NUC, ejecutá `cd ~/estudio-rs-react && bash scripts/start-nuc.sh` por SSH para volver a iniciarlo. El script comprueba el puerto y solo reinicia un proceso anterior si verifica que corresponde a este servidor.

## Verificación

```bash
npm test
npm run check
```

`npm run check` ejecuta las verificaciones de rutas e imágenes y luego compila y renderiza las páginas de producción.

## Áreas de práctica

Las áreas, sus descripciones e imágenes se mantienen en `src/json/Data.json`.

## Imágenes

Las fuentes originales están en `src/assets/images/source/`. Cuando se actualicen, ejecutá:

```bash
npm run images:optimize
```

El script genera imágenes WebP optimizadas en `public/images/`, que son las que usa el sitio.

Ahora genera varios anchos por imagen; los componentes usan `srcset` y `sizes` para que el navegador elija la variante adecuada para cada pantalla.

## Seguridad y monitoreo en Vercel

`vercel.json` configura encabezados de seguridad para el sitio. La función `api/client-errors.js` recibe errores del navegador y métricas de carga (FCP, LCP, CLS, TTFB, carga total e interacción máxima) y las escribe en los logs de funciones de Vercel. En producción, revisá **Vercel → Project → Logs** y filtrá por `client_error` o `client_performance`. Estos registros empiezan a aparecer después del despliegue; el sitio sigue usando WhatsApp para las consultas y no guarda datos del formulario.
