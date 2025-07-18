# 🚀 SpendAhead - AI-Powered Personal Finance Tracker

A comprehensive financial management application that combines traditional expense tracking with cutting-edge AI capabilities.

## 🎯 Project Overview

SpendAhead helps users track expenses, manage budgets, and gain AI-powered insights into their financial habits. The application uses OpenAI's GPT-4 to automatically categorize transactions and provide personalized financial recommendations.

### Key Features

- **🤖 AI-Powered Categorization**: Automatic transaction categorization using OpenAI
- **💰 Smart Budgeting**: Intelligent budget suggestions and optimization
- **📊 Financial Insights**: AI-generated spending analysis and recommendations
- **🏦 Multi-Account Support**: Bank accounts, credit cards, cash, and investments
- **📈 Real-time Analytics**: Live spending tracking and forecasting

## 🛠️ Technology Stack

### Backend

- **FastAPI** - Modern, fast web framework for building APIs
- **PostgreSQL 15** - Robust relational database with async support
- **Redis 7** - High-performance caching and session storage
- **SQLAlchemy 2.0** - Async ORM with type safety
- **Alembic** - Database migrations
- **OpenAI GPT-4** - AI-powered categorization and insights

### Frontend (Planned)

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful component library

### Infrastructure

- **Docker** - Containerization (optional)
- **Homebrew** - Package management (macOS)
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites

- macOS with Homebrew
- Python 3.8+
- Git

### Backend Setup (5 minutes)

```bash
# 1. Clone the repository
git clone <repository-url>
cd spendahead/backend

# 2. Activate virtual environment
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

## 📚 Documentation

All documentation is organized in the `docs/` folder:

- **[📖 Complete Documentation](docs/README.md)** - Main documentation index
- **[🚀 Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 10 minutes
- **[🗄️ Database Setup Guide](docs/DATABASE_SETUP.md)** - Comprehensive database setup
- **[📊 Database Implementation Summary](docs/DATABASE_IMPLEMENTATION_SUMMARY.md)** - Technical overview
- **[📋 Product Requirements Document](docs/PRD.md)** - Complete project specifications
- **[🎯 Development Roadmap](ROADMAP.md)** - Development phases and milestones

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

## 📊 Project Status

### Phase 1: Foundation ✅

- [x] Project structure setup
- [x] Database design and setup
- [ ] Authentication system
- [ ] Basic API endpoints

### Phase 2: Core Features (Next)

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

## 🎯 Success Metrics

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

1. Check the [documentation](docs/README.md)
2. Review application logs
3. Test health endpoints
4. Verify all services are running

## 🤝 Contributing

1. Follow the [conventional commit format](https://www.conventionalcommits.org/)
2. Run tests before submitting: `pytest tests/`
3. Ensure code quality: `pre-commit run --all-files`
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the [documentation](docs/README.md)
- Create an issue in the repository
- Review the API documentation at `/docs`

---

**Status**: Development Phase 1 - Foundation  
**Last Updated**: December 2024  
**Version**: 1.0.0
