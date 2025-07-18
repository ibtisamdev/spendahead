# Linting Setup Documentation

## Overview

SpendAhead uses a **project-level linting approach** where each project (backend/frontend) manages its own linting tools independently. This approach avoids conflicts between different ecosystems and provides better separation of concerns.

## Architecture

```
spendahead/
├── backend/                    # Python FastAPI backend
│   ├── .pre-commit-config.yaml # Python-specific hooks
│   ├── pyproject.toml         # Python tool configuration
│   └── scripts/
│       └── setup-linting.sh   # Backend setup script
├── frontend/ (future)         # React TypeScript frontend
│   ├── .husky/               # JS/TS hooks (when created)
│   ├── package.json          # Frontend scripts
│   └── scripts/
│       └── setup-linting.sh  # Frontend setup script
└── package.json              # Root convenience scripts
```

## Backend Linting (Python)

### Tools Used

- **Black**: Code formatting (88 character line length)
- **isort**: Import sorting (compatible with Black)
- **flake8**: Linting (88 character line length, ignores E203, W503)
- **mypy**: Type checking (strict mode)
- **bandit**: Security auditing
- **pre-commit**: Hook management

### Setup

```bash
cd backend
./scripts/setup-linting.sh
```

### Available Commands

```bash
# Format code
python -m black .

# Sort imports
python -m isort .

# Lint code
python -m flake8 .

# Type checking
python -m mypy .

# Security audit
bandit -r . -x venv

# Run all pre-commit hooks manually
pre-commit run --all-files
```

## Frontend Linting (Future - React/TypeScript)

### Tools Used (When Created)

- **Prettier**: Code formatting
- **ESLint**: Linting with TypeScript support
- **Husky**: Git hooks
- **lint-staged**: Staged file processing

### Setup (When Frontend is Created)

```bash
cd frontend
npm install
npx husky install
```

## Root Level

### Convenience Scripts

The root `package.json` provides convenience scripts to run linting across all projects:

```bash
# Backend linting
npm run lint:backend          # Check backend code
npm run lint:backend:fix      # Fix backend formatting

# Frontend linting (when created)
npm run lint:frontend         # Check frontend code
npm run lint:frontend:fix     # Fix frontend formatting

# All projects
npm run lint:all              # Check all projects
npm run test:all              # Test all projects

# Setup scripts
npm run setup:backend         # Setup backend linting
npm run setup:frontend        # Setup frontend linting (when created)
```

### Git Hooks Integration

Root-level Husky manages Git hooks and coordinates with project-level tools:

- **pre-commit**: Runs lint-staged for root files + backend pre-commit hooks
- **commit-msg**: Runs commitlint for conventional commits

## How It Works

### 1. Pre-commit Flow

```bash
git commit -m "feat: add new feature"
├── Husky pre-commit hook runs
│   ├── lint-staged (root files)
│   └── backend pre-commit hooks (if backend files changed)
└── Husky commit-msg hook runs
    └── commitlint (conventional commits)
```

### 2. File Filtering

- **Backend tools**: Only run on files in `backend/` directory
- **Frontend tools**: Only run on files in `frontend/` directory (when created)
- **Root tools**: Run on root-level configuration files

### 3. Error Handling

- If any linting fails, the commit is blocked
- Tools automatically fix some issues (formatting, imports)
- Manual fixes required for other issues (type errors, security issues)

## Configuration Files

### Backend

- `backend/.pre-commit-config.yaml`: Pre-commit hooks configuration
- `backend/pyproject.toml`: Python tool configurations (Black, isort, flake8, mypy)
- `backend/scripts/setup-linting.sh`: Backend setup script

### Frontend (Future)

- `frontend/.eslintrc.js`: ESLint configuration
- `frontend/.prettierrc`: Prettier configuration
- `frontend/package.json`: Frontend scripts and lint-staged config

### Root

- `package.json`: Convenience scripts
- `.husky/`: Git hooks configuration
- `commitlint.config.js`: Conventional commit rules

## Benefits

### ✅ Advantages

1. **No Conflicts**: Each project uses its native ecosystem
2. **Better Performance**: Only runs relevant tools for changed files
3. **Independent Development**: Teams can work on each project separately
4. **Language-Specific**: Python tools for backend, JS tools for frontend
5. **Easier Maintenance**: Each project manages its own quality tools
6. **Better CI/CD**: Each project can have its own pipeline

### ✅ Clean Separation

- **Backend**: Python ecosystem (pre-commit, black, flake8, mypy)
- **Frontend**: JavaScript ecosystem (Husky, ESLint, Prettier)
- **Root**: Coordination and convenience scripts

## Troubleshooting

### Common Issues

1. **"Cowardly refusing to install hooks"**
   - This is expected when using Husky at root level
   - Backend pre-commit hooks run through Husky integration

2. **Bandit security warnings**
   - Excludes virtual environment and cache directories
   - Focuses on your actual code, not dependencies

3. **Type checking errors**
   - Run `python -m mypy .` to see specific type issues
   - Add type annotations or `# type: ignore` comments as needed

### Manual Commands

```bash
# Run backend linting manually
cd backend
pre-commit run --all-files

# Run specific backend tools
python -m black --check .
python -m isort --check-only .
python -m flake8 .
python -m mypy .

# Run root-level linting
npm run lint:backend
```

## Future Enhancements

### When Frontend is Created

1. Add frontend-specific linting configuration
2. Update root scripts to include frontend commands
3. Configure Husky to run frontend hooks
4. Add frontend setup script

### Additional Tools

- **Backend**: Add `pylint` for additional linting
- **Frontend**: Add `stylelint` for CSS linting
- **Both**: Add `sonarqube` for code quality analysis

## Best Practices

1. **Always run linting before committing**
2. **Fix auto-fixable issues automatically**
3. **Address security warnings promptly**
4. **Keep tool versions updated**
5. **Use conventional commit messages**
6. **Run tests after linting fixes**

## Support

For issues with linting setup:

1. Check the specific project's setup script
2. Review tool-specific documentation
3. Check pre-commit hook logs
4. Ensure all dependencies are installed
