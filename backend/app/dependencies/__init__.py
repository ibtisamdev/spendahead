"""
FastAPI dependencies for the SpendAhead backend.

This package contains all FastAPI dependencies used throughout the application.
"""

from .auth import get_current_user, get_current_active_user, get_current_superuser

__all__ = [
    "get_current_user",
    "get_current_active_user",
    "get_current_superuser",
]
