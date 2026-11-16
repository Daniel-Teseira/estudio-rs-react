#!/usr/bin/env bash
# Instala el servidor como servicio de usuario de systemd para que arranque
# solo después de reiniciar el NUC y se reinicie si falla. No requiere sudo,
# salvo para habilitar "linger" si la distribución lo exige.
# Los registros van a journald, que los rota automáticamente:
#   journalctl --user -u estudio-rs -f
# Con --quiet (lo usa install-nuc.sh en cada despliegue) no muestra la ayuda final.
set -eu
cd "$(dirname "$0")/.."

if ! command -v systemctl >/dev/null 2>&1; then
  echo 'Este equipo no usa systemd. Seguí usando scripts/start-nuc.sh.' >&2
  exit 1
fi

. scripts/node-nuc.sh
ensure_nuc_node
node_bin=$(command -v node)
node --check server.mjs
test -f dist/index.html

# Detiene el proceso iniciado con nohup para liberar el puerto 3004.
bash scripts/start-nuc.sh --stop

unit_directory="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"
mkdir -p "$unit_directory"
cat > "$unit_directory/estudio-rs.service" <<UNIT
[Unit]
Description=Estudio Jurídico RS (sitio web en el puerto 3004)
After=network-online.target

[Service]
WorkingDirectory=$PWD
Environment=NODE_ENV=production HOST=0.0.0.0 PORT=3004
ExecStart=$node_bin $PWD/server.mjs
Restart=on-failure
RestartSec=3
StandardOutput=journal
StandardError=journal
SyslogIdentifier=estudio-rs

[Install]
WantedBy=default.target
UNIT

systemctl --user daemon-reload
systemctl --user enable --now estudio-rs.service

# Sin linger, los servicios de usuario se detienen al cerrar la última sesión.
if [ "$(loginctl show-user "$USER" --property=Linger --value 2>/dev/null)" != "yes" ]; then
  if ! loginctl enable-linger "$USER" 2>/dev/null; then
    echo "ATENCIÓN: el sitio se detendrá al cerrar la sesión SSH." >&2
    echo "Para evitarlo, ejecutá una vez: sudo loginctl enable-linger $USER" >&2
  fi
fi

bash scripts/start-nuc.sh
if [ "${1:-}" != "--quiet" ]; then
  echo 'Servicio instalado. Comandos útiles:'
  echo '  systemctl --user status estudio-rs'
  echo '  systemctl --user restart estudio-rs'
  echo '  journalctl --user -u estudio-rs -f'
  echo 'Si actualizás Node.js, volvé a ejecutar: bash scripts/service-nuc.sh'
fi
