#!/bin/bash

# Pre-deployment checks for Project RED
echo "🩸 Project RED - Pre-deployment checks"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from the projectred directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test -- --coverage --watchAll=false

# Check for build errors
echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Ready to deploy to GitHub Pages"
    echo ""
    echo "To deploy:"
    echo "1. git add ."
    echo "2. git commit -m 'Deploy Project RED'"
    echo "3. git push origin main"
    echo ""
    echo "Your app will be available at:"
    echo "https://numaan7.github.io/PROJECTRED"
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi
