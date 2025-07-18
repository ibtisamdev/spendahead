#!/bin/bash

# SpendAhead Backend Setup Script
# This script sets up the development environment for the backend

set -e

echo "🚀 Setting up SpendAhead Backend..."

# Check if Python 3.11+ is installed
python_version=$(python3 --version 2>&1 | awk '{print $2}' | cut -d. -f1,2)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Error: Python 3.11 or higher is required. Found: $python_version"
    exit 1
fi

echo "✅ Python version check passed: $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Install development dependencies
echo "🔧 Installing development dependencies..."
pip install -e ".[dev]"

echo "🗄️  Database tables will be created automatically when the server starts"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please update .env file with your configuration values"
fi

# Install pre-commit hooks
echo "🔒 Installing pre-commit hooks..."
pre-commit install

echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database and API credentials"
echo "2. Start the development server: python -m uvicorn app.main:app --reload"
echo "3. Access the API documentation at: http://localhost:8000/docs"
echo ""
echo "Happy coding! 🎉" 