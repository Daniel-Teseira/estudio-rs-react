#!/usr/bin/env bash
# Instala en el NUC la versión que deploy-nuc.ps1 descomprimió en .nuc-incoming.*
# Guarda la versión anterior en .nuc-backup.* (se conservan las últimas 3) para
# poder volver atrás con scripts/rollback-nuc.sh.
set -eu
project_directory=$(pwd -P)
incoming=$(cd "$(dirname "$0")/.." && pwd -P)
case "$incoming" in
  "$project_directory"/.nuc-incoming.*) ;;
  *) echo 'La carpeta de despliegue no pertenece a este proyecto.' >&2; exit 1 ;;
esac

. "$incoming/scripts/node-nuc.sh"
ensure_nuc_node
node --check "$incoming/server.mjs"
test -f "$incoming/dist/index.html"
test -f "$incoming/dist/404.html"

# Copia de seguridad de la versión publicada (sitio, servidor y configuración).
if [ -d dist ]; then
  backup=$(mktemp -d "$project_directory/.nuc-backup.XXXXXX")
  mv "$project_directory/dist" "$backup/dist"
  for file in server.mjs package.json vercel.json api/client-errors.js; do
    if [ -f "$file" ]; then
      mkdir -p "$backup/$(dirname "$file")"
      cp "$file" "$backup/$file"
    fi
  done
  echo "Versión anterior guardada en $(basename "$backup")"
fi

cp "$incoming/server.mjs" "$incoming/package.json" "$incoming/vercel.json" .
mkdir -p api scripts
cp "$incoming/api/client-errors.js" api/
cp "$incoming/scripts/start-nuc.sh" "$incoming/scripts/node-nuc.sh" "$incoming/scripts/service-nuc.sh" \
  "$incoming/scripts/rollback-nuc.sh" "$incoming/scripts/report-nuc.sh" "$incoming/scripts/report-nuc.mjs" scripts/
mv "$incoming/dist" "$project_directory/dist"

# Conserva solo las 3 copias más recientes.
find "$project_directory" -maxdepth 1 -type d -name '.nuc-backup.*' -printf '%T@ %p\n' \
  | sort -rn | tail -n +4 | cut -d' ' -f2- | while IFS= read -r old_backup; do
    rm -rf -- "$old_backup"
  done

# Con el servicio instalado se regenera su configuración (por si cambió) y se reinicia.
if command -v systemctl >/dev/null 2>&1 && systemctl --user is-enabled --quiet estudio-rs.service 2>/dev/null; then
  bash scripts/service-nuc.sh --quiet
else
  bash scripts/start-nuc.sh
fi
