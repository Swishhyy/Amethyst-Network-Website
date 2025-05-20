@echo off
REM Cloudflare Pages build script for Windows environments
echo Removing any existing package-lock.json...
if exist package-lock.json del /f package-lock.json

echo Installing dependencies...
call npm install

echo Building site...
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo Build failed with error %ERRORLEVEL%
  exit /b %ERRORLEVEL%
)

echo Build completed successfully!
exit /b 0
