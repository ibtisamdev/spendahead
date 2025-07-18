"""
Security utilities for the SpendAhead backend.

This module provides security-related functionality including:
- JWT token creation and validation
- Password hashing and verification
- Authentication utilities
"""

from datetime import datetime, timedelta
from typing import Any, Dict, Optional, Union

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a JWT access token.

    Args:
        subject: The subject to encode in the token (usually user ID)
        expires_delta: Optional custom expiration time

    Returns:
        Encoded JWT token string
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.access_token_expire_minutes
        )

    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a JWT refresh token.

    Args:
        subject: The subject to encode in the token (usually user ID)
        expires_delta: Optional custom expiration time

    Returns:
        Encoded JWT refresh token string
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.refresh_token_expire_days)

    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify and decode a JWT token.

    Args:
        token: The JWT token to verify

    Returns:
        Decoded token payload if valid, None otherwise
    """
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        return payload
    except JWTError:
        return None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.

    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to check against

    Returns:
        True if password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.

    Args:
        password: The plain text password to hash

    Returns:
        Hashed password string
    """
    return pwd_context.hash(password)


def is_token_expired(token: str) -> bool:
    """
    Check if a JWT token is expired.

    Args:
        token: The JWT token to check

    Returns:
        True if token is expired, False otherwise
    """
    payload = verify_token(token)
    if not payload:
        return True

    exp = payload.get("exp")
    if not exp:
        return True

    return datetime.utcnow() > datetime.fromtimestamp(exp)


def get_token_type(token: str) -> Optional[str]:
    """
    Get the type of a JWT token (access or refresh).

    Args:
        token: The JWT token to check

    Returns:
        Token type ('access' or 'refresh') or None if invalid
    """
    payload = verify_token(token)
    if not payload:
        return None

    return payload.get("type")


def generate_password_reset_token(email: str) -> str:
    """
    Generate a password reset token.

    Args:
        email: The email address to generate token for

    Returns:
        Password reset token string
    """
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode = {"exp": expire, "sub": email, "type": "password_reset"}
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[str]:
    """
    Verify a password reset token and return the email.

    Args:
        token: The password reset token to verify

    Returns:
        Email address if token is valid, None otherwise
    """
    payload = verify_token(token)
    if not payload or payload.get("type") != "password_reset":
        return None

    return payload.get("sub") 