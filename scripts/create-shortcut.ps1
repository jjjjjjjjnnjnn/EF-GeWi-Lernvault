$desktop = [Environment]::GetFolderPath('Desktop')
$targetBat = Join-Path $PSScriptRoot "..\启动本地服务器并打开浏览器.bat"
$workDir = Join-Path $PSScriptRoot ".."

$resolvedTarget = (Resolve-Path $targetBat).Path
$resolvedWorkDir = (Resolve-Path $workDir).Path

$wscript = New-Object -ComObject WScript.Shell

$shortcutPath = Join-Path $desktop "Start-EF-Lernvault.lnk"
$shortcut = $wscript.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $resolvedTarget
$shortcut.WorkingDirectory = $resolvedWorkDir
$shortcut.Description = "EF-Lernvault Local Web Server"
$shortcut.Save()

Write-Host "Created: $shortcutPath"
