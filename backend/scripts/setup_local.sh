#!/bin/bash

# SpendAhead Local Database Setup Script
# This script sets up PostgreSQL and Redis locally on macOS

set -e  # Exit on any error

echo "🚀 Setting up SpendAhead database locally..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Homebrew is installed
check_homebrew() {
    if ! command -v brew &> /dev/null; then
        print_error "Homebrew is not installed. Please install it first:"
        echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    print_success "Homebrew is installed"
}

# Install and configure PostgreSQL
setup_postgresql() {
    print_status "Setting up PostgreSQL..."
    
    # Check if PostgreSQL is already installed
    if brew list postgresql@15 &> /dev/null; then
        print_warning "PostgreSQL 15 is already installed"
    else
        print_status "Installing PostgreSQL 15..."
        brew install postgresql@15
    fi
    
    # Start PostgreSQL service
    print_status "Starting PostgreSQL service..."
    brew services start postgresql@15
    
    # Wait for PostgreSQL to be ready
    print_status "Waiting for PostgreSQL to be ready..."
    sleep 5
    
    # Check if database already exists
    if psql -lqt | cut -d \| -f 1 | grep -qw spendahead_dev; then
        print_warning "Database 'spendahead_dev' already exists"
    else
        print_status "Creating database 'spendahead_dev'..."
        createdb spendahead_dev
    fi
    
    # Check if user already exists
    if psql -t -c "SELECT 1 FROM pg_roles WHERE rolname='spendahead_user'" | grep -q 1; then
        print_warning "User 'spendahead_user' already exists"
    else
        print_status "Creating user 'spendahead_user'..."
        createuser -P spendahead_user <<< "spendahead_password"
    fi
    
    # Grant privileges
    print_status "Granting database privileges..."
    psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON DATABASE spendahead_dev TO spendahead_user;" 2>/dev/null || true
    psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON SCHEMA public TO spendahead_user;" 2>/dev/null || true
    
    # Enable necessary extensions
    print_status "Enabling PostgreSQL extensions..."
    psql -d spendahead_dev -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" 2>/dev/null || true
    psql -d spendahead_dev -c "CREATE EXTENSION IF NOT EXISTS \"pg_trgm\";" 2>/dev/null || true
    psql -d spendahead_dev -c "CREATE EXTENSION IF NOT EXISTS \"btree_gin\";" 2>/dev/null || true
    
    print_success "PostgreSQL setup completed"
}

# Install and configure Redis
setup_redis() {
    print_status "Setting up Redis..."
    
    # Check if Redis is already installed
    if brew list redis &> /dev/null; then
        print_warning "Redis is already installed"
    else
        print_status "Installing Redis..."
        brew install redis
    fi
    
    # Start Redis service
    print_status "Starting Redis service..."
    brew services start redis
    
    # Wait for Redis to be ready
    print_status "Waiting for Redis to be ready..."
    sleep 3
    
    # Test Redis connection
    if redis-cli ping | grep -q "PONG"; then
        print_success "Redis is running and responding"
    else
        print_error "Redis is not responding"
        exit 1
    fi
    
    print_success "Redis setup completed"
}

# Create environment file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ -f ".env" ]; then
        print_warning "Environment file already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Skipping environment file creation"
            return
        fi
    fi
    
    # Copy example environment file
    if [ -f "env.example" ]; then
        cp env.example .env
        print_success "Environment file created from template"
    else
        print_error "env.example file not found"
        exit 1
    fi
    
    # Update database URLs in .env file
    print_status "Updating database configuration..."
    sed -i.bak 's|DATABASE_URL=.*|DATABASE_URL=postgresql+asyncpg://spendahead_user:spendahead_password@localhost:5432/spendahead_dev|' .env
    sed -i.bak 's|DATABASE_URL_SYNC=.*|DATABASE_URL_SYNC=postgresql://spendahead_user:spendahead_password@localhost:5432/spendahead_dev|' .env
    sed -i.bak 's|REDIS_URL=.*|REDIS_URL=redis://localhost:6379/0|' .env
    
    # Remove backup file
    rm -f .env.bak
    
    print_success "Environment configuration updated"
}

# Test connections
test_connections() {
    print_status "Testing database connections..."
    
    # Test PostgreSQL connection
    if psql -h localhost -U spendahead_user -d spendahead_dev -c "SELECT version();" &> /dev/null; then
        print_success "PostgreSQL connection successful"
    else
        print_error "PostgreSQL connection failed"
        exit 1
    fi
    
    # Test Redis connection
    if redis-cli ping | grep -q "PONG"; then
        print_success "Redis connection successful"
    else
        print_error "Redis connection failed"
        exit 1
    fi
}

# Main execution
main() {
    echo "=========================================="
    echo "  SpendAhead Local Database Setup"
    echo "=========================================="
    echo
    
    # Check prerequisites
    check_homebrew
    
    # Setup services
    setup_postgresql
    setup_redis
    
    # Setup environment
    setup_environment
    
    # Test connections
    test_connections
    
    echo
    echo "=========================================="
    print_success "Local database setup completed!"
    echo "=========================================="
    echo
    echo "Next steps:"
    echo "1. Activate your virtual environment:"
    echo "   source venv/bin/activate"
    echo
    echo "2. Install Python dependencies:"
    echo "   pip install -r requirements.txt"
    echo
    echo "3. Run database migrations:"
    echo "   python scripts/setup_database.py"
    echo
    echo "4. Start the development server:"
    echo "   uvicorn app.main:app --reload"
    echo
    echo "Database credentials:"
    echo "  Host: localhost"
    echo "  Port: 5432"
    echo "  Database: spendahead_dev"
    echo "  Username: spendahead_user"
    echo "  Password: spendahead_password"
    echo
    echo "Redis:"
    echo "  Host: localhost"
    echo "  Port: 6379"
    echo
}

# Run main function
main "$@" 