# stop-webui: stop local server on port 1420 (ASCII only, PS 5.1 safe)
$Port = 1420

Write-Host "======================================================================"
Write-Host "  EF-Lernvault Server Stopper"
Write-Host "======================================================================"
Write-Host ""

$conns = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($conns) {
  $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($pidToKill in $pids) {
    try {
      Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
    } catch { }
  }
  Write-Host "[OK] Port $Port server stopped successfully."
} else {
  Write-Host "[INFO] Port $Port is not currently running."
}

Write-Host ""
Start-Sleep -Seconds 1
exit 0
