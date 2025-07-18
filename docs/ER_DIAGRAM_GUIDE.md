# 🗺️ ER Diagram Guide for SpendAhead

This guide explains how to generate and understand the Entity-Relationship (ER) diagram for the SpendAhead database.

## 📊 ER Diagram Tools

### 1. **dbdiagram.io** (Recommended)

- **URL**: https://dbdiagram.io/d
- **Features**: Free, web-based, SQL import, collaboration
- **Best for**: Quick visualization and sharing

### 2. **Lucidchart**

- **URL**: https://www.lucidchart.com/
- **Features**: Professional diagrams, database reverse engineering
- **Best for**: Enterprise use, complex diagrams

### 3. **Draw.io (diagrams.net)**

- **URL**: https://app.diagrams.net/
- **Features**: Free, open-source, offline support
- **Best for**: Offline work, custom templates

### 4. **pgAdmin** (Built-in)

- **Features**: Direct database connection, PostgreSQL-specific
- **Best for**: Real-time database visualization

## 🚀 Generating Your ER Diagram

### Method 1: Using the Generated Script (Recommended)

```bash
# Navigate to backend directory
cd backend

# Run the ER diagram generator
python scripts/generate_er_diagram.py
```

This will:

- Generate a dbdiagram.io compatible schema
- Save it to `database_schema.dbml`
- Display the schema in the terminal

### Method 2: Manual Generation

1. **Copy the generated schema** from the script output
2. **Go to https://dbdiagram.io/d**
3. **Click "Create New Diagram"**
4. **Paste the schema** in the editor
5. **Click "Save"** to generate your ER diagram

## 🏗️ Database Schema Overview

### Core Tables

#### 1. **Users** (Central Entity)

- **Purpose**: User authentication and profile management
- **Key Fields**: `id`, `email`, `hashed_password`, `is_active`
- **Relationships**: One-to-many with all other tables

#### 2. **Categories** (Hierarchical)

- **Purpose**: Transaction categorization with AI support
- **Key Fields**: `id`, `user_id`, `parent_id`, `name`, `category_type`
- **Relationships**:
  - Many-to-one with Users
  - Self-referencing (parent-child hierarchy)
  - One-to-many with Transactions

#### 3. **Accounts** (Financial Accounts)

- **Purpose**: Bank accounts, credit cards, cash, investments
- **Key Fields**: `id`, `user_id`, `name`, `account_type`, `current_balance`
- **Relationships**:
  - Many-to-one with Users
  - One-to-many with Transactions (as source/destination)

#### 4. **Transactions** (Core Financial Data)

- **Purpose**: All financial transactions with AI categorization
- **Key Fields**: `id`, `user_id`, `amount`, `description`, `transaction_type`
- **Relationships**:
  - Many-to-one with Users
  - Many-to-one with Categories
  - Many-to-one with Accounts (from_account_id, to_account_id)
  - Self-referencing (recurring transactions)

### Supporting Tables

#### 5. **Budgets** (Budget Management)

- **Purpose**: Period-based budget tracking
- **Key Fields**: `id`, `user_id`, `name`, `total_budget`, `period_type`
- **Relationships**:
  - Many-to-one with Users
  - One-to-many with BudgetItems

#### 6. **BudgetItems** (Budget Categories)

- **Purpose**: Individual budget allocations per category
- **Key Fields**: `id`, `budget_id`, `category_id`, `planned_amount`
- **Relationships**:
  - Many-to-one with Budgets
  - Many-to-one with Categories

#### 7. **AIInsights** (AI-Generated Insights)

- **Purpose**: AI-powered financial insights and recommendations
- **Key Fields**: `id`, `user_id`, `title`, `insight_type`, `ai_confidence_score`
- **Relationships**: Many-to-one with Users

#### 8. **AuditLogs** (System Audit Trail)

- **Purpose**: Track all changes and user actions
- **Key Fields**: `id`, `user_id`, `action`, `entity_type`, `entity_id`
- **Relationships**: Many-to-one with Users

## 🔗 Key Relationships

### 1. **User-Centric Design**

```
Users (1) ←→ (Many) Categories
Users (1) ←→ (Many) Accounts
Users (1) ←→ (Many) Transactions
Users (1) ←→ (Many) Budgets
Users (1) ←→ (Many) AIInsights
```

### 2. **Transaction Flow**

```
Accounts ←→ Transactions ←→ Categories
    ↑           ↑              ↑
    └─── User ──┴──────────────┘
```

### 3. **Budget Structure**

```
Users → Budgets → BudgetItems → Categories
```

### 4. **Hierarchical Categories**

```
Categories (Parent) ←→ Categories (Children)
```

## 📈 Database Features

### 1. **Multi-Tenancy**

- All tables include `user_id` for data isolation
- Soft delete support (`is_deleted`, `deleted_at`)

### 2. **AI Integration**

- AI categorization in Transactions
- AI insights generation
- Confidence scoring throughout

### 3. **Audit Trail**

- Comprehensive change tracking
- User action logging
- Data integrity monitoring

### 4. **Flexibility**

- JSONB fields for extensible data
- Hierarchical categories
- Recurring transactions
- Multiple account types

## 🎨 ER Diagram Best Practices

### 1. **Color Coding**

- **Users**: Blue (central entity)
- **Financial**: Green (transactions, accounts)
- **Categories**: Orange (organization)
- **AI**: Purple (intelligence)
- **Audit**: Gray (system)

### 2. **Relationship Types**

- **Solid Line**: Required relationship (NOT NULL)
- **Dashed Line**: Optional relationship (NULL allowed)
- **Crow's Foot**: Many side of relationship
- **Single Line**: One side of relationship

### 3. **Cardinality**

- **1:1**: One-to-one
- **1:N**: One-to-many
- **N:M**: Many-to-many (through junction table)

## 🔧 Customizing Your ER Diagram

### 1. **Adding Custom Fields**

Edit the `generate_er_diagram.py` script to add new fields or tables.

### 2. **Modifying Relationships**

Update the foreign key references in the schema.

### 3. **Changing Styles**

Use dbdiagram.io's styling options to customize colors and layouts.

## 📱 Mobile-Friendly Viewing

The generated ER diagram is responsive and works well on:

- Desktop browsers
- Tablets
- Mobile devices

## 🔄 Keeping Diagrams Updated

### 1. **Automatic Updates**

Run the generator script whenever you modify models:

```bash
python scripts/generate_er_diagram.py
```

### 2. **Version Control**

- Commit the `database_schema.dbml` file
- Update diagrams before major releases
- Document schema changes

## 🚨 Troubleshooting

### Common Issues

1. **Schema Not Loading**
   - Check syntax in dbdiagram.io
   - Verify all brackets and references

2. **Relationships Not Showing**
   - Ensure foreign key references are correct
   - Check table names match exactly

3. **Performance Issues**
   - Large diagrams may load slowly
   - Consider splitting into multiple diagrams

### Getting Help

- **dbdiagram.io Documentation**: https://dbdiagram.io/docs
- **Community Support**: GitHub issues or discussions
- **Schema Validation**: Use the generated script for consistency

## 📚 Additional Resources

- [Database Design Best Practices](https://dbdiagram.io/docs)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [ER Diagram Standards](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)

---

**Last Updated**: December 2024
**Generated Schema**: `backend/database_schema.dbml`
**Online Tool**: https://dbdiagram.io/d
