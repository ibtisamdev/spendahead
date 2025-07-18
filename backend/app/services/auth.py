"""
Authentication service for the SpendAhead backend.

This module provides business logic for user authentication and management.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import get_logger
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
    generate_password_reset_token,
    verify_password_reset_token,
)
from app.models.user import User
from app.schemas.auth import (
    UserCreate,
    UserLogin,
    UserUpdate,
    UserResponse,
    Token,
    PasswordReset,
    PasswordResetConfirm,
    EmailVerification,
)

logger = get_logger(__name__)


class AuthService:
    """Service for handling authentication and user management."""

    def __init__(self, db: AsyncSession):
        """Initialize the auth service with a database session."""
        self.db = db

    async def register_user(self, user_data: UserCreate) -> User:
        """
        Register a new user.

        Args:
            user_data: User registration data

        Returns:
            Created user object

        Raises:
            ValueError: If email already exists
        """
        # Check if user already exists
        existing_user = await self._get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("Email already registered")

        # Create new user
        hashed_password = get_password_hash(user_data.password)

        user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            phone=user_data.phone,
            timezone=user_data.timezone,
            currency=user_data.currency,
            language=user_data.language,
        )

        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"New user registered: {user.email}")
        return user

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate a user with email and password.

        Args:
            email: User email
            password: User password

        Returns:
            User object if authentication successful, None otherwise
        """
        user = await self._get_user_by_email(email)
        if not user:
            return None

        if not user.hashed_password:
            return None

        if not verify_password(password, user.hashed_password):
            return None

        # Check if user is active
        if not user.is_active:
            return None

        return user

    async def login_user(self, user: User) -> Token:
        """
        Log in a user and generate tokens.

        Args:
            user: User object to log in

        Returns:
            Token object with access and refresh tokens
        """
        # Update last login time
        user.last_login_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(user)

        # Generate tokens
        access_token = create_access_token(subject=str(user.id))
        refresh_token = create_refresh_token(subject=str(user.id))

        # Calculate expiration times
        access_expires_in = 30 * 60  # 30 minutes in seconds
        refresh_expires_in = 7 * 24 * 60 * 60  # 7 days in seconds

        logger.info(f"User logged in: {user.email}")

        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=access_expires_in,
            refresh_expires_in=refresh_expires_in,
            user=UserResponse.model_validate(user),
        )

    async def refresh_token(self, refresh_token: str) -> Optional[Token]:
        """
        Refresh an access token using a refresh token.

        Args:
            refresh_token: JWT refresh token

        Returns:
            New token object if refresh successful, None otherwise
        """
        from app.core.security import verify_token

        # Verify refresh token
        payload = verify_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            return None

        user_id = payload.get("sub")
        if not user_id:
            return None

        # Get user
        user = await self.db.get(User, user_id)
        if not user:
            return None

        # Check if user is active
        if not user.is_active:
            return None

        # Generate new tokens
        access_token = create_access_token(subject=str(user.id))
        new_refresh_token = create_refresh_token(subject=str(user.id))

        # Calculate expiration times
        access_expires_in = 30 * 60  # 30 minutes in seconds
        refresh_expires_in = 7 * 24 * 60 * 60  # 7 days in seconds

        logger.info(f"Token refreshed for user: {user.email}")

        return Token(
            access_token=access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
            expires_in=access_expires_in,
            refresh_expires_in=refresh_expires_in,
            user=UserResponse.model_validate(user),
        )

    async def get_user_by_id(self, user_id: str) -> Optional[User]:
        """
        Get user by ID.

        Args:
            user_id: User ID

        Returns:
            User object if found, None otherwise
        """
        try:
            user_uuid = UUID(user_id)
            return await self.db.get(User, user_uuid)
        except ValueError:
            return None

    async def update_user(self, user: User, user_data: UserUpdate) -> User:
        """
        Update user profile.

        Args:
            user: User object to update
            data: User update data

        Returns:
            Updated user object
        """
        update_data = user_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            if hasattr(user, field):
                setattr(user, field, value)

        # Update timestamp
        user.updated_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"User profile updated: {user.email}")
        return user

    async def change_password(
        self, user: User, current_password: str, new_password: str
    ) -> bool:
        """
        Change user password.

        Args:
            user: User object
            current_password: Current password
            new_password: New password

        Returns:
            True if password changed successfully, False otherwise
        """
        # Verify current password
        if not verify_password(current_password, user.hashed_password):
            return False

        # Hash new password
        user.hashed_password = get_password_hash(new_password)
        user.updated_at = datetime.now(timezone.utc)

        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"Password changed for user: {user.email}")
        return True

    async def request_password_reset(self, email: str) -> bool:
        """
        Request password reset for a user.

        Args:
            email: User email

        Returns:
            True if reset email sent, False if user not found
        """
        user = await self._get_user_by_email(email)
        if not user:
            return False

        # Generate reset token
        reset_token = generate_password_reset_token(email)

        # TODO: Send email with reset token
        # For now, just log the token (in production, send email)
        logger.info(f"Password reset requested for {email}. Token: {reset_token}")

        return True

    async def reset_password(self, token: str, new_password: str) -> bool:
        """
        Reset password using reset token.

        Args:
            token: Password reset token
            new_password: New password

        Returns:
            True if password reset successful, False otherwise
        """
        # Verify reset token
        email = verify_password_reset_token(token)
        if not email:
            return False

        # Get user
        user = await self._get_user_by_email(email)
        if not user:
            return False

        # Update password
        user.hashed_password = get_password_hash(new_password)
        user.updated_at = datetime.now(timezone.utc)

        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"Password reset for user: {user.email}")
        return True

    async def verify_email(self, token: str) -> bool:
        """
        Verify user email using verification token.

        Args:
            token: Email verification token

        Returns:
            True if email verified successfully, False otherwise
        """
        from app.core.security import verify_token

        # Verify token
        payload = verify_token(token)
        if not payload or payload.get("type") != "email_verification":
            return False

        user_id = payload.get("sub")
        if not user_id:
            return False

        # Get user
        user = await self.get_user_by_id(user_id)
        if not user:
            return False

        # Mark email as verified
        user.is_verified = True
        user.updated_at = datetime.now(timezone.utc)

        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"Email verified for user: {user.email}")
        return True

    async def send_verification_email(self, user: User) -> bool:
        """
        Send email verification to user.

        Args:
            user: User object

        Returns:
            True if verification email sent, False otherwise
        """
        if user.is_verified:
            return False

        # Generate verification token
        verification_token = create_access_token(
            subject=str(user.id), expires_delta=timedelta(hours=24)
        )

        # TODO: Send email with verification token
        # For now, just log the token (in production, send email)
        logger.info(
            f"Verification email requested for {user.email}. Token: {verification_token}"
        )

        return True

    async def _get_user_by_email(self, email: str) -> Optional[User]:
        """
        Get user by email address.

        Args:
            email: User email

        Returns:
            User object if found, None otherwise
        """
        result = await self.db.execute(
            select(User).where(User.email == email, User.is_deleted == False)
        )
        return result.scalar_one_or_none()

    async def delete_user(self, user: User) -> bool:
        """
        Soft delete a user.

        Args:
            user: User object to delete

        Returns:
            True if user deleted successfully, False otherwise
        """
        user.is_deleted = True
        user.deleted_at = datetime.now(timezone.utc)
        user.is_active = False

        await self.db.commit()
        await self.db.refresh(user)

        logger.info(f"User deleted: {user.email}")
        return True
