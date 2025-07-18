"""
User model for the SpendAhead backend.

This module defines the User model with authentication and profile information.
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class User(Base):
    """User model for authentication and profile management."""

    __tablename__ = "users"

    # Primary key
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )

    # Authentication fields
    email: Mapped[str] = mapped_column(
        String(255), unique=True, index=True, nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Profile fields
    first_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    timezone: Mapped[str] = mapped_column(String(50), default="UTC", nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="USD", nullable=False)
    language: Mapped[str] = mapped_column(String(5), default="en", nullable=False)

    # Preferences
    notification_preferences: Mapped[Optional[str]] = mapped_column(
        Text, nullable=True
    )  # JSON string
    theme_preference: Mapped[str] = mapped_column(
        String(20), default="light", nullable=False
    )

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    last_login_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Soft delete
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    deleted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Relationships
    categories = relationship(
        "Category", back_populates="user", cascade="all, delete-orphan"
    )
    transactions = relationship(
        "Transaction", back_populates="user", cascade="all, delete-orphan"
    )
    accounts = relationship(
        "Account", back_populates="user", cascade="all, delete-orphan"
    )
    budgets = relationship(
        "Budget", back_populates="user", cascade="all, delete-orphan"
    )
    ai_insights = relationship(
        "AIInsight", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        """String representation of the User model."""
        return f"<User(id={self.id}, email='{self.email}')>"

    @property
    def full_name(self) -> str:
        """Get the full name of the user."""
        first_name = getattr(self, "first_name", None)
        last_name = getattr(self, "last_name", None)
        email = getattr(self, "email", "")

        if first_name and last_name:
            return f"{first_name} {last_name}"
        elif first_name:
            return first_name
        elif last_name:
            return last_name
        else:
            return email

    @property
    def is_authenticated(self) -> bool:
        """Check if user is authenticated and active."""
        is_active = getattr(self, "is_active", False)
        is_deleted = getattr(self, "is_deleted", False)
        return bool(is_active and not is_deleted)
