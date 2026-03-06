#!/bin/bash
set -e

echo "==> Building LMS Backend..."

# Navigate to backend directory
cd backend

# Install dependencies
echo "==> Installing dependencies..."
npm install

# Build TypeScript
echo "==> Compiling TypeScript..."
npx tsc

# Verify build output
if [ -f "dist/server.js" ]; then
    echo "✅ Build successful! dist/server.js created"
else
    echo "❌ Build failed! dist/server.js not found"
    exit 1
fi

echo "==> Build complete!"
