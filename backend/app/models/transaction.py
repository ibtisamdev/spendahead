"""
Transaction model for the SpendAhead backend.

This module defines the Transaction model for financial transactions
with AI-powered categorization and comprehensive tracking.
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


class Transaction(Base):
    """Transaction model for financial transactions."""

    __tablename__ = "transactions"

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

    # Account relationships
    from_account_id = Column(
        UUID(as_uuid=True),
        ForeignKey("accounts.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    to_account_id = Column(
        UUID(as_uuid=True),
        ForeignKey("accounts.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Category relationship
    category_id = Column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Transaction details
    description = Column(String(255), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default="USD", nullable=False)

    # Transaction type (income, expense, transfer)
    transaction_type = Column(String(20), nullable=False)

    # Transaction date
    transaction_date = Column(DateTime(timezone=True), nullable=False, index=True)

    # Additional details
    notes = Column(Text, nullable=True)
    tags = Column(JSONB, nullable=True)  # Array of tag strings
    location = Column(String(255), nullable=True)

    # Recurring transaction support
    is_recurring = Column(Boolean, default=False, nullable=False)
    recurring_pattern = Column(JSONB, nullable=True)  # Recurring pattern configuration
    parent_transaction_id = Column(
        UUID(as_uuid=True),
        ForeignKey("transactions.id", ondelete="SET NULL"),
        nullable=True,
    )

    # Import/Export tracking
    external_id = Column(
        String(255), nullable=True, index=True
    )  # For imported transactions
    import_source = Column(
        String(50), nullable=True
    )  # Source of import (CSV, bank, etc.)
    import_metadata = Column(JSONB, nullable=True)  # Additional import metadata

    # AI categorization
    ai_categorized = Column(Boolean, default=False, nullable=False)
    ai_confidence_score = Column(Numeric(3, 2), nullable=True)  # 0.00 to 1.00
    ai_suggested_category_id = Column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="SET NULL"),
        nullable=True,
    )
    ai_categorization_data = Column(JSONB, nullable=True)  # AI processing data

    # Status and flags
    is_verified = Column(Boolean, default=False, nullable=False)
    is_cleared = Column(Boolean, default=False, nullable=False)
    is_reconciled = Column(Boolean, default=False, nullable=False)

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
    user = relationship("User", back_populates="transactions")
    from_account = relationship(
        "Account",
        foreign_keys=[from_account_id],
        back_populates="outgoing_transactions",
    )
    to_account = relationship(
        "Account", foreign_keys=[to_account_id], back_populates="incoming_transactions"
    )
    category = relationship(
        "Category", foreign_keys=[category_id], back_populates="transactions"
    )
    ai_suggested_category = relationship(
        "Category", foreign_keys=[ai_suggested_category_id]
    )
    parent_transaction = relationship(
        "Transaction", remote_side=[id], back_populates="child_transactions"
    )
    child_transactions = relationship(
        "Transaction", back_populates="parent_transaction"
    )

    def __repr__(self) -> str:
        """String representation of the Transaction model."""
        return f"<Transaction(id={self.id}, description='{self.description}', amount={self.amount})>"

    @property
    def is_income(self) -> bool:
        """Check if transaction is income."""
        return getattr(self, "transaction_type", "") == "income"

    @property
    def is_expense(self) -> bool:
        """Check if transaction is expense."""
        return getattr(self, "transaction_type", "") == "expense"

    @property
    def is_transfer(self) -> bool:
        """Check if transaction is transfer."""
        return getattr(self, "transaction_type", "") == "transfer"

    @property
    def absolute_amount(self) -> Decimal:
        """Get absolute amount (positive for income, negative for expense)."""
        amount = getattr(self, "amount", Decimal("0.00"))
        if self.is_expense:
            return -abs(amount)
        return abs(amount)

    def get_tags_list(self) -> list[str]:
        """Get list of tags."""
        tags = getattr(self, "tags", None)
        if tags and isinstance(tags, list):
            return tags
        return []

    def add_tag(self, tag: str) -> None:
        """Add a tag to the transaction."""
        current_tags = self.get_tags_list()
        if tag not in current_tags:
            current_tags.append(tag)
            setattr(self, "tags", current_tags)

    def remove_tag(self, tag: str) -> None:
        """Remove a tag from the transaction."""
        current_tags = self.get_tags_list()
        if tag in current_tags:
            current_tags.remove(tag)
            setattr(self, "tags", current_tags)

    def get_ai_confidence_level(self) -> str:
        """Get AI confidence level as string."""
        confidence = getattr(self, "ai_confidence_score", None)
        if confidence is None:
            return "unknown"
        elif confidence >= Decimal("0.9"):
            return "high"
        elif confidence >= Decimal("0.7"):
            return "medium"
        else:
            return "low"
