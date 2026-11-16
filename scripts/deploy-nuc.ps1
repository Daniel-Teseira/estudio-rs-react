param([string]$Destino = 'daniel@192.168.1.250')

$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
$archive = Join-Path $env:TEMP ('estudio-rs-nuc-' + [guid]::NewGuid().ToString('N') + '.tar.gz')

Push-Location -LiteralPath $projectDirectory
try {
    if (!(Test-Path -LiteralPath 'dist/index.html')) {
        throw 'Primero ejecutá npm run check para generar dist/.'
    }
    Write-Host 'Preparando la versión compilada para el NUC...'
    tar -czf $archive dist server.mjs package.json vercel.json api/client-errors.js scripts/start-nuc.sh scripts/node-nuc.sh scripts/install-nuc.sh scripts/service-nuc.sh
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo generar el archivo de despliegue.' }

    Write-Host 'Copiando al NUC. Ingresá la contraseña SSH cuando la solicite.'
    scp $archive "${Destino}:~/estudio-rs-nuc.tar.gz"
    if ($LASTEXITCODE -ne 0) { throw 'Falló la transferencia al NUC.' }

    Write-Host 'Iniciando el servidor. SSH pedirá la contraseña nuevamente.'
    $remoteCommand = 'set -e; mkdir -p ~/estudio-rs-react; cd ~/estudio-rs-react; incoming=$(mktemp -d .nuc-incoming.XXXXXX); tar -xzf ~/estudio-rs-nuc.tar.gz -C "$incoming"; bash "$incoming/scripts/install-nuc.sh"'
    ssh $Destino $remoteCommand
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo iniciar el servidor. Revisá el mensaje anterior.' }
    Write-Host 'Abrí http://192.168.1.250:3004 en el navegador.'
}
finally {
    Pop-Location
    if (Test-Path -LiteralPath $archive) { Remove-Item -LiteralPath $archive }
}
