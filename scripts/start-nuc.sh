#!/usr/bin/env bash
# Inicia (o reinicia) el servidor en el puerto 3004.
# Con --stop solo detiene el proceso iniciado por este script.
set -eu
cd "$(dirname "$0")/.."

. scripts/node-nuc.sh
ensure_nuc_node
node --check server.mjs
test -f dist/index.html
test -f dist/404.html

server_responds() {
  node --input-type=module -e 'import http from "node:http"; const request = http.get("http://127.0.0.1:3004/", (response) => { response.resume(); process.exitCode = response.statusCode === 200 ? 0 : 1; }); request.on("error", () => process.exit(1)); request.setTimeout(2000, () => { request.destroy(); process.exitCode = 1; });' 2>/dev/null
}

# Si el servicio de systemd está instalado (scripts/service-nuc.sh), se delega en él.
if [ "${1:-}" != "--stop" ] && command -v systemctl >/dev/null 2>&1 \
  && systemctl --user is-enabled --quiet estudio-rs.service 2>/dev/null; then
  echo 'Reiniciando el servicio estudio-rs...'
  systemctl --user restart estudio-rs.service
  for attempt in $(seq 1 20); do
    if server_responds; then
      echo 'Listo: http://192.168.1.250:3004'
      echo 'Registro: journalctl --user -u estudio-rs'
      exit 0
    fi
    sleep 0.25
  done
  echo 'El servicio no respondió. Estado:' >&2
  systemctl --user status estudio-rs.service --no-pager >&2 || true
  exit 1
fi

pid_file="$PWD/.nuc-server.pid"
if [ -f "$pid_file" ]; then
  previous_pid=$(cat "$pid_file")
  case "$previous_pid" in
    ''|*[!0-9]*) echo 'El archivo de PID no es válido.' >&2; exit 1 ;;
  esac
  if kill -0 "$previous_pid" 2>/dev/null; then
    if [ "$(readlink "/proc/$previous_pid/cwd")" = "$PWD" ] && tr '\0' '\n' < "/proc/$previous_pid/cmdline" | grep -Fxq "$PWD/server.mjs"; then
      echo 'Deteniendo el servidor anterior de este proyecto...'
      kill "$previous_pid"
      for attempt in $(seq 1 30); do
        if ! kill -0 "$previous_pid" 2>/dev/null; then break; fi
        sleep 0.2
      done
      if kill -0 "$previous_pid" 2>/dev/null; then
        echo 'El servidor anterior no terminó. Revisá nuc-server.log.' >&2
        exit 1
      fi
    else
      echo 'El PID guardado pertenece a otro proceso. No se modificó ese proceso.' >&2
      exit 1
    fi
  fi
fi

if [ "${1:-}" = "--stop" ]; then
  rm -f "$pid_file"
  exit 0
fi

node --input-type=module -e 'import net from "node:net"; const server = net.createServer(); server.on("error", (error) => { console.error("No se puede usar el puerto 3004: " + error.message); process.exit(1); }); server.listen(3004, "0.0.0.0", () => server.close());'

# Sin systemd, el registro se rota al iniciar si supera 5 MB (se conserva una copia .1).
if [ -f nuc-server.log ] && [ "$(wc -c < nuc-server.log)" -gt 5242880 ]; then
  mv nuc-server.log nuc-server.log.1
fi

nohup env NODE_ENV=production HOST=0.0.0.0 PORT=3004 node "$PWD/server.mjs" >> "$PWD/nuc-server.log" 2>&1 < /dev/null &
server_pid=$!
printf '%s\n' "$server_pid" > "$pid_file"
echo "Iniciando servidor (PID $server_pid)..."

for attempt in $(seq 1 20); do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    tail -n 30 nuc-server.log
    exit 1
  fi
  if server_responds; then
    echo 'Listo: http://192.168.1.250:3004'
    echo "Registro: $PWD/nuc-server.log"
    exit 0
  fi
  sleep 0.25
done
echo 'El servidor no respondió. Últimos mensajes:' >&2
tail -n 30 nuc-server.log
exit 1
