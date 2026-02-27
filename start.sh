#!/bin/bash
# Start both backend and frontend

cd "$(dirname "$0")"

echo "📦 Installing backend dependencies..."
(cd backend && npm install)

echo "📦 Installing frontend dependencies..."
(cd frontend && npm install)

# Start backend in background
(cd backend && npm run start:dev) &
BACKEND_PID=$!

# Start frontend in background
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo "🚀 Backend: http://localhost:3001"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

wait
