#!/usr/bin/env bash
# Informe de los últimos N días (7 por defecto): carga, errores y contactos iniciados.
#   bash scripts/report-nuc.sh 30
set -eu
cd "$(dirname "$0")/.."
days="${1:-7}"
case "$days" in
  ''|*[!0-9]*) echo 'Indicá la cantidad de días como número, por ejemplo: bash scripts/report-nuc.sh 30' >&2; exit 1 ;;
esac

. scripts/node-nuc.sh
ensure_nuc_node

if command -v systemctl >/dev/null 2>&1 && systemctl --user is-enabled --quiet estudio-rs.service 2>/dev/null; then
  logs=$(journalctl --user -u estudio-rs --since "$days days ago" -o cat 2>/dev/null || true)
  if [ -z "$logs" ]; then
    echo 'El journal de usuario está vacío. Probá con: sudo journalctl _SYSTEMD_USER_UNIT=estudio-rs.service' >&2
  fi
  printf '%s\n' "$logs" | node scripts/report-nuc.mjs "$days"
else
  # Sin systemd, nuc-server.log no tiene fechas por línea: se resume completo.
  cat nuc-server.log.1 nuc-server.log 2>/dev/null | node scripts/report-nuc.mjs
fi
