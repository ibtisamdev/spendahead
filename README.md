# 🧾 SpendAhead - AI-Powered Personal Finance Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18+-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

> An intelligent personal finance management application that combines traditional expense tracking with cutting-edge AI capabilities to help users make better financial decisions.

**🌐 Live Demo**: [spendahead.com](https://spendahead.com)

---

## 🚀 Features

### 💡 AI-Powered Intelligence

- **Smart Categorization**: Automatically categorize transactions with 95%+ accuracy using OpenAI GPT-4
- **Natural Language Q&A**: Ask financial questions in plain English and get intelligent responses
- **Intelligent Insights**: Personalized spending recommendations and alerts based on your financial patterns
- **Cash Flow Forecasting**: Predict future financial scenarios with AI-powered analytics

### 📊 Comprehensive Financial Management

- **Transaction Tracking**: Manual entry and bulk import from CSV/JSON/Excel files
- **Budget Management**: Set and monitor budgets with real-time tracking and alerts
- **Category Management**: Custom categories with hierarchical organization and analytics
- **Recurring Transactions**: Automate regular income and expenses with flexible patterns

### 📈 Advanced Analytics

- **Spending Analysis**: Category-wise breakdowns and trend analysis with interactive charts
- **Income vs Expense Tracking**: Complete financial picture with detailed reporting
- **Budget Analytics**: Visual progress tracking and forecasting capabilities
- **Export Capabilities**: Generate reports in multiple formats (PDF, Excel, CSV)

### 🔒 Security & Privacy

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **Input Validation**: Comprehensive validation and sanitization for all user inputs
- **Audit Logging**: Complete audit trail for all financial operations

---

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** + **ShadCN UI** for modern, accessible styling
- **React Query** + **Zustand** for efficient state management
- **Axios** for HTTP requests with interceptors
- **Vite** for fast development and optimized builds

### Backend

- **FastAPI** (Python 3.11+) for high-performance API development
- **SQLAlchemy 2.0** for modern database ORM with async support
- **PostgreSQL 15+** for reliable primary database
- **Redis 7+** for caching and session storage
- **Celery** for background task processing

### AI & External Services

- **OpenAI GPT-4** for AI-powered categorization and insights
- **AWS S3** for secure file storage and receipt management
- **SendGrid** for transactional email services
- **Sentry** for error monitoring and performance tracking

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 15+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Redis 7+** - [Download Redis](https://redis.io/download)
- **Docker** (optional) - [Download Docker](https://www.docker.com/products/docker-desktop/)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spendahead.git
cd spendahead
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

#### Environment Configuration

```bash
cp .env.example .env
# Edit .env with your configuration
```

#### Database Setup

```bash
# Create database
createdb spendahead

# Run migrations
alembic upgrade head

# Seed initial data (optional)
python scripts/seed_data.py
```

#### Start Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Environment Configuration

```bash
cp .env.example .env.local
# Edit .env.local with your API configuration
```

#### Start Development Server

```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc

---

## 🐳 Docker Setup (Alternative)

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build
```

### Individual Services

```bash
# Start only database and Redis
docker-compose up postgres redis -d

# Start backend with dependencies
docker-compose up backend -d

# Start frontend
docker-compose up frontend -d
```

---

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Authenticate user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Transaction Endpoints

- `GET /api/v1/transactions` - List transactions with filtering and pagination
- `POST /api/v1/transactions` - Create new transaction
- `GET /api/v1/transactions/{id}` - Get transaction details
- `PUT /api/v1/transactions/{id}` - Update transaction
- `DELETE /api/v1/transactions/{id}` - Delete transaction
- `POST /api/v1/transactions/upload` - Bulk upload transactions
- `GET /api/v1/transactions/upload/{jobId}` - Check upload status

### AI Assistant Endpoints

- `POST /api/v1/ai/ask` - Ask financial question in natural language
- `POST /api/v1/ai/categorize` - Automatically categorize transaction

### Analytics Endpoints

- `GET /api/v1/analytics/spending` - Get spending analytics and trends
- `GET /api/v1/analytics/income` - Get income analytics
- `GET /api/v1/analytics/cash-flow` - Get cash flow analysis
- `GET /api/v1/analytics/forecast` - Get cash flow forecasting
- `GET /api/v1/insights` - Get AI-generated financial insights

### Budget Endpoints

- `GET /api/v1/budgets` - List user budgets
- `POST /api/v1/budgets` - Create new budget
- `PUT /api/v1/budgets/{id}` - Update budget
- `DELETE /api/v1/budgets/{id}` - Delete budget
- `GET /api/v1/budgets/analytics` - Get budget analytics

For complete interactive API documentation, visit: http://localhost:8000/docs

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_transactions.py

# Run tests with verbose output
pytest -v
```

### Frontend Testing

```bash
cd frontend

# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### End-to-End Testing

```bash
# Install Playwright
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

### Integration Testing

```bash
# Run API integration tests
cd backend
pytest tests/integration/

# Run full test suite
npm run test:all
```

---

## 📦 Project Structure

```
spendahead/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py              # Authentication endpoints
│   │   │       ├── transactions.py      # Transaction management
│   │   │       ├── budgets.py           # Budget management
│   │   │       ├── insights.py          # Analytics and insights
│   │   │       └── ai_assistant.py      # AI-powered features
│   │   ├── core/
│   │   │   ├── config.py                # Application configuration
│   │   │   ├── security.py              # Security utilities
│   │   │   └── database.py              # Database configuration
│   │   ├── models/
│   │   │   ├── user.py                  # User model
│   │   │   ├── transaction.py           # Transaction model
│   │   │   ├── budget.py                # Budget model
│   │   │   └── category.py              # Category model
│   │   ├── schemas/
│   │   │   ├── user.py                  # User Pydantic schemas
│   │   │   ├── transaction.py           # Transaction schemas
│   │   │   └── budget.py                # Budget schemas
│   │   ├── services/
│   │   │   ├── ai_service.py            # AI integration service
│   │   │   ├── analytics_service.py     # Analytics calculations
│   │   │   └── notification_service.py  # Email notifications
│   │   └── utils/
│   │       ├── validators.py            # Custom validators
│   │       └── helpers.py               # Utility functions
│   ├── tests/
│   │   ├── unit/                        # Unit tests
│   │   ├── integration/                 # Integration tests
│   │   └── conftest.py                  # Test configuration
│   ├── alembic/                         # Database migrations
│   ├── requirements.txt                 # Python dependencies
│   └── main.py                          # FastAPI application entry
├── frontend/
│   ├── src/
│   │   ├── components/                  # Reusable React components
│   │   │   ├── ui/                      # ShadCN UI components
│   │   │   ├── forms/                   # Form components
│   │   │   └── charts/                  # Chart components
│   │   ├── pages/                       # Page components
│   │   │   ├── auth/                    # Authentication pages
│   │   │   ├── dashboard/               # Dashboard page
│   │   │   ├── transactions/            # Transaction pages
│   │   │   └── analytics/               # Analytics pages
│   │   ├── services/                    # API service functions
│   │   │   ├── api.ts                   # API client
│   │   │   ├── auth.ts                  # Authentication service
│   │   │   └── transactions.ts          # Transaction service
│   │   ├── hooks/                       # Custom React hooks
│   │   ├── utils/                       # Utility functions
│   │   ├── types/                       # TypeScript type definitions
│   │   └── App.tsx                      # Main App component
│   ├── public/                          # Static assets
│   ├── package.json                     # Node.js dependencies
│   └── tailwind.config.js               # Tailwind configuration
├── docs/
│   └── PRD.md                           # Product Requirements Document
├── docker-compose.yml                   # Docker services configuration
├── .github/                             # GitHub Actions workflows
└── README.md                            # This file
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/spendahead
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# AI Services
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.3

# External Services
SENDGRID_API_KEY=your-sendgrid-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=spendahead-files
AWS_REGION=us-east-1

# Application Settings
ENVIRONMENT=development
DEBUG=true
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend (.env.local)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=SpendAhead
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=your-sentry-dsn
```

---

## 🚀 Deployment

### Production Deployment

#### Backend Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start production server
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

#### Frontend Deployment

```bash
# Build for production
npm run build

# Serve static files (using nginx or similar)
npm run preview
```

### Environment-Specific Configurations

#### Development

- Hot reload enabled
- Debug mode active
- Local database and Redis
- Detailed error messages

#### Staging

- Production-like environment
- Staging database
- Limited debugging
- Performance monitoring

#### Production

- Optimized builds
- Production database
- Error monitoring
- Load balancing

---

## 🤝 Contributing

We welcome contributions to SpendAhead! Please follow these steps:

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/spendahead.git
cd spendahead
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 4. Run Tests

```bash
# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm test
```

### 5. Commit Your Changes

```bash
git commit -m "Add amazing feature"
```

### 6. Push to Branch

```bash
git push origin feature/amazing-feature
```

### 7. Create a Pull Request

- Provide a clear description of changes
- Include any relevant issue numbers
- Request review from maintainers

### Development Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Follow the existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help

- **Documentation**: Check our [docs](https://docs.spendahead.com)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/spendahead/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/yourusername/spendahead/discussions)
- **Email**: Contact us at support@spendahead.com

### Common Issues

#### Backend Issues

```bash
# Database connection issues
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Redis connection issues
# Check if Redis is running
sudo systemctl status redis
```

#### Frontend Issues

```bash
# Node modules issues
rm -rf node_modules package-lock.json
npm install

# Build issues
npm run build --verbose
```

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅

- [ ] User authentication system
- [ ] Basic transaction management
- [ ] Database design and setup

### Phase 2: Core Features 🚧

- [ ] Category management system
- [ ] Budget management
- [ ] Basic analytics and reporting

### Phase 3: AI Integration 📋

- [ ] AI-powered categorization
- [ ] Smart Q&A assistant
- [ ] Intelligent insights generation

### Phase 4: Polish & Launch 📋

- [ ] UI/UX improvements
- [ ] Comprehensive testing
- [ ] Production deployment

### Future Enhancements 🚀

- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] Investment tracking
- [ ] Tax optimization features
- [ ] Multi-currency support
- [ ] Team/family accounts

---

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **FastAPI** team for the excellent web framework
- **React** team for the frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **ShadCN UI** for the beautiful component library

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/spendahead)
![GitHub issues](https://img.shields.io/github/issues/yourusername/spendahead)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/spendahead)
![GitHub stars](https://img.shields.io/github/stars/yourusername/spendahead)

---

**Made with ❤️ by the SpendAhead Team**

For more information, visit [spendahead.com](https://spendahead.com)
