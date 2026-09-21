# dt-env: DeepTutor session env (run: . .\scripts\dt-env.ps1)
$env:DEEPTUTOR_HOME = "C:\Users\rongj\.deeptutor-home"
chcp 65001 > $null
$env:PYTHONIOENCODING = "utf-8"
$env:VAULT = "C:\Users\rongj\Desktop\学习"
Write-Host "OK: DEEPTUTOR_HOME=$env:DEEPTUTOR_HOME VAULT=$env:VAULT (UTF-8)"
