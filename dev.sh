#!/bin/bash

# Check for Java
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed or not in the PATH."
    exit 1
fi

# Check for Bun
if ! command -v bun &> /dev/null; then
    echo "Error: Bun is not installed or not in the PATH."
    exit 1
fi

echo "Starting Backend (Spring Boot)..."
cd backend || exit
./gradlew bootRun &
BACKEND_PID=$!

echo "Starting Frontend (Vite)..."
cd ../frontend || exit

echo "Installing frontend dependencies if needed..."
bun install

bun dev &
FRONTEND_PID=$!

cd ..

echo "Development servers started!"
echo "Press Ctrl+C to stop both."

# Catch Ctrl+C and kill both processes
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

# Wait indefinitely for background jobs
wait
