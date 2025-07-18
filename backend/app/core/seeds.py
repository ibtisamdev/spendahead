"""
Database seeding utilities for the SpendAhead backend.

This module provides functions to seed the database with default data
like system categories, default accounts, and initial configuration.
"""

import asyncio
import json
from decimal import Decimal
from typing import List
from uuid import uuid4

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from app.models.user import User
from app.models.category import Category
from app.models.account import Account
from app.models.budget import Budget


# Default system categories
DEFAULT_CATEGORIES = [
    # Income categories
    {
        "name": "Salary",
        "category_type": "income",
        "color": "#10B981",  # Green
        "icon": "briefcase",
        "is_system": True,
        "keywords": ["salary", "wage", "paycheck", "income", "earnings"],
    },
    {
        "name": "Freelance",
        "category_type": "income",
        "color": "#059669",  # Darker green
        "icon": "laptop",
        "is_system": True,
        "keywords": ["freelance", "contract", "consulting", "gig"],
    },
    {
        "name": "Investment",
        "category_type": "income",
        "color": "#047857",  # Dark green
        "icon": "trending-up",
        "is_system": True,
        "keywords": ["dividend", "interest", "capital gains", "investment"],
    },
    {
        "name": "Other Income",
        "category_type": "income",
        "color": "#065F46",  # Very dark green
        "icon": "plus-circle",
        "is_system": True,
        "keywords": ["bonus", "gift", "refund", "other"],
    },
    # Expense categories
    {
        "name": "Food & Dining",
        "category_type": "expense",
        "color": "#EF4444",  # Red
        "icon": "utensils",
        "is_system": True,
        "keywords": ["food", "restaurant", "dining", "groceries", "lunch", "dinner"],
    },
    {
        "name": "Transportation",
        "category_type": "expense",
        "color": "#DC2626",  # Dark red
        "icon": "car",
        "is_system": True,
        "keywords": [
            "gas",
            "fuel",
            "uber",
            "lyft",
            "taxi",
            "bus",
            "train",
            "transport",
        ],
    },
    {
        "name": "Shopping",
        "category_type": "expense",
        "color": "#B91C1C",  # Very dark red
        "icon": "shopping-bag",
        "is_system": True,
        "keywords": ["clothing", "shoes", "electronics", "shopping", "retail"],
    },
    {
        "name": "Entertainment",
        "category_type": "expense",
        "color": "#991B1B",  # Very dark red
        "icon": "film",
        "is_system": True,
        "keywords": ["movie", "concert", "show", "entertainment", "fun"],
    },
    {
        "name": "Healthcare",
        "category_type": "expense",
        "color": "#7F1D1D",  # Very dark red
        "icon": "heart",
        "is_system": True,
        "keywords": ["doctor", "medical", "health", "pharmacy", "dental"],
    },
    {
        "name": "Housing",
        "category_type": "expense",
        "color": "#450A0A",  # Very dark red
        "icon": "home",
        "is_system": True,
        "keywords": [
            "rent",
            "mortgage",
            "utilities",
            "electricity",
            "water",
            "internet",
        ],
    },
    {
        "name": "Education",
        "category_type": "expense",
        "color": "#DC2626",  # Dark red
        "icon": "book",
        "is_system": True,
        "keywords": ["tuition", "books", "course", "education", "learning"],
    },
    {
        "name": "Personal Care",
        "category_type": "expense",
        "color": "#B91C1C",  # Very dark red
        "icon": "user",
        "is_system": True,
        "keywords": ["haircut", "spa", "gym", "fitness", "personal care"],
    },
    {
        "name": "Business",
        "category_type": "expense",
        "color": "#991B1B",  # Very dark red
        "icon": "briefcase",
        "is_system": True,
        "keywords": ["office", "business", "work", "professional"],
    },
    {
        "name": "Gifts & Donations",
        "category_type": "expense",
        "color": "#7F1D1D",  # Very dark red
        "icon": "gift",
        "is_system": True,
        "keywords": ["gift", "donation", "charity", "present"],
    },
    {
        "name": "Travel",
        "category_type": "expense",
        "color": "#450A0A",  # Very dark red
        "icon": "plane",
        "is_system": True,
        "keywords": ["flight", "hotel", "vacation", "travel", "trip"],
    },
    {
        "name": "Insurance",
        "category_type": "expense",
        "color": "#DC2626",  # Dark red
        "icon": "shield",
        "is_system": True,
        "keywords": ["insurance", "premium", "coverage"],
    },
    {
        "name": "Taxes",
        "category_type": "expense",
        "color": "#B91C1C",  # Very dark red
        "icon": "file-text",
        "is_system": True,
        "keywords": ["tax", "irs", "government", "filing"],
    },
    {
        "name": "Other Expenses",
        "category_type": "expense",
        "color": "#991B1B",  # Very dark red
        "icon": "more-horizontal",
        "is_system": True,
        "keywords": ["misc", "other", "expense"],
    },
    # Transfer categories
    {
        "name": "Transfer",
        "category_type": "transfer",
        "color": "#6B7280",  # Gray
        "icon": "repeat",
        "is_system": True,
        "keywords": ["transfer", "move", "between accounts"],
    },
]


