@echo off
title EF-Lernvault Stopper
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\stop-webui.ps1"
