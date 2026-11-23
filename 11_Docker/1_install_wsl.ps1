# Крок 1 (Windows). Запускати в PowerShell ВІД ІМЕНІ АДМІНІСТРАТОРА:
#   powershell -ExecutionPolicy Bypass -File .\1_install_wsl.ps1
# Після завершення - ПЕРЕЗАВАНТАЖИТИ комп'ютер.

$ErrorActionPreference = "Stop"

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Запустіть PowerShell від імені адміністратора і повторіть." -ForegroundColor Red
    exit 1
}

Write-Host "==> Встановлюю WSL + Ubuntu..." -ForegroundColor Cyan
wsl --install -d Ubuntu

Write-Host "==> Встановлюю DBeaver (для скріншоту підключення до Postgres)..." -ForegroundColor Cyan
if (Get-Command winget -ErrorAction SilentlyContinue) {
    winget install --id dbeaver.dbeaver -e --accept-source-agreements --accept-package-agreements
} else {
    Write-Host "winget не знайдено - завантажте DBeaver Community вручну: https://dbeaver.io/download/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Готово. ПЕРЕЗАВАНТАЖТЕ комп'ютер." -ForegroundColor Green
Write-Host "Після перезавантаження відкриється Ubuntu - придумайте логін і пароль," -ForegroundColor Green
Write-Host "потім запустіть 2_docker_homework.sh (див. README.txt)." -ForegroundColor Green
