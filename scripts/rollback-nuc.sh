#!/usr/bin/env bash
# Vuelve a la versión anterior guardada por install-nuc.sh y reinicia el sitio.
# La versión que estaba publicada queda guardada como copia, así que ejecutarlo
# de nuevo deshace el rollback.
set -eu
cd "$(dirname "$0")/.."
project_directory=$(pwd -P)

latest=$(find "$project_directory" -maxdepth 1 -type d -name '.nuc-backup.*' -printf '%T@ %p\n' \
  | sort -rn | head -n 1 | cut -d' ' -f2-)
if [ -z "$latest" ] || [ ! -f "$latest/dist/index.html" ]; then
  echo 'No hay una versión anterior guardada.' >&2
  exit 1
fi

current=$(mktemp -d "$project_directory/.nuc-backup.XXXXXX")
mv dist "$current/dist"
for file in server.mjs package.json vercel.json api/client-errors.js; do
  if [ -f "$file" ]; then
    mkdir -p "$current/$(dirname "$file")"
    cp "$file" "$current/$file"
  fi
done

mv "$latest/dist" dist
for file in server.mjs package.json vercel.json api/client-errors.js; do
  if [ -f "$latest/$file" ]; then
    mkdir -p "$(dirname "$file")"
    cp "$latest/$file" "$file"
  fi
done
rm -rf -- "$latest"

if [ -f dist/version.json ]; then
  echo "Restaurada la versión: $(tr -d '\n' < dist/version.json)"
fi
bash scripts/start-nuc.sh
