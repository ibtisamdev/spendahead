# SpendAhead Backend

AI-powered personal finance tracker backend built with FastAPI, PostgreSQL, and OpenAI integration.

## 🚀 Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **PostgreSQL Database**: Robust relational database with async support
- **JWT Authentication**: Secure token-based authentication
- **AI Integration**: OpenAI-powered transaction categorization and insights
- **Rate Limiting**: API rate limiting for security
- **Structured Logging**: Comprehensive logging with structlog
- **Database Migrations**: Alembic for database schema management
- **Code Quality**: Pre-commit hooks with black, isort, flake8, and mypy
- **Testing**: Pytest with async support and coverage reporting
- **Health Checks**: Application health monitoring endpoints

## 📋 Prerequisites

- Python 3.11 or higher
- PostgreSQL 12 or higher
- Redis (optional, for caching)
- OpenAI API key (for AI features)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spendahead/backend
```

### 2. Run Setup Script

```bash
./scripts/setup.sh
```

This script will:

- Check Python version
- Create virtual environment
- Install dependencies
- Initialize Alembic
- Install pre-commit hooks
- Create `.env` file from template

### 3. Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install -e ".[dev]"

# Initialize Alembic
alembic init alembic

# Install pre-commit hooks
pre-commit install

# Copy environment template
cp env.example .env
```

## ⚙️ Configuration

### Environment Variables

Copy `env.example` to `.env` and update the values:

```bash
# Application Settings
APP_NAME=SpendAhead Backend
APP_VERSION=0.1.0
DEBUG=true
ENVIRONMENT=development

# Server Settings
HOST=0.0.0.0
PORT=8000
RELOAD=true

# Database Settings
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/spendahead
DATABASE_URL_SYNC=postgresql://user:password@localhost:5432/spendahead

# Security Settings
SECRET_KEY=your-secret-key-here-change-in-production

# AI Integration
OPENAI_API_KEY=your-openai-api-key-here
```

### Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE spendahead;
```

2. Run migrations:

```bash
alembic upgrade head
```

## 🚀 Running the Application

### Development Server

```bash
# Activate virtual environment
source venv/bin/activate

# Start development server
python -m uvicorn app.main:app --reload
```

### Production Server

```bash
# Using uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Using gunicorn (recommended for production)
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 📚 API Documentation

Once the server is running, access the API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🧪 Testing

### Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v
```

### Test Categories

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test API endpoints and database operations
- **Slow Tests**: Tests that take longer to run (database operations)

```bash
# Run only unit tests
pytest -m "not integration and not slow"

# Run only integration tests
pytest -m integration

# Run slow tests
pytest -m slow
```

## 🔧 Development Tools

### Code Quality

```bash
# Format code
black .

# Sort imports
isort .

# Lint code
flake8 .

# Type checking
mypy .

# Security audit
bandit -r .
```

### Pre-commit Hooks

Pre-commit hooks are automatically installed and will run on every commit:

```bash
# Run pre-commit hooks manually
pre-commit run --all-files

# Skip pre-commit hooks (not recommended)
git commit --no-verify
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Show migration history
alembic history
```

## 📁 Project Structure

```
backend/
├── alembic/                 # Database migrations
├── app/
│   ├── api/                # API routes
│   │   └── v1/            # Version 1 API endpoints
│   ├── core/              # Core application components
│   │   ├── config.py      # Configuration management
│   │   ├── database.py    # Database setup
│   │   ├── security.py    # Security utilities
│   │   └── logging.py     # Logging configuration
│   ├── models/            # Database models
│   └── main.py           # FastAPI application
├── scripts/               # Utility scripts
├── tests/                 # Test files
├── requirements.txt       # Python dependencies
├── pyproject.toml        # Project configuration
├── alembic.ini          # Alembic configuration
├── .pre-commit-config.yaml # Pre-commit hooks
└── env.example           # Environment variables template
```

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy

## 📊 Monitoring

### Health Checks

- `/health` - Basic health check
- `/health/detailed` - Detailed health with service status
- `/health/ready` - Kubernetes readiness probe
- `/health/live` - Kubernetes liveness probe

### Logging

Structured logging with different levels:

- `DEBUG` - Detailed debugging information
- `INFO` - General information
- `WARNING` - Warning messages
- `ERROR` - Error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pytest`
5. Format code: `black . && isort .`
6. Commit your changes: `git commit -m 'feat: add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the logs for error details

## 🔄 Changelog

See [CHANGELOG.md](../CHANGELOG.md) for a list of changes and version history.
