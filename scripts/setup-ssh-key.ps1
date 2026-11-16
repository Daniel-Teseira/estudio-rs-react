param([string]$Destino = 'daniel@192.168.1.250')

# Configura el acceso por clave SSH al NUC para no escribir la contraseña en cada despliegue.
# Crea la clave solo si no existe (ssh-keygen pregunta si querés protegerla con una frase)
# y la agrega una sola vez a ~/.ssh/authorized_keys del NUC (pide la contraseña esta vez).

$ErrorActionPreference = 'Stop'
$key = Join-Path $HOME '.ssh\id_ed25519'

if (!(Test-Path -LiteralPath "$key.pub")) {
    New-Item -ItemType Directory -Force (Split-Path $key) | Out-Null
    Write-Host 'Creando una clave SSH nueva...'
    ssh-keygen -t ed25519 -f $key -C "$env:USERNAME@$env:COMPUTERNAME"
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear la clave SSH.' }
}

$publicKey = (Get-Content -LiteralPath "$key.pub" -Raw).Trim()
Write-Host 'Autorizando la clave en el NUC. Ingresá la contraseña SSH por última vez.'
# Sin comillas dobles: Windows PowerShell 5.1 las quita al pasar argumentos a ssh.
$remoteCommand = 'umask 077; mkdir -p ~/.ssh; touch ~/.ssh/authorized_keys; tr -d ''\r'' > ~/.ssh/.estudio-rs-key; grep -qxFf ~/.ssh/.estudio-rs-key ~/.ssh/authorized_keys || cat ~/.ssh/.estudio-rs-key >> ~/.ssh/authorized_keys; rm -f ~/.ssh/.estudio-rs-key'
$publicKey | ssh $Destino $remoteCommand
if ($LASTEXITCODE -ne 0) { throw 'No se pudo autorizar la clave en el NUC.' }

ssh -o BatchMode=yes $Destino 'echo Acceso por clave configurado.'
if ($LASTEXITCODE -ne 0) { throw 'La clave quedó copiada, pero el NUC todavía pide contraseña.' }
