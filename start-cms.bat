@echo off
REM ═════════════════════════════════════════════════════════
REM LOCAL CMS DEVELOPMENT STARTUP SCRIPT
REM This script starts both Decap CMS proxy server and Next.js dev server
REM ═════════════════════════════════════════════════════════

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║   Starting Local CMS Development Environment        ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] node_modules not found!
    echo Please run: npm install
    echo.
    pause
    exit /b 1
)

echo [1/2] Starting Decap CMS Proxy Server...
echo       This will run on port 8081
echo.
start /B "Decap CMS Proxy" cmd /c "npx decap-server"

REM Wait a moment for proxy server to start
timeout /t 3 /nobreak >nul

echo [2/2] Starting Next.js Development Server...
echo       This will run on port 3000
echo.
start /B "Next.js Dev" cmd /c "npm run dev"

REM Wait for dev server
timeout /t 5 /nobreak >nul

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║   ✅ SERVERS STARTED!                                ║
echo ╠══════════════════════════════════════════════════════╣
echo ║   CMS:  http://localhost:3000/admin                 ║
echo ║   Site: http://localhost:3000                       ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo Press any key to STOP all servers and exit...
pause >nul

REM Kill all node processes
taskkill /F /IM node.exe >nul 2>&1
echo.
echo All servers stopped.
pause
