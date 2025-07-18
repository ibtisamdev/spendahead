# Database Setup Guide

This guide covers setting up the database infrastructure for SpendAhead, including PostgreSQL and Redis.

## Prerequisites

- Python 3.8+ with virtual environment
- PostgreSQL 13+ (local installation)
- Redis 6+ (local installation)

## Local Installation (Recommended for Development)

### PostgreSQL Setup

#### Using Homebrew (macOS)

```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database and user
createdb spendahead_dev
createuser -P spendahead_user
# Enter password when prompted (use: spendahead_password)

# Grant privileges
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON DATABASE spendahead_dev TO spendahead_user;"
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON SCHEMA public TO spendahead_user;"
```

#### Using PostgreSQL.app (macOS)

1. Download PostgreSQL.app from https://postgresapp.com/
2. Install and start the application
3. Open Terminal and run:

```bash
# Add PostgreSQL to your PATH
echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Create database and user
createdb spendahead_dev
createuser -P spendahead_user
# Enter password when prompted (use: spendahead_password)

# Grant privileges
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON DATABASE spendahead_dev TO spendahead_user;"
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON SCHEMA public TO spendahead_user;"
```

### Redis Setup

#### Using Homebrew (macOS)

```bash
# Install Redis
brew install redis

# Start Redis service
brew services start redis

# Test Redis connection
redis-cli ping
# Should return: PONG
```

#### Using Redis.app (macOS)

1. Download Redis.app from https://redis.io/download
2. Install and start the application
3. Redis will be available on localhost:6379

## Cloud Services (Production)

### PostgreSQL Cloud Options

- **Supabase**: Free tier available, PostgreSQL with real-time features
- **Neon**: Serverless PostgreSQL with branching
- **Railway**: Easy deployment with PostgreSQL
- **AWS RDS**: Enterprise-grade managed PostgreSQL

### Redis Cloud Options

- **Redis Cloud**: Managed Redis with free tier
- **Upstash**: Serverless Redis
- **AWS ElastiCache**: Managed Redis on AWS

## Environment Configuration

### 1. Copy Environment Template

```bash
cp env.example .env
```

### 2. Configure Database Settings

Edit `.env` file with your database credentials:

```bash
# Database Configuration
DATABASE_URL=postgresql+asyncpg://spendahead_user:spendahead_password@localhost:5432/spendahead_dev
DATABASE_URL_SYNC=postgresql://spendahead_user:spendahead_password@localhost:5432/spendahead_dev

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# For cloud services, use the provided connection strings
# Example for Supabase:
# DATABASE_URL=postgresql+asyncpg://postgres:[password]@[host]:5432/postgres
# REDIS_URL=redis://[username]:[password]@[host]:[port]/[database]
```

## Database Setup

### 1. Install Dependencies

```bash
# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 2. Run Database Setup Script

```bash
# Run the complete setup script
python scripts/setup_database.py
```

This script will:

- Run database migrations
- Create a sample user
- Seed default data (categories, accounts, sample budget)
- Test database and Redis connections
- Verify the setup

### 3. Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Run migrations
alembic upgrade head

# Create sample user
python -c "
from app.core.seeds import create_sample_user
from app.core.database import get_db
from app.models.user import User

db = next(get_db())
create_sample_user(db)
print('Sample user created successfully!')
"

# Seed default data
python -c "
from app.core.seeds import seed_default_data
from app.core.database import get_db

db = next(get_db())
seed_default_data(db)
print('Default data seeded successfully!')
"
```

## Verification

### Test Database Connection

```bash
# Test PostgreSQL connection
psql -h localhost -U spendahead_user -d spendahead_dev -c "SELECT version();"

# Test Redis connection
redis-cli ping
```

### Test Application Connection

```bash
# Start the application
uvicorn app.main:app --reload

# Check health endpoint
curl http://localhost:8000/api/v1/health/
```

## Troubleshooting

### Common Issues

#### PostgreSQL Connection Issues

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL if needed
brew services restart postgresql@15

# Check PostgreSQL logs
tail -f /usr/local/var/log/postgresql@15.log
```

#### Redis Connection Issues

```bash
# Check if Redis is running
brew services list | grep redis

# Restart Redis if needed
brew services restart redis

# Test Redis connection
redis-cli ping
```

#### Permission Issues

```bash
# If you get permission errors, check user privileges
psql -d spendahead_dev -c "\du"

# Grant necessary privileges
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO spendahead_user;"
psql -d spendahead_dev -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO spendahead_user;"
```

#### Migration Issues

```bash
# Reset migrations if needed
alembic downgrade base
alembic upgrade head

# Check migration status
alembic current
alembic history
```

### Performance Optimization

#### PostgreSQL Optimization

```bash
# Enable necessary extensions
psql -d spendahead_dev -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
psql -d spendahead_dev -c "CREATE EXTENSION IF NOT EXISTS btree_gin;"

# Analyze tables for better query planning
psql -d spendahead_dev -c "ANALYZE;"
```

#### Redis Optimization

```bash
# Configure Redis for better performance
# Edit /usr/local/etc/redis.conf
# Set maxmemory 256mb
# Set maxmemory-policy allkeys-lru
```

## Development Workflow

### Daily Development

```bash
# Start services
brew services start postgresql@15
brew services start redis

# Activate virtual environment
source venv/bin/activate

# Run migrations (if needed)
alembic upgrade head

# Start development server
uvicorn app.main:app --reload
```

### Testing

```bash
# Create test database
createdb spendahead_test

# Run tests
pytest

# Clean up test database
dropdb spendahead_test
```

### Database Reset

```bash
# Drop and recreate database
dropdb spendahead_dev
createdb spendahead_dev

# Run setup script
python scripts/setup_database.py
```

## Production Considerations

### Security

- Use strong passwords for database users
- Enable SSL connections
- Restrict database access to application servers
- Regular security updates

### Backup Strategy

```bash
# Create backup
pg_dump -h localhost -U spendahead_user -d spendahead_dev > backup.sql

# Restore backup
psql -h localhost -U spendahead_user -d spendahead_dev < backup.sql
```

### Monitoring

- Set up database monitoring
- Monitor Redis memory usage
- Track query performance
- Set up alerts for connection issues

## Next Steps

After completing the database setup:

1. **Authentication System**: Implement JWT-based authentication
2. **API Development**: Create RESTful endpoints for all entities
3. **Frontend Integration**: Connect Next.js frontend to backend APIs
4. **AI Integration**: Set up OpenAI integration for categorization
5. **Testing**: Implement comprehensive test suite

## Support

For additional help:

- Check the [FastAPI documentation](https://fastapi.tiangolo.com/)
- Review [SQLAlchemy documentation](https://docs.sqlalchemy.org/)
- Consult [Alembic documentation](https://alembic.sqlalchemy.org/)
- Check [Redis documentation](https://redis.io/documentation)

---

**Note**: This setup is optimized for development. For production deployment, consider using managed database services and proper security configurations.
