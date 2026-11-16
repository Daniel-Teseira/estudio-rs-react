#!/usr/bin/env bash
# Source this file so the selected runtime remains in PATH for nohup.
ensure_nuc_node() {
  local runtime_root="${XDG_DATA_HOME:-$HOME/.local/share}/estudio-rs"
  local candidate
  if command -v node >/dev/null 2>&1 && node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 18 ? 0 : 1)' 2>/dev/null; then
    return 0
  fi
  # Locate NVM binaries without sourcing shell profiles or changing NVM defaults.
  for candidate in "$runtime_root"/node-v24.*-linux-*/bin "${NVM_DIR:-$HOME/.nvm}"/versions/node/v24.*/bin "${NVM_DIR:-$HOME/.nvm}"/versions/node/v*/bin; do
    if [ -x "$candidate/node" ] && "$candidate/node" -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 18 ? 0 : 1)' 2>/dev/null; then
      export PATH="$candidate:$PATH"
      return 0
    fi
  done

  local architecture
  case "$(uname -s):$(uname -m)" in
    Linux:x86_64) architecture=x64 ;;
    Linux:aarch64|Linux:arm64) architecture=arm64 ;;
    *) echo 'No hay un runtime compatible. Se requiere Linux x64 o arm64 para instalar Node automáticamente.' >&2; return 1 ;;
  esac
  local utility
  for utility in tar sha256sum awk; do
    if ! command -v "$utility" >/dev/null 2>&1; then
      echo "Falta la herramienta $utility en el NUC." >&2
      return 1
    fi
  done
  if ! command -v curl >/dev/null 2>&1 && ! command -v wget >/dev/null 2>&1; then
    echo 'Se necesita curl o wget para descargar Node.js.' >&2
    return 1
  fi

  mkdir -p "$runtime_root" || return 1
  local download_directory
  download_directory=$(mktemp -d "$runtime_root/.download.XXXXXX") || return 1
  echo 'No se encontró Node. Descargando Node.js 24 para este usuario...'
  if command -v curl >/dev/null 2>&1; then
    curl -fL --retry 2 --connect-timeout 15 --max-time 180 https://nodejs.org/dist/latest-v24.x/SHASUMS256.txt -o "$download_directory/SHASUMS256.txt" || return 1
  else
    wget --timeout=180 --tries=2 https://nodejs.org/dist/latest-v24.x/SHASUMS256.txt -O "$download_directory/SHASUMS256.txt" || return 1
  fi
  local archive
  archive=$(awk -v arch="$architecture" '$2 ~ ("^node-v24\\.[0-9]+\\.[0-9]+-linux-" arch "\\.tar\\.gz$") { print $2; exit }' "$download_directory/SHASUMS256.txt")
  if [ -z "$archive" ]; then
    echo 'No se encontró la descarga de Node 24 para este NUC.' >&2
    return 1
  fi
  local version="${archive#node-}"
  version="${version%-linux-*}"
  local download_url="https://nodejs.org/dist/$version/$archive"
  if command -v curl >/dev/null 2>&1; then
    curl -fL --retry 2 --connect-timeout 15 --max-time 600 "$download_url" -o "$download_directory/$archive" || return 1
  else
    wget --timeout=180 --tries=2 "$download_url" -O "$download_directory/$archive" || return 1
  fi
  local checksum
  checksum=$(awk -v name="$archive" '$2 == name { print $1; exit }' "$download_directory/SHASUMS256.txt")
  if ! (cd "$download_directory" && printf '%s  %s\n' "$checksum" "$archive" | sha256sum -c -); then
    echo 'La descarga de Node no superó la verificación SHA256.' >&2
    return 1
  fi
  tar -xzf "$download_directory/$archive" -C "$download_directory" || return 1
  local runtime_name="${archive%.tar.gz}"
  if ! "$download_directory/$runtime_name/bin/node" --version; then
    echo 'El sistema del NUC no puede ejecutar Node 24. Revisá el error anterior.' >&2
    return 1
  fi
  if [ -e "$runtime_root/$runtime_name" ]; then
    echo "Ya existe una instalación que no funciona en $runtime_root/$runtime_name. Revisala antes de continuar." >&2
    return 1
  fi
  mv "$download_directory/$runtime_name" "$runtime_root/$runtime_name" || return 1
  export PATH="$runtime_root/$runtime_name/bin:$PATH"
  rm -f "$download_directory/$archive" "$download_directory/SHASUMS256.txt"
  rmdir "$download_directory"
}
