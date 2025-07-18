"""
Authentication API endpoints for the SpendAhead backend.

This module provides REST API endpoints for user authentication and management.
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.logging import get_logger
from app.dependencies.auth import get_current_active_user
from app.models.user import User
from app.schemas.auth import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
    Token,
    PasswordReset,
    PasswordResetConfirm,
    EmailVerification,
    RefreshToken,
)
from app.schemas.base import SuccessResponse, ErrorResponse
from app.services.auth import AuthService

logger = get_logger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=SuccessResponse)
async def register_user(
    user_data: UserCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Register a new user.

    Args:
        user_data: User registration data
        db: Database session

    Returns:
        Success response with user information

    Raises:
        HTTPException: If registration fails
    """
    try:
        auth_service = AuthService(db)
        user = await auth_service.register_user(user_data)

        # Send verification email
        await auth_service.send_verification_email(user)

        return SuccessResponse(
            message="User registered successfully. Please check your email for verification.",
            data={"user": UserResponse.model_validate(user)},
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"User registration failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed. Please try again.",
        )


@router.post("/login", response_model=Token)
async def login_user(
    user_data: UserLogin,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Token:
    """
    Log in a user.

    Args:
        user_data: User login credentials
        db: Database session

    Returns:
        Token object with access and refresh tokens

    Raises:
        HTTPException: If login fails
    """
    try:
        auth_service = AuthService(db)
        user = await auth_service.authenticate_user(user_data.email, user_data.password)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return await auth_service.login_user(user)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"User login failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed. Please try again.",
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_data: RefreshToken,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Token:
    """
    Refresh access token using refresh token.

    Args:
        refresh_data: Refresh token data
        db: Database session

    Returns:
        New token object

    Raises:
        HTTPException: If token refresh fails
    """
    try:
        auth_service = AuthService(db)
        token = await auth_service.refresh_token(refresh_data.refresh_token)

        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return token
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token refresh failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed. Please try again.",
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> UserResponse:
    """
    Get current user profile.

    Args:
        current_user: Current authenticated user

    Returns:
        Current user profile information
    """
    return UserResponse.model_validate(current_user)


@router.put("/me", response_model=UserResponse)
async def update_user_profile(
    user_data: UserUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> UserResponse:
    """
    Update current user profile.

    Args:
        user_data: User update data
        current_user: Current authenticated user
        db: Database session

    Returns:
        Updated user profile information

    Raises:
        HTTPException: If update fails
    """
    try:
        auth_service = AuthService(db)
        updated_user = await auth_service.update_user(current_user, user_data)
        return UserResponse.model_validate(updated_user)
    except Exception as e:
        logger.error(f"User profile update failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Profile update failed. Please try again.",
        )


@router.post("/password-reset", response_model=SuccessResponse)
async def request_password_reset(
    reset_data: PasswordReset,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Request password reset.

    Args:
        reset_data: Password reset request data
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException: If request fails
    """
    try:
        auth_service = AuthService(db)
        success = await auth_service.request_password_reset(reset_data.email)

        if not success:
            # Don't reveal if email exists or not for security
            pass

        return SuccessResponse(
            message="If the email exists, a password reset link has been sent.",
        )
    except Exception as e:
        logger.error(f"Password reset request failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Password reset request failed. Please try again.",
        )


@router.post("/password-reset/confirm", response_model=SuccessResponse)
async def confirm_password_reset(
    reset_data: PasswordResetConfirm,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Confirm password reset.

    Args:
        reset_data: Password reset confirmation data
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException: If reset fails
    """
    try:
        auth_service = AuthService(db)
        success = await auth_service.reset_password(
            reset_data.token, reset_data.new_password
        )

        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token",
            )

        return SuccessResponse(
            message="Password reset successfully. You can now log in with your new password.",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Password reset confirmation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Password reset failed. Please try again.",
        )


@router.post("/verify-email", response_model=SuccessResponse)
async def verify_email(
    verification_data: EmailVerification,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Verify user email.

    Args:
        verification_data: Email verification data
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException: If verification fails
    """
    try:
        auth_service = AuthService(db)
        success = await auth_service.verify_email(verification_data.token)

        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired verification token",
            )

        return SuccessResponse(
            message="Email verified successfully.",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Email verification failed. Please try again.",
        )


@router.post("/resend-verification", response_model=SuccessResponse)
async def resend_verification_email(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Resend email verification.

    Args:
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException: If resend fails
    """
    try:
        auth_service = AuthService(db)
        success = await auth_service.send_verification_email(current_user)

        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified or resend failed",
            )

        return SuccessResponse(
            message="Verification email sent successfully. Please check your inbox.",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Verification email resend failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to resend verification email. Please try again.",
        )


@router.delete("/me", response_model=SuccessResponse)
async def delete_user_account(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SuccessResponse:
    """
    Delete current user account.

    Args:
        current_user: Current authenticated user
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException: If deletion fails
    """
    try:
        auth_service = AuthService(db)
        success = await auth_service.delete_user(current_user)

        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete account",
            )

        return SuccessResponse(
            message="Account deleted successfully.",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Account deletion failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete account. Please try again.",
        )
