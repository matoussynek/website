@echo off

echo Checking all dependencies...
echo Checking Node.js
WHERE node
IF %ERRORLEVEL% NEQ 0 (
  echo Node.js not installed.
  echo Installing Node.js...
  call winget install -e --id OpenJS.NodeJS
)
echo Checking http-server
call npm ls -g | findstr http-server
if %ERRORLEVEL% NEQ 0 (
  echo http-server not found.
  echo Installing http-server...
  call npm install http-server -g
)
echo All dependencies installed.
