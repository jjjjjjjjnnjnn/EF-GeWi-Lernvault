# webui: daily dev entry for EF-Lernvault WebUI (ASCII only, PS 5.1 safe)
# Usage: . .\scripts\webui.ps1  (from vault root)
$Port = 1420
$AppDir = Join-Path $PSScriptRoot "..\App-EF-Lernvault"
$Url = "http://localhost:${Port}/"

$busy = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($busy) {
  Write-Host "WebUI already on ${Url}"
} else {
  Write-Host "Starting WebUI in ${AppDir} ..."
  Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $AppDir -WindowStyle Minimized
  $ok = $false
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep 1
    try {
      $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
      if ($r.StatusCode -eq 200) { $ok = $true; break }
    } catch { }
  }
  if ($ok) { Write-Host "WebUI up on ${Url}" } else { Write-Host "WARN: not responding yet, check the minimized window" }
}
Start-Process $Url