async def create_default_categories(
    session: AsyncSession, user_id: str
) -> List[Category]:
    """
    Create default categories for a user.

    Args:
        session: Database session
        user_id: User ID to create categories for

    Returns:
        List of created categories
    """
    categories = []

    for category_data in DEFAULT_CATEGORIES:
        # Check if category already exists for this user
        existing = await session.execute(
            select(Category).where(
                and_(
                    Category.user_id == user_id,
                    Category.name == category_data["name"],
                    Category.is_deleted.is_(False),
                )
            )
        )

        if not existing.scalar_one_or_none():
            category = Category(
                user_id=user_id,
                name=category_data["name"],
                category_type=category_data["category_type"],
                color=category_data["color"],
                icon=category_data["icon"],
                is_system=category_data["is_system"],
                keywords=json.dumps(category_data["keywords"]),
                description=f"Default {category_data['category_type']} category",
            )
            session.add(category)
            categories.append(category)

    await session.commit()
    return categories


async def create_default_accounts(session: AsyncSession, user_id: str) -> List[Account]:
    """
    Create default accounts for a user.

    Args:
        session: Database session
        user_id: User ID to create accounts for

    Returns:
        List of created accounts
    """
    default_accounts = [
        {
            "name": "Cash",
            "account_type": "cash",
            "account_subtype": "physical",
            "color": "#10B981",
            "icon": "dollar-sign",
            "description": "Physical cash and pocket money",
        },
        {
            "name": "Checking Account",
            "account_type": "bank",
            "account_subtype": "checking",
            "color": "#3B82F6",
            "icon": "credit-card",
            "description": "Primary checking account",
        },
        {
            "name": "Savings Account",
            "account_type": "bank",
            "account_subtype": "savings",
            "color": "#8B5CF6",
            "icon": "piggy-bank",
            "description": "Savings account for emergency fund",
        },
        {
            "name": "Credit Card",
            "account_type": "credit_card",
            "account_subtype": "general",
            "color": "#F59E0B",
            "icon": "credit-card",
            "description": "Primary credit card",
            "credit_limit": Decimal("5000.00"),
        },
    ]

    accounts = []

    for account_data in default_accounts:
        # Check if account already exists for this user
        existing = await session.execute(
            select(Account).where(
                and_(
                    Account.user_id == user_id,
                    Account.name == account_data["name"],
                    Account.is_deleted.is_(False),
                )
            )
        )

        if not existing.scalar_one_or_none():
            account = Account(
                user_id=user_id,
                name=account_data["name"],
                account_type=account_data["account_type"],
                account_subtype=account_data["account_subtype"],
                color=account_data["color"],
                icon=account_data["icon"],
                description=account_data["description"],
                current_balance=Decimal("0.00"),
                display_order=len(accounts),
            )

            # Set credit limit for credit cards
            if account_data["account_type"] == "credit_card":
                account.credit_limit = account_data.get(
                    "credit_limit", Decimal("5000.00")
                )

            session.add(account)
            accounts.append(account)

    await session.commit()
    return accounts


