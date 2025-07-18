# 📚 SpendAhead Documentation

Welcome to the SpendAhead documentation! This guide will help you understand, set up, and develop the AI-powered personal finance tracker.

## 🚀 Quick Navigation

### Getting Started

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 10 minutes
- **[Database Setup Guide](DATABASE_SETUP.md)** - Comprehensive database setup instructions

### Project Documentation

- **[Product Requirements Document (PRD)](PRD.md)** - Complete project specifications and requirements
- **[Database Implementation Summary](DATABASE_IMPLEMENTATION_SUMMARY.md)** - Technical overview of database implementation
- **[ER Diagram Guide](ER_DIAGRAM_GUIDE.md)** - Generate and understand database relationships
- **[Linting Setup Guide](LINTING_SETUP.md)** - Code quality and formatting setup

### Development Roadmap

- **[Project Roadmap](../ROADMAP.md)** - Complete development phases and milestones

## 🎯 Project Overview

SpendAhead is a comprehensive financial management application that combines traditional expense tracking with cutting-edge AI capabilities.

### Key Features

- **AI-Powered Categorization**: Automatic transaction categorization using OpenAI
- **Smart Budgeting**: Intelligent budget suggestions and optimization
- **Financial Insights**: AI-generated spending analysis and recommendations
- **Multi-Account Support**: Bank accounts, credit cards, cash, and investments
- **Real-time Analytics**: Live spending tracking and forecasting

### Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + PostgreSQL + Redis
- **AI**: OpenAI GPT-4 integration
- **Infrastructure**: Local development with Docker support

## 📋 Setup Instructions

### Prerequisites

- macOS with Homebrew
- Python 3.8+
- Git

### Quick Setup (Recommended)

```bash
# 1. Clone the repository
git clone <repository-url>
cd spendahead/backend

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run automated setup
./scripts/setup_local.sh
python scripts/setup_database.py

# 5. Start development server
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

## 🔧 Development Workflow

### Daily Development

```bash
# Start services
brew services start postgresql@15
brew services start redis

# Activate environment and start server
source venv/bin/activate
uvicorn app.main:app --reload
```

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

### Code Quality

```bash
# Run linting
flake8 app/
black app/
isort app/

# Run pre-commit hooks
pre-commit run --all-files
```

## 📊 API Endpoints

### Health & Status

- `GET /api/v1/health/` - Basic health check
- `GET /api/v1/health/detailed` - Detailed health with database status
- `GET /api/v1/health/ready` - Readiness check for deployment
- `GET /api/v1/health/live` - Liveness check for deployment

### Documentation

- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation
- `GET /openapi.json` - OpenAPI specification

### Root Endpoints

- `GET /` - Application information
- `GET /api` - API version and endpoint information

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

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart if needed
brew services restart postgresql@15
```

#### Redis Connection Issues

```bash
# Check if Redis is running
brew services list | grep redis

# Restart if needed
brew services restart redis
```

#### Migration Issues

```bash
# Reset migrations
alembic downgrade base
alembic upgrade head
```

### Getting Help

1. Check the troubleshooting sections in the setup guides
2. Review the application logs
3. Verify all services are running
4. Check the API health endpoints

## 🎯 Development Phases

### Phase 1: Foundation ✅

- [x] Project structure setup
- [x] Database design and setup
- [ ] Authentication system
- [ ] Basic API endpoints

### Phase 2: Core Features

- [ ] Transaction management
- [ ] Category system
- [ ] Budget management
- [ ] Data import/export

### Phase 3: AI Integration

- [ ] OpenAI integration
- [ ] Smart categorization
- [ ] Natural language Q&A
- [ ] AI insights

### Phase 4: Advanced Features

- [ ] Advanced analytics
- [ ] Cash flow forecasting
- [ ] Smart budgeting
- [ ] Performance optimization

### Phase 5: Polish & Launch

- [ ] Comprehensive testing
- [ ] UX polish
- [ ] Production deployment
- [ ] Launch preparation

## 📞 Support & Resources

### Documentation Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [Redis Documentation](https://redis.io/documentation)

### Development Tools

- **API Testing**: Use the interactive docs at http://localhost:8000/docs
- **Database Management**: Connect with `psql -h localhost -U spendahead_user -d spendahead_dev`
- **Redis Management**: Use `redis-cli` for Redis operations

## 🎉 Success Metrics

### Development Goals

- **Code Coverage**: 80%+ test coverage
- **Performance**: <2s API response times
- **Security**: Zero critical vulnerabilities
- **User Experience**: Intuitive and responsive interface

### User Goals

- **User Registration**: 1,000+ users in 6 months
- **User Retention**: 80% monthly active users
- **Feature Adoption**: 70% AI feature usage
- **User Satisfaction**: 90%+ satisfaction score

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Development Phase 1 - Foundation
