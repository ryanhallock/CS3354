@echo off

where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java is not installed or not in the PATH.
    pause
    exit /b 1
)

where bun >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Bun is not installed or not in the PATH.
    pause
    exit /b 1
)

echo Starting Backend (Spring Boot)...
cd backend
start cmd /k "gradlew.bat bootRun"
cd ..

echo Starting Frontend (Vite)...
cd frontend
echo Installing frontend dependencies if needed...
call bun install
start cmd /k "bun dev"
cd ..

echo Development servers launched in separate windows!
echo Close those windows to stop the servers.
