#!/usr/bin/env bash
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
cp "$incoming/server.mjs" "$incoming/package.json" "$incoming/vercel.json" .
mkdir -p api scripts
cp "$incoming/api/client-errors.js" api/
cp "$incoming/scripts/start-nuc.sh" "$incoming/scripts/node-nuc.sh" scripts/
if [ -d dist ]; then
  backup=$(mktemp -d "$project_directory/.nuc-backup.XXXXXX")
  mv "$project_directory/dist" "$backup/dist"
fi
mv "$incoming/dist" "$project_directory/dist"
bash scripts/start-nuc.sh
