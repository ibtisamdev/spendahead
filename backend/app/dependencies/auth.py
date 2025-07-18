"""
Authentication dependencies for the SpendAhead backend.

This module provides FastAPI dependencies for authentication and authorization.
"""

from typing import Annotated, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.database import get_db
from app.core.logging import get_logger
from app.core.security import verify_token
from app.models.user import User
from app.schemas.auth import TokenData

logger = get_logger(__name__)

# Security scheme for JWT tokens
security = HTTPBearer()


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db=Depends(get_db),
) -> User:
    """
    Get the current authenticated user from JWT token.

    Args:
        credentials: HTTP authorization credentials containing the JWT token
        db: Database session dependency

    Returns:
        Current authenticated user

    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Verify and decode the token
        payload = verify_token(credentials.credentials)
        if payload is None:
            raise credentials_exception

        # Check token type
        token_type = payload.get("type")
        if token_type != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Extract user ID from token
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        # Get user from database
        user = await db.get(User, user_id)
        if user is None:
            raise credentials_exception

        return user

    except Exception as e:
        logger.error(f"Authentication error: {e}")
        raise credentials_exception


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    """
    Get the current active user.

    Args:
        current_user: Current user from get_current_user dependency

    Returns:
        Current active user

    Raises:
        HTTPException: If user is inactive
    """
    if not getattr(current_user, "is_active", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user",
        )
    return current_user


async def get_current_verified_user(
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> User:
    """
    Get the current verified user.

    Args:
        current_user: Current active user from get_current_active_user dependency

    Returns:
        Current verified user

    Raises:
        HTTPException: If user is not verified
    """
    if not getattr(current_user, "is_verified", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified",
        )
    return current_user


async def get_current_superuser(
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> User:
    """
    Get the current superuser.

    Args:
        current_user: Current active user from get_current_active_user dependency

    Returns:
        Current superuser

    Raises:
        HTTPException: If user is not a superuser
    """
    if not getattr(current_user, "is_superuser", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    return current_user


def get_token_data(token: str) -> Optional[TokenData]:
    """
    Extract token data from JWT token.

    Args:
        token: JWT token string

    Returns:
        TokenData object if valid, None otherwise
    """
    payload = verify_token(token)
    if payload is None:
        return None

    return TokenData(
        user_id=payload.get("sub"),
        email=payload.get("email"),
        token_type=payload.get("type"),
    )
