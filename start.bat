@echo off
cd /d "%~dp0"
title personal-site - local preview

if not exist node_modules (
  echo [1/2] Installing dependencies, first run only...
  call npm install
  if errorlevel 1 goto fail
)

echo [2/2] Starting dev server on http://localhost:3000
echo.
echo   Close this window to stop the server.
echo.

start "" cmd /c "timeout /t 5 >nul & start http://localhost:3000"
call npm run dev
goto end

:fail
echo.
echo Install failed. Check your network and run "npm install" manually.
pause

:end
pause
