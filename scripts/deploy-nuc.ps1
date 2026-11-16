param(
    [string]$Destino = 'daniel@192.168.1.250',
    # Despliega aunque dist/ no corresponda al commit actual.
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
$archive = Join-Path $env:TEMP ('estudio-rs-nuc-' + [guid]::NewGuid().ToString('N') + '.tar.gz')
$nucHost = ($Destino -split '@')[-1]

Push-Location -LiteralPath $projectDirectory
try {
    if (!(Test-Path -LiteralPath 'dist/index.html') -or !(Test-Path -LiteralPath 'dist/version.json')) {
        throw 'Primero ejecutá npm run check para generar dist/.'
    }

    # Evita publicar un build viejo o compilado con cambios sin commitear.
    $build = Get-Content -LiteralPath 'dist/version.json' -Raw | ConvertFrom-Json
    $head = (git rev-parse HEAD).Trim()
    $pending = git status --porcelain --untracked-files=no
    $problems = @()
    if ($build.commit -ne $head) { $problems += "dist/ es del commit $($build.commit.Substring(0, 7)) y el actual es $($head.Substring(0, 7))." }
    if ($build.dirty) { $problems += 'dist/ se compiló con cambios sin commitear.' }
    if ($pending) { $problems += 'Hay cambios sin commitear en el proyecto.' }
    if ($problems.Count -gt 0) {
        $problems | ForEach-Object { Write-Warning $_ }
        if (!$Force) { throw 'Commiteá los cambios y ejecutá npm run check, o usá -Force para desplegar igual.' }
    }

    Write-Host "Preparando la versión $($build.version) ($($build.commit.Substring(0, 7))) para el NUC..."
    tar -czf $archive dist server.mjs package.json vercel.json api/client-errors.js scripts/start-nuc.sh scripts/node-nuc.sh scripts/install-nuc.sh scripts/service-nuc.sh scripts/rollback-nuc.sh scripts/report-nuc.sh scripts/report-nuc.mjs
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo generar el archivo de despliegue.' }

    Write-Host 'Copiando al NUC...'
    scp $archive "${Destino}:~/estudio-rs-nuc.tar.gz"
    if ($LASTEXITCODE -ne 0) { throw 'Falló la transferencia al NUC.' }

    Write-Host 'Instalando y reiniciando el servidor...'
    # La carpeta temporal y el archivo copiado se borran siempre, aunque la instalación falle.
    $remoteCommand = 'mkdir -p ~/estudio-rs-react && cd ~/estudio-rs-react || exit 1; incoming=$(mktemp -d .nuc-incoming.XXXXXX) || exit 1; status=0; tar -xzf ~/estudio-rs-nuc.tar.gz -C "$incoming" && bash "$incoming/scripts/install-nuc.sh" || status=$?; rm -rf -- "$incoming" ~/estudio-rs-nuc.tar.gz; exit $status'
    ssh $Destino $remoteCommand
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo iniciar el servidor. Revisá el mensaje anterior.' }

    $published = Invoke-RestMethod -Uri "http://${nucHost}:3004/version.json" -TimeoutSec 10
    Write-Host "Publicado: versión $($published.version), commit $($published.commit.Substring(0, 7))."
    Write-Host "Abrí http://${nucHost}:3004 en el navegador."
}
finally {
    Pop-Location
    if (Test-Path -LiteralPath $archive) { Remove-Item -LiteralPath $archive }
}
