# Estudio Jurídico RS

Sitio institucional creado con React, React Router y Vite. Cada página se prerenderiza a HTML estático y se publica en Vercel y en un NUC de la red local.

## Requisitos

- Node.js 24.x
- npm

## Desarrollo

```bash
npm install
npm run dev
```

## Verificación

```bash
npm run lint          # ESLint, con reglas de accesibilidad (jsx-a11y)
npm run format        # aplica Prettier a todo el proyecto
npm test              # tests unitarios y del servidor
npm run test:e2e      # tests en el navegador con Playwright (requiere npm run build)
npm run check         # todo lo anterior, más el build completo
```

La primera vez, instalá el navegador de Playwright con `npx playwright install chromium`. Los tests E2E levantan `server.mjs` sobre `dist/` y prueban la navegación, el scroll, los menús de escritorio y móvil, el carrusel, el formulario, las redirecciones y el 404, y fallan si aparece cualquier error en la consola (incluidas las violaciones de la CSP).

GitHub Actions corre `npm run check` en cada push a `main` y en cada pull request (`.github/workflows/ci.yml`). Si fallan los tests E2E, el informe queda como artefacto del workflow.

## Producción

```bash
npm run build
npm run preview
```

Vite genera `dist/`. Después del build se ejecutan, en orden:

1. `scripts/prerender-routes.mjs`: renderiza cada ruta a HTML con sus metadatos, los datos estructurados (`LegalService`), el 404, `robots.txt` y, si hay dominio, `sitemap.xml`.
2. `scripts/build-info.mjs`: escribe `dist/version.json` con la versión, el commit y si había cambios sin commitear.
3. `scripts/compress-build.mjs`: deja versiones `.br` y `.gz` de los archivos de texto para el NUC (en Vercel se omite, porque Vercel comprime solo).
4. `scripts/verify-build.mjs`: comprueba el resultado.

En Vercel, configurá Node.js `24.x` en **Project Settings → Build & Development Settings**. El proyecto usa `npm run build` y publica `dist/`. Agregá `VITE_SITE_URL` con el dominio público (ver `.env.example`) para generar URLs canónicas, imágenes para compartir y `sitemap.xml`.

### Caché y compresión

- `/assets/*` lleva hash en el nombre: se cachea un año (`immutable`), en Vercel y en el NUC.
- El resto (HTML, imágenes, íconos) se revalida en cada visita; con `ETag` el servidor responde `304` sin volver a enviarlo.
- El NUC entrega brotli o gzip según lo que acepte el navegador.

## NUC en el puerto 3004

### Primera vez: acceso por clave SSH

Para no escribir la contraseña en cada despliegue, ejecutá una vez en PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-ssh-key.ps1
```

Crea una clave en `~\.ssh\id_ed25519` si no existe (podés protegerla con una frase) y la autoriza en el NUC. Pide la contraseña SSH por última vez.

### Desplegar

Commiteá los cambios, ejecutá `npm run check` y después:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\deploy-nuc.ps1
```

El script se niega a publicar si `dist/` no corresponde al commit actual o se compiló con cambios sin commitear (`-Force` lo permite igual). Copia la versión a `daniel@192.168.1.250:~/estudio-rs-react`, guarda la anterior, reinicia el servidor y al final muestra la versión publicada, que también se puede ver en `http://192.168.1.250:3004/version.json`.

En el NUC se conservan las últimas 3 versiones en carpetas `.nuc-backup.*`; la carpeta temporal y el archivo copiado se borran siempre. Si no hay Node.js 18 o superior, se instala el binario oficial de Node.js 24 en `~/.local/share/estudio-rs/` después de verificar su SHA256, sin sudo.

### Volver a la versión anterior

```bash
ssh daniel@192.168.1.250 "cd ~/estudio-rs-react && bash scripts/rollback-nuc.sh"
```

La versión que estaba publicada queda guardada, así que ejecutarlo de nuevo deshace el rollback.

