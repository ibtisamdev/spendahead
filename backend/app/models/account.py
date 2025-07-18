"""
Account model for the SpendAhead backend.

This module defines the Account model for managing different financial accounts
like bank accounts, credit cards, cash, investments, etc.
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


class Account(Base):
    """Account model for financial accounts."""

    __tablename__ = "accounts"

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

    # Account details
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    account_type = Column(
        String(50), nullable=False
    )  # bank, credit_card, cash, investment, etc.
    account_subtype = Column(String(50), nullable=True)  # checking, savings, etc.

    # Financial details
    currency = Column(String(3), default="USD", nullable=False)
    current_balance = Column(Numeric(10, 2), default=Decimal("0.00"), nullable=False)
    available_balance = Column(Numeric(10, 2), nullable=True)  # For credit cards
    credit_limit = Column(Numeric(10, 2), nullable=True)  # For credit cards

    # Account numbers and identifiers
    account_number = Column(String(50), nullable=True)
    routing_number = Column(String(20), nullable=True)  # For US bank accounts
    institution_name = Column(String(100), nullable=True)
    institution_id = Column(String(50), nullable=True)

    # External integration
    external_id = Column(
        String(255), nullable=True, index=True
    )  # For bank integrations
    external_account_id = Column(String(255), nullable=True)  # For Plaid, etc.
    last_sync_at = Column(DateTime(timezone=True), nullable=True)
    sync_status = Column(
        String(20), default="manual", nullable=False
    )  # manual, auto, error

    # Account status
    is_active = Column(Boolean, default=True, nullable=False)
    is_archived = Column(Boolean, default=False, nullable=False)
    exclude_from_budget = Column(
        Boolean, default=False, nullable=False
    )  # Exclude from budget calculations
    exclude_from_net_worth = Column(
        Boolean, default=False, nullable=False
    )  # Exclude from net worth

    # Account preferences
    color = Column(String(7), default="#3B82F6", nullable=False)  # Hex color
    icon = Column(String(50), nullable=True)  # Icon identifier
    display_order = Column(Integer, default=0, nullable=False)  # For custom ordering

    # Additional metadata
    account_metadata = Column(JSONB, nullable=True)  # Additional account-specific data

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
    user = relationship("User", back_populates="accounts")
    outgoing_transactions = relationship(
        "Transaction",
        foreign_keys="Transaction.from_account_id",
        back_populates="from_account",
    )
    incoming_transactions = relationship(
        "Transaction",
        foreign_keys="Transaction.to_account_id",
        back_populates="to_account",
    )

    def __repr__(self) -> str:
        """String representation of the Account model."""
        return (
            f"<Account(id={self.id}, name='{self.name}', type='{self.account_type}')>"
        )

    @property
    def is_credit_card(self) -> bool:
        """Check if account is a credit card."""
        return getattr(self, "account_type", "") == "credit_card"

    @property
    def is_bank_account(self) -> bool:
        """Check if account is a bank account."""
        return getattr(self, "account_type", "") == "bank"

    @property
    def is_cash(self) -> bool:
        """Check if account is cash."""
        return getattr(self, "account_type", "") == "cash"

    @property
    def is_investment(self) -> bool:
        """Check if account is an investment account."""
        return getattr(self, "account_type", "") == "investment"

    def get_available_balance(self) -> Decimal:
        """Get available balance for the account."""
        if self.is_credit_card:
            available = getattr(self, "available_balance", None)
            if available is not None:
                return available
            # For credit cards, available balance is credit limit - current balance
            credit_limit = getattr(self, "credit_limit", Decimal("0.00"))
            current_balance = getattr(self, "current_balance", Decimal("0.00"))
            return credit_limit - current_balance
        else:
            return getattr(self, "current_balance", Decimal("0.00"))

    def get_balance_formatted(self) -> str:
        """Get formatted balance string."""
        balance = self.get_available_balance()
        currency = getattr(self, "currency", "USD")
        return f"{currency} {balance:,.2f}"

    def update_balance(self, amount: Decimal) -> None:
        """Update account balance."""
        current_balance = getattr(self, "current_balance", Decimal("0.00"))
        setattr(self, "current_balance", current_balance + amount)

    def get_credit_utilization(self) -> Optional[float]:
        """Get credit utilization percentage for credit cards."""
        if not self.is_credit_card:
            return None

        credit_limit = getattr(self, "credit_limit", None)
        if not credit_limit or credit_limit <= 0:
            return None

        current_balance = getattr(self, "current_balance", Decimal("0.00"))
        return float((current_balance / credit_limit) * 100)

    def is_overdrawn(self) -> bool:
        """Check if account is overdrawn."""
        if self.is_credit_card:
            return self.get_available_balance() < 0
        else:
            return getattr(self, "current_balance", Decimal("0.00")) < 0
