#!/bin/bash

# Backend-specific linting setup script

set -e

echo "🔧 Setting up backend linting..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if we're in the backend directory
if [ ! -f "pyproject.toml" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Install dev dependencies
print_status "Installing Python dev dependencies..."
pip install -e ".[dev]"

# Install pre-commit hooks (only if not using Husky)
print_status "Checking Git hooks configuration..."
if git config --get core.hooksPath > /dev/null 2>&1; then
    print_status "Git hooks are managed by Husky at root level. Pre-commit hooks will run through Husky."
    print_status "To run pre-commit manually: pre-commit run --all-files"
else
    print_status "Installing pre-commit hooks..."
    pre-commit install
    pre-commit install --hook-type commit-msg
fi

print_success "Backend linting setup complete! 🎉"

echo ""
echo "📋 Available commands:"
echo "  python -m black .          - Format code"
echo "  python -m isort .          - Sort imports"
echo "  python -m flake8 .         - Lint code"
echo "  python -m mypy .           - Type checking"
echo "  bandit -r .                - Security audit"
echo "  pre-commit run --all-files - Run all hooks manually"
echo ""
echo "🔧 Pre-commit hooks are now active and will run on every commit!"
