@echo off
REM ============================================================
REM  Bev Ads - local website launcher
REM  Double-click this file to run the site on your machine.
REM  Keep this window open while viewing; close it to stop.
REM ============================================================
title Bev Ads - Local Server (keep open)
cd /d "%~dp0"

set "PHP=C:\xampp\php\php.exe"
set "PORT=5600"

echo Starting Bev Ads at http://localhost:%PORT%/ ...
start "" "http://localhost:%PORT%/"

if exist "%PHP%" (
    "%PHP%" -S 127.0.0.1:%PORT% -t "%~dp0"
) else (
    echo.
    echo Could not find PHP at %PHP%.
    echo Opening the site directly in your browser instead...
    start "" "%~dp0index.html"
    echo.
    pause
)
