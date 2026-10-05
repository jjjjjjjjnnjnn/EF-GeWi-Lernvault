# webui: daily dev entry for EF-Lernvault WebUI (ASCII only, PS 5.1 safe)
$Port = 1420
$AppDir = Join-Path $PSScriptRoot "..\App-EF-Lernvault"
$Url = "http://localhost:${Port}/"

Write-Host "======================================================================"
Write-Host "  EF-Lernvault Local Server Launcher"
Write-Host "======================================================================"
Write-Host ""

$busy = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($busy) {
  Write-Host "[INFO] WebUI server is already running on $Url"
  Write-Host "[OK] Opening default browser..."
  [System.Diagnostics.Process]::Start($Url) | Out-Null
} else {
  Write-Host "[1/2] Starting Vite dev server on port $Port ..."
  Start-Process -FilePath "cmd.exe" -ArgumentList "/k title EF-Lernvault-DevServer && npm run dev" -WorkingDirectory $AppDir -WindowStyle Minimized
  $ok = $false
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    $conn = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($conn) { $ok = $true; break }
  }
  if ($ok) {
    Write-Host "[2/2] Server is ready on $Url"
    Write-Host "[OK] Opening default browser..."
    [System.Diagnostics.Process]::Start($Url) | Out-Null
  } else {
    Write-Host "[WARN] Server is taking longer to start. Opening browser..."
    [System.Diagnostics.Process]::Start($Url) | Out-Null
  }
}

Write-Host ""
Write-Host "======================================================================"
Write-Host "  [OK] EF-Lernvault is now live in your browser: $Url"
Write-Host "  To stop the server, double click Stop-WebUI.bat"
Write-Host "======================================================================"
Write-Host ""
Start-Sleep -Seconds 2
exit 0
