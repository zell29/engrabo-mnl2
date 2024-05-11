#!/bin/bash

# Start backend and frontend simultaneously
echo "Starting backend and frontend..."

# Start backend server
echo "Starting backend server..."
npm run start &

# Start frontend server
echo "Starting frontend server..."
cd frontend
npm run start & 

echo "starting the socket"
cd /socket
npm run start &
