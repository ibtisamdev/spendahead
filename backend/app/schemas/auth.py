"""
Authentication schemas for the SpendAhead backend.

This module contains Pydantic models for authentication-related requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import EmailStr, Field, field_validator

from .base import BaseSchema


class UserCreate(BaseSchema):
    """Schema for user registration."""

    email: EmailStr = Field(description="User email address")
    password: str = Field(min_length=8, description="User password")
    first_name: Optional[str] = Field(
        default=None, max_length=100, description="User first name"
    )
    last_name: Optional[str] = Field(
        default=None, max_length=100, description="User last name"
    )
    phone: Optional[str] = Field(
        default=None, max_length=20, description="User phone number"
    )
    timezone: str = Field(default="UTC", description="User timezone")
    currency: str = Field(
        default="USD", max_length=3, description="User preferred currency"
    )
    language: str = Field(
        default="en", max_length=5, description="User preferred language"
    )

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        """Validate password strength."""
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(c.islower() for c in v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        return v

    @field_validator("currency")
    @classmethod
    def validate_currency(cls, v: str) -> str:
        """Validate currency code."""
        if len(v) != 3:
            raise ValueError("Currency code must be exactly 3 characters")
        return v.upper()

    @field_validator("language")
    @classmethod
    def validate_language(cls, v: str) -> str:
        """Validate language code."""
        if len(v) != 2 and len(v) != 5:
            raise ValueError(
                "Language code must be 2 or 5 characters (e.g., 'en' or 'en-US')"
            )
        return v.lower()


class UserLogin(BaseSchema):
    """Schema for user login."""

    email: EmailStr = Field(description="User email address")
    password: str = Field(description="User password")


class UserUpdate(BaseSchema):
    """Schema for user profile updates."""

    first_name: Optional[str] = Field(
        default=None, max_length=100, description="User first name"
    )
    last_name: Optional[str] = Field(
        default=None, max_length=100, description="User last name"
    )
    phone: Optional[str] = Field(
        default=None, max_length=20, description="User phone number"
    )
    timezone: Optional[str] = Field(default=None, description="User timezone")
    currency: Optional[str] = Field(
        default=None, max_length=3, description="User preferred currency"
    )
    language: Optional[str] = Field(
        default=None, max_length=5, description="User preferred language"
    )
    theme_preference: Optional[str] = Field(
        default=None, description="User theme preference"
    )

    @field_validator("currency")
    @classmethod
    def validate_currency(cls, v: Optional[str]) -> Optional[str]:
        """Validate currency code."""
        if v is not None and len(v) != 3:
            raise ValueError("Currency code must be exactly 3 characters")
        return v.upper() if v else v

    @field_validator("language")
    @classmethod
    def validate_language(cls, v: Optional[str]) -> Optional[str]:
        """Validate language code."""
        if v is not None and len(v) != 2 and len(v) != 5:
            raise ValueError(
                "Language code must be 2 or 5 characters (e.g., 'en' or 'en-US')"
            )
        return v.lower() if v else v


class UserResponse(BaseSchema):
    """Schema for user response data."""

    id: str = Field(description="User unique identifier")
    email: EmailStr = Field(description="User email address")
    first_name: Optional[str] = Field(description="User first name")
    last_name: Optional[str] = Field(description="User last name")
    full_name: str = Field(description="User full name")
    phone: Optional[str] = Field(description="User phone number")
    timezone: str = Field(description="User timezone")
    currency: str = Field(description="User preferred currency")
    language: str = Field(description="User preferred language")
    theme_preference: str = Field(description="User theme preference")
    is_active: bool = Field(description="Whether user account is active")
    is_verified: bool = Field(description="Whether user email is verified")
    is_superuser: bool = Field(description="Whether user has superuser privileges")
    created_at: datetime = Field(description="Account creation timestamp")
    updated_at: datetime = Field(description="Last update timestamp")
    last_login_at: Optional[datetime] = Field(description="Last login timestamp")

    @field_validator("id", mode="before")
    @classmethod
    def convert_uuid_to_string(cls, v):
        """Convert UUID to string if needed."""
        if hasattr(v, "__str__"):
            return str(v)
        return v


class Token(BaseSchema):
    """Schema for authentication token response."""

    access_token: str = Field(description="JWT access token")
    refresh_token: str = Field(description="JWT refresh token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(description="Access token expiration time in seconds")
    refresh_expires_in: int = Field(
        description="Refresh token expiration time in seconds"
    )
    user: UserResponse = Field(description="User information")


class TokenData(BaseSchema):
    """Schema for token payload data."""

    user_id: Optional[str] = Field(default=None, description="User ID from token")
    email: Optional[str] = Field(default=None, description="User email from token")
    token_type: Optional[str] = Field(default=None, description="Token type")


class PasswordReset(BaseSchema):
    """Schema for password reset request."""

    email: EmailStr = Field(description="User email address")


class PasswordResetConfirm(BaseSchema):
    """Schema for password reset confirmation."""

    token: str = Field(description="Password reset token")
    new_password: str = Field(min_length=8, description="New password")

    @field_validator("new_password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        """Validate password strength."""
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(c.islower() for c in v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        return v


class EmailVerification(BaseSchema):
    """Schema for email verification."""

    token: str = Field(description="Email verification token")


class RefreshToken(BaseSchema):
    """Schema for token refresh request."""

    refresh_token: str = Field(description="JWT refresh token")