async def create_sample_budget(session: AsyncSession, user_id: str) -> Budget:
    """
    Create a sample budget for a user.

    Args:
        session: Database session
        user_id: User ID to create budget for

    Returns:
        Created budget
    """
    from datetime import datetime, timezone, timedelta

    # Check if budget already exists
    existing = await session.execute(
        select(Budget).where(
            and_(Budget.user_id == user_id, Budget.is_deleted.is_(False))
        )
    )

    if existing.scalar_one_or_none() is not None:
        return existing.scalar_one()

    # Create a monthly budget
    now = datetime.now(timezone.utc)
    start_date = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_date = (start_date + timedelta(days=32)).replace(day=1) - timedelta(seconds=1)

    budget = Budget(
        user_id=user_id,
        name="Monthly Budget",
        description="Default monthly budget",
        period_type="monthly",
        start_date=start_date,
        end_date=end_date,
        total_budget=Decimal("3000.00"),
        currency="USD",
        is_active=True,
        alert_threshold=80,
        alert_enabled=True,
    )

    session.add(budget)
    await session.commit()

    # Get expense categories for budget items
    expense_categories_result = await session.execute(
        select(Category).where(
            and_(
                Category.user_id == user_id,
                Category.category_type == "expense",
                Category.is_deleted.is_(False),
            )
        )
    )
    expense_categories = list(expense_categories_result.scalars())

    # Create budget items for major expense categories
    budget_items = [
        ("Food & Dining", Decimal("500.00")),
        ("Transportation", Decimal("200.00")),
        ("Shopping", Decimal("300.00")),
        ("Entertainment", Decimal("200.00")),
        ("Healthcare", Decimal("150.00")),
        ("Housing", Decimal("1000.00")),
        ("Education", Decimal("100.00")),
        ("Personal Care", Decimal("100.00")),
        ("Business", Decimal("200.00")),
        ("Gifts & Donations", Decimal("50.00")),
        ("Travel", Decimal("100.00")),
        ("Insurance", Decimal("100.00")),
    ]

    for category_name, planned_amount in budget_items:
        category = next(
            (c for c in expense_categories if c.name == category_name), None
        )

        if category:
            from app.models.budget import BudgetItem

            budget_item = BudgetItem(
                budget_id=budget.id,
                category_id=category.id,
                planned_amount=planned_amount,
                actual_amount=Decimal("0.00"),
                is_fixed=False,
                priority=1,
            )
            session.add(budget_item)

    await session.commit()
    return budget


async def seed_user_data(session: AsyncSession, user_id: str) -> dict:
    """
    Seed all default data for a new user.

    Args:
        session: Database session
        user_id: User ID to seed data for

    Returns:
        Dictionary with created data
    """
    categories = await create_default_categories(session, user_id)
    accounts = await create_default_accounts(session, user_id)
    budget = await create_sample_budget(session, user_id)

    return {"categories": categories, "accounts": accounts, "budget": budget}


async def reset_user_data(session: AsyncSession, user_id: str) -> dict:
    """
    Reset all data for a user (for testing purposes).

    Args:
        session: Database session
        user_id: User ID to reset data for

    Returns:
        Dictionary with reset data
    """
    # Soft delete existing data
    from datetime import datetime, timezone
    from sqlalchemy import text

    now = datetime.now(timezone.utc)
    await session.execute(
        text(
            "UPDATE categories SET is_deleted = true, deleted_at = :now WHERE user_id = :user_id"
        ),
        {"user_id": user_id, "now": now},
    )
    await session.execute(
        text(
            "UPDATE accounts SET is_deleted = true, deleted_at = :now WHERE user_id = :user_id"
        ),
        {"user_id": user_id, "now": now},
    )
    await session.execute(
        text(
            "UPDATE budgets SET is_deleted = true, deleted_at = :now WHERE user_id = :user_id"
        ),
        {"user_id": user_id, "now": now},
    )

    await session.commit()

    # Create new data
    return await seed_user_data(session, user_id)
