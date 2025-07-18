"""
Budget models for the SpendAhead backend.

This module defines the Budget and BudgetItem models for budget management
with period-based tracking and AI-powered budget suggestions.
"""

from decimal import Decimal
from typing import Optional

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    String,
    Text,
    ForeignKey,
    Numeric,
    Integer,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Budget(Base):
    """Budget model for budget management."""

    __tablename__ = "budgets"

    # Primary key
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )

    # User relationship
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Budget details
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)

    # Budget period
    period_type = Column(
        String(20), default="monthly", nullable=False
    )  # monthly, yearly, custom
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)

    # Budget amounts
    total_budget = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default="USD", nullable=False)

    # Budget status
    is_active = Column(Boolean, default=True, nullable=False)
    is_template = Column(
        Boolean, default=False, nullable=False
    )  # For reusable budget templates

    # Budget settings
    rollover_enabled = Column(
        Boolean, default=False, nullable=False
    )  # Allow unused budget to roll over
    alert_threshold = Column(
        Integer, default=80, nullable=False
    )  # Alert when 80% of budget is used
    alert_enabled = Column(Boolean, default=True, nullable=False)

    # AI budget suggestions
    ai_generated = Column(Boolean, default=False, nullable=False)
    ai_suggestions = Column(JSONB, nullable=True)  # AI-generated budget suggestions

    # Budget performance tracking
    actual_spent = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)
    variance_amount = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)
    variance_percentage = Column(Numeric(5, 2), default=Decimal("0.00"), nullable=False)

    # Timestamps
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Soft delete
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="budgets")
    budget_items = relationship(
        "BudgetItem", back_populates="budget", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        """String representation of the Budget model."""
        return (
            f"<Budget(id={self.id}, name='{self.name}', period='{self.period_type}')>"
        )

    def get_remaining_budget(self) -> Decimal:
        """Get remaining budget amount."""
        total_budget = getattr(self, "total_budget", Decimal("0.00"))
        actual_spent = getattr(self, "actual_spent", Decimal("0.00"))
        return total_budget - actual_spent

    def get_budget_usage_percentage(self) -> float:
        """Get budget usage percentage."""
        total_budget = getattr(self, "total_budget", Decimal("0.00"))
        if total_budget <= 0:
            return 0.0

        actual_spent = getattr(self, "actual_spent", Decimal("0.00"))
        return float((actual_spent / total_budget) * 100)

    def is_over_budget(self) -> bool:
        """Check if budget is exceeded."""
        return self.get_remaining_budget() < 0

    def is_alert_threshold_reached(self) -> bool:
        """Check if alert threshold is reached."""
        if not getattr(self, "alert_enabled", True):
            return False

        usage_percentage = self.get_budget_usage_percentage()
        alert_threshold = getattr(self, "alert_threshold", 80)
        return usage_percentage >= alert_threshold

    def update_actual_spent(self, amount: Decimal) -> None:
        """Update actual spent amount and recalculate variance."""
        current_spent = getattr(self, "actual_spent", Decimal("0.00"))
        total_budget = getattr(self, "total_budget", Decimal("0.00"))

        new_spent = current_spent + amount
        variance_amount = new_spent - total_budget

        if total_budget > 0:
            variance_percentage = (variance_amount / total_budget) * 100
        else:
            variance_percentage = Decimal("0.00")

        setattr(self, "actual_spent", new_spent)
        setattr(self, "variance_amount", variance_amount)
        setattr(self, "variance_percentage", variance_percentage)


class BudgetItem(Base):
    """Budget item model for individual budget categories."""

    __tablename__ = "budget_items"

    # Primary key
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )

    # Budget relationship
    budget_id = Column(
        UUID(as_uuid=True),
        ForeignKey("budgets.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Category relationship
    category_id = Column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Budget item details
    planned_amount = Column(Numeric(10, 2), nullable=False)
    actual_amount = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)

    # Budget item settings
    is_fixed = Column(
        Boolean, default=False, nullable=False
    )  # Fixed vs flexible budget
    priority = Column(
        Integer, default=1, nullable=False
    )  # Priority for budget adjustments

    # Performance tracking
    variance_amount = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)
    variance_percentage = Column(Numeric(5, 2), default=Decimal("0.00"), nullable=False)

    # AI suggestions
    ai_suggested_amount = Column(Numeric(10, 2), nullable=True)
    ai_confidence_score = Column(Numeric(3, 2), nullable=True)

    # Timestamps
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    budget = relationship("Budget", back_populates="budget_items")
    category = relationship("Category")

    def __repr__(self) -> str:
        """String representation of the BudgetItem model."""
        return f"<BudgetItem(id={self.id}, planned={self.planned_amount}, actual={self.actual_amount})>"

    def get_remaining_amount(self) -> Decimal:
        """Get remaining budget amount for this item."""
        planned_amount = getattr(self, "planned_amount", Decimal("0.00"))
        actual_amount = getattr(self, "actual_amount", Decimal("0.00"))
        return planned_amount - actual_amount

    def get_usage_percentage(self) -> float:
        """Get budget usage percentage for this item."""
        planned_amount = getattr(self, "planned_amount", Decimal("0.00"))
        if planned_amount <= 0:
            return 0.0

        actual_amount = getattr(self, "actual_amount", Decimal("0.00"))
        return float((actual_amount / planned_amount) * 100)

    def is_over_budget(self) -> bool:
        """Check if this budget item is exceeded."""
        return self.get_remaining_amount() < 0

    def update_actual_amount(self, amount: Decimal) -> None:
        """Update actual amount and recalculate variance."""
        current_actual = getattr(self, "actual_amount", Decimal("0.00"))
        planned_amount = getattr(self, "planned_amount", Decimal("0.00"))

        new_actual = current_actual + amount
        variance_amount = new_actual - planned_amount

        if planned_amount > 0:
            variance_percentage = (variance_amount / planned_amount) * 100
        else:
            variance_percentage = Decimal("0.00")

        setattr(self, "actual_amount", new_actual)
        setattr(self, "variance_amount", variance_amount)
        setattr(self, "variance_percentage", variance_percentage)
