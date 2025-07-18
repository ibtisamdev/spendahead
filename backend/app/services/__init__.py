"""
Services for the SpendAhead backend.

This package contains business logic services for authentication and other features.
"""

from .auth import AuthService

__all__ = [
    "AuthService",
]
