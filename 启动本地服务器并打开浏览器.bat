@echo off
title EF-Lernvault Launcher
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\webui.ps1"
if %ERRORLEVEL% NEQ 0 (
    pause
)
