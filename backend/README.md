# SpendAhead Backend

AI-powered personal finance tracker backend built with FastAPI, PostgreSQL, and Redis.

## 🚀 Quick Start

### Prerequisites

- macOS with Homebrew
- Python 3.8+
- Git

### Setup (5 minutes)

```bash
# 1. Activate virtual environment
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run automated setup
./scripts/setup_local.sh
python scripts/setup_database.py

# 4. Start development server
uvicorn app.main:app --reload
```

### What You'll Get

- ✅ PostgreSQL database with all tables
- ✅ Redis cache server
- ✅ Sample user: `demo@spendahead.com` / `demo123`
- ✅ 19 default categories
- ✅ 4 default accounts
- ✅ Sample monthly budget
- ✅ Working API endpoints

## 📚 Documentation

All documentation has been organized in the `docs/` folder:

- **[📖 Complete Documentation](../docs/README.md)** - Main documentation index
- **[🚀 Quick Start Guide](../docs/QUICK_START.md)** - Get up and running in 10 minutes
- **[🗄️ Database Setup Guide](../docs/DATABASE_SETUP.md)** - Comprehensive database setup
- **[📊 Database Implementation Summary](../docs/DATABASE_IMPLEMENTATION_SUMMARY.md)** - Technical overview
- **[📋 Product Requirements Document](../docs/PRD.md)** - Complete project specifications
- **[🎯 Development Roadmap](../ROADMAP.md)** - Development phases and milestones

## 🔧 Development

### Daily Workflow

```bash
# Start services
brew services start postgresql@15
brew services start redis

# Activate environment and start server
source venv/bin/activate
uvicorn app.main:app --reload
```

### API Endpoints

- **Health Check**: http://localhost:8000/api/v1/health/
- **API Documentation**: http://localhost:8000/docs
- **Root**: http://localhost:8000/

### Database Management

```bash
# Run migrations
alembic upgrade head

# Reset database
dropdb spendahead_dev && createdb spendahead_dev
python scripts/setup_database.py

# Run tests
pytest tests/
```

## 🗄️ Database Schema

### Core Tables

- **users** - User accounts and authentication
- **categories** - Transaction categories with hierarchy
- **accounts** - Financial accounts (bank, credit card, cash, etc.)
- **transactions** - Financial transactions with AI categorization
- **budgets** - Budget management with periods
- **budget_items** - Individual budget category allocations

### AI & Analytics Tables

- **ai_insights** - AI-generated financial insights
- **audit_logs** - Complete audit trail for compliance

## 🛠️ Technology Stack

- **Framework**: FastAPI with async support
- **Database**: PostgreSQL 15 with asyncpg driver
- **Cache**: Redis 7 with async support
- **ORM**: SQLAlchemy 2.0 with async support
- **Migrations**: Alembic
- **Testing**: Pytest with async support
- **Code Quality**: Black, isort, flake8, pre-commit

## 🎯 Features

### Implemented ✅

- Complete database schema with migrations
- User management system
- Category hierarchy with AI support
- Account management (bank, credit card, cash, investment)
- Transaction system with AI categorization
- Budget management with periods
- Audit logging system
- Health check endpoints
- Local development setup

### In Progress 🚧

- JWT authentication system
- CRUD API endpoints
- AI integration (OpenAI)
- Frontend integration

### Planned 📋

- Advanced analytics
- Real-time features
- Mobile optimization
- Production deployment

## 🚨 Troubleshooting

### Common Issues

```bash
# PostgreSQL not running
brew services restart postgresql@15

# Redis not running
brew services restart redis

# Migration issues
alembic downgrade base && alembic upgrade head
```

### Getting Help

1. Check the [documentation](../docs/README.md)
2. Review application logs
3. Test health endpoints
4. Verify all services are running

## 📊 Project Status

### Phase 1: Foundation ✅

- [x] Project structure setup
- [x] Database design and setup
- [ ] Authentication system
- [ ] Basic API endpoints

### Next Steps

1. **Authentication**: JWT implementation
2. **API Development**: CRUD endpoints for all entities
3. **Frontend Integration**: React frontend setup
4. **AI Integration**: OpenAI API integration

## 🤝 Contributing

1. Follow the [conventional commit format](https://www.conventionalcommits.org/)
2. Run tests before submitting: `pytest tests/`
3. Ensure code quality: `pre-commit run --all-files`
4. Update documentation as needed

## 📄 License

This project is part of the SpendAhead AI-powered personal finance tracker.

---

**Status**: Development Phase 1 - Foundation  
**Last Updated**: December 2024  
**Version**: 1.0.0
