# 🚀 Quick Start Guide - Local Setup

This guide will get you up and running with SpendAhead locally in under 10 minutes, without Docker.

## Prerequisites

- macOS with Homebrew installed
- Python 3.8+
- Git

## Step 1: Clone and Setup Project

```bash
# Navigate to your project directory
cd /Users/ibtisam/Documents/spendahead/backend

# Activate virtual environment (if not already activated)
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

## Step 2: Setup Database (Automated)

Run the automated setup script:

```bash
# Make script executable (if needed)
chmod +x scripts/setup_local.sh

# Run the setup script
./scripts/setup_local.sh
```

This script will:

- ✅ Install PostgreSQL 15 via Homebrew
- ✅ Install Redis via Homebrew
- ✅ Create database and user
- ✅ Configure environment variables
- ✅ Test all connections

## Step 3: Run Database Migrations

```bash
# Run the database setup script
python scripts/setup_database.py
```

This will:

- ✅ Create all database tables
- ✅ Seed default categories and accounts
- ✅ Create a sample user (demo@spendahead.com / demo123)
- ✅ Create a sample budget

## Step 4: Start Development Server

```bash
# Start the FastAPI development server
uvicorn app.main:app --reload
```

## Step 5: Verify Setup

Open your browser and visit:

- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/v1/health/

## 🎯 What You'll Have

After completing these steps, you'll have:

### Database

- **PostgreSQL**: Running on localhost:5432
- **Database**: `spendahead_dev`
- **User**: `spendahead_user` / `spendahead_password`
- **Redis**: Running on localhost:6379

### Sample Data

- **User**: demo@spendahead.com / demo123
- **Categories**: 15+ default categories (Food, Transport, etc.)
- **Accounts**: Cash, Checking, Savings, Credit Card
- **Budget**: Sample monthly budget with allocations

### API Endpoints

- **Health Check**: `/api/v1/health/`
- **API Documentation**: `/docs`
- **Database Models**: Users, Categories, Accounts, Transactions, Budgets

## 🔧 Manual Setup (Alternative)

If you prefer manual setup or the automated script fails:

### Install PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql@15

# Start service
brew services start postgresql@15

# Create database and user
createdb spendahead_dev
createuser -P spendahead_user
# Enter password: spendahead_password

# Grant privileges
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON DATABASE spendahead_dev TO spendahead_user;"
```

### Install Redis

```bash
# Install Redis
brew install redis

# Start service
brew services start redis

# Test connection
redis-cli ping
# Should return: PONG
```

### Configure Environment

```bash
# Copy environment template
cp env.example .env

# Update database URLs (edit .env file)
DATABASE_URL=postgresql+asyncpg://spendahead_user:spendahead_password@localhost:5432/spendahead_dev
REDIS_URL=redis://localhost:6379/0
```

## 🚨 Troubleshooting

### PostgreSQL Issues

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart if needed
brew services restart postgresql@15

# Check logs
tail -f /usr/local/var/log/postgresql@15.log
```

### Redis Issues

```bash
# Check if Redis is running
brew services list | grep redis

# Restart if needed
brew services restart redis

# Test connection
redis-cli ping
```

### Permission Issues

```bash
# If you get permission errors
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON SCHEMA public TO spendahead_user;"
```

### Migration Issues

```bash
# Reset migrations if needed
alembic downgrade base
alembic upgrade head
```

## 📱 Daily Development Workflow

```bash
# Start services (if not running)
brew services start postgresql@15
brew services start redis

# Activate virtual environment
source venv/bin/activate

# Start development server
uvicorn app.main:app --reload
```

## 🧪 Testing

```bash
# Create test database
createdb spendahead_test

# Run tests
pytest

# Clean up
dropdb spendahead_test
```

## 📊 Database Management

### Connect to Database

```bash
# Connect with psql
psql -h localhost -U spendahead_user -d spendahead_dev

# List tables
\dt

# View data
SELECT * FROM users;
SELECT * FROM categories;
```

### Reset Database

```bash
# Drop and recreate
dropdb spendahead_dev
createdb spendahead_dev

# Run setup again
python scripts/setup_database.py
```

## 🎯 Next Steps

After successful setup:

1. **Authentication**: Implement JWT authentication
2. **API Development**: Create transaction endpoints
3. **Frontend**: Set up React frontend
4. **AI Integration**: Add OpenAI categorization
5. **Testing**: Write comprehensive tests

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the full [Database Setup Guide](DATABASE_SETUP.md)
3. Check application logs
4. Verify all services are running

---

**Happy coding! 🚀**
