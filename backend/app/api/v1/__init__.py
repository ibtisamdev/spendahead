"""
API v1 endpoints for the SpendAhead backend.

This package contains versioned API endpoints for:
- Authentication and user management
- Financial transactions
- Categories and budgets
- AI insights and analytics
"""

from . import auth, health

__all__ = ["auth", "health"]