### Arranque automático y registros (systemd)

El sitio corre como servicio de usuario `estudio-rs`: arranca solo al reiniciar el NUC y se reinicia si falla. Para instalarlo en un equipo nuevo:

```bash
ssh -t daniel@192.168.1.250 "cd ~/estudio-rs-react && bash scripts/service-nuc.sh"
```

Si avisa que falta *linger*, ejecutá una vez `sudo loginctl enable-linger daniel`; sin eso, el servicio se detiene al cerrar la sesión SSH. Cada despliegue regenera la configuración del servicio y lo reinicia.

- Estado: `systemctl --user status estudio-rs`
- Registros (journald los rota solo): `journalctl --user -u estudio-rs -f`. Si no muestra nada, la distribución no guarda el journal de usuario: `sudo journalctl _SYSTEMD_USER_UNIT=estudio-rs.service`.

Sin el servicio, `bash scripts/start-nuc.sh` inicia el servidor con nohup y escribe en `nuc-server.log`, que se rota al superar 5 MB.

## Rutas

- `/` portada, `/contacto`, `/privacidad` y `/servicios/<slug>` para cada área.
- `/home` y `/contact` redirigen con 308 a `/` y `/contacto`. Se definen en `vercel.json`; `server.mjs` las aplica en el NUC y `src/routes.js` en la navegación interna. Un test verifica que coincidan.
- `/contacto?area=<slug>` abre el formulario con el área preseleccionada.
- Al pasar a otra página se vuelve arriba; con atrás/adelante el navegador restaura la posición.

## Datos y contenido

- `src/data/studio.json`: nombre, WhatsApp, redes y datos profesionales (abogada/o, matrícula, texto "Sobre el estudio", dirección, horario, correo). Los campos vacíos no se muestran; al completarlos aparecen en la portada, en contacto, en el pie y en los datos estructurados.
- `src/data/services.json`: cada área con su `slug`, descripción, introducción, casos, documentación útil y preguntas frecuentes.
- `src/data/process.json`: los pasos de "Cómo trabajamos" de la portada.
- `src/data/images.json`: imágenes, carpeta y anchos generados.
- `src/pageMetadata.js`: títulos y descripciones de cada página, compartidos con el prerender.
- `src/pages/privacy/Privacy.jsx`: política de privacidad (Ley 25.326). Describe lo que hace el sitio hoy; si se agregan cookies, analítica o un formulario que envíe datos al servidor, hay que actualizarla.

Los textos de las áreas, el proceso de trabajo y la política de privacidad son generales y conviene que los revise la abogada antes de publicarlos, respetando las normas del Colegio sobre publicidad profesional.

## Imágenes e íconos

Las fuentes originales están en `src/assets/images/source/`. Cuando se actualicen, ejecutá `npm run images:optimize`. Se generan imágenes WebP en varios anchos en `public/images/` y los íconos (favicon, Apple y PWA) en `public/icons/` a partir de `src/assets/icons/logo.svg`. Ambas carpetas se regeneran en cada `dev` y `build`, por eso no se versionan.

## Estilos

- `src/styles/tokens.css`: colores y tipografías del sitio como variables CSS.
- `src/styles/bootstrap.scss`: solo los estilos de Bootstrap que se usan. El comportamiento de la navbar, el menú desplegable y el carrusel lo resuelven componentes React propios, sin el JavaScript de Bootstrap.
- La fuente Quattrocento se sirve desde el propio sitio con `@fontsource/quattrocento`.

## Seguridad y monitoreo

`vercel.json` define los encabezados de seguridad (CSP sin estilos ni scripts en línea, `Cross-Origin-Opener-Policy`, `X-Frame-Options`, etc.); `server.mjs` aplica los mismos en el NUC. La función `api/client-errors.js` recibe errores del navegador y métricas de carga y las escribe en los registros (en Vercel: **Project → Logs**, filtrando por `client_error` o `client_performance`; en el NUC: journald).
