"""
Category model for the SpendAhead backend.

This module defines the Category model for organizing financial transactions
with hierarchical structure and AI-powered categorization support.
"""

from decimal import Decimal
from typing import Optional

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
    ForeignKey,
    Numeric,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Category(Base):
    """Category model for organizing financial transactions."""

    __tablename__ = "categories"

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

    # Hierarchy support
    parent_id = Column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    # Category details
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    color = Column(String(7), default="#3B82F6", nullable=False)  # Hex color
    icon = Column(String(50), nullable=True)  # Icon identifier

    # Category type (income, expense, transfer)
    category_type = Column(String(20), default="expense", nullable=False)

    # Budget tracking
    budget_amount = Column(Numeric(10, 2), nullable=True)
    budget_period = Column(
        String(20), default="monthly", nullable=False
    )  # monthly, yearly

    # Usage tracking
    transaction_count = Column(Integer, default=0, nullable=False)
    total_amount = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)

    # AI categorization
    ai_confidence_score = Column(Numeric(3, 2), nullable=True)  # 0.00 to 1.00
    keywords = Column(Text, nullable=True)  # JSON array of keywords for AI matching

    # System category (cannot be deleted/modified by user)
    is_system = Column(Boolean, default=False, nullable=False)

    # Active status
    is_active = Column(Boolean, default=True, nullable=False)

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
    user = relationship("User", back_populates="categories")
    parent = relationship("Category", remote_side=[id], back_populates="children")
    children = relationship("Category", back_populates="parent")
    transactions = relationship(
        "Transaction", foreign_keys="Transaction.category_id", back_populates="category"
    )

    def __repr__(self) -> str:
        """String representation of the Category model."""
        return (
            f"<Category(id={self.id}, name='{self.name}', type='{self.category_type}')>"
        )

    def get_full_path(self) -> str:
        """Get the full hierarchical path of the category."""
        if hasattr(self, "parent") and self.parent:
            return f"{self.parent.get_full_path()} > {getattr(self, 'name', '')}"
        return getattr(self, "name", "")

    def get_level(self) -> int:
        """Get the hierarchy level of the category."""
        if hasattr(self, "parent") and self.parent:
            return self.parent.get_level() + 1
        return 0

    def is_leaf_category(self) -> bool:
        """Check if category is a leaf node (no children)."""
        return len(getattr(self, "children", [])) == 0

    def get_budget_remaining(
        self, current_period_amount: Optional[Decimal] = None
    ) -> Optional[Decimal]:
        """Get remaining budget for the current period."""
        budget_amount = getattr(self, "budget_amount", None)
        if not budget_amount:
            return None

        spent = current_period_amount or getattr(self, "total_amount", Decimal("0.00"))
        return budget_amount - spent

    def get_budget_percentage(
        self, current_period_amount: Optional[Decimal] = None
    ) -> Optional[float]:
        """Get budget usage percentage."""
        budget_amount = getattr(self, "budget_amount", None)
        if not budget_amount:
            return None

        spent = current_period_amount or getattr(self, "total_amount", Decimal("0.00"))
        return float((spent / budget_amount) * 100)
