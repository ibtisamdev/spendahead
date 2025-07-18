"""
Base Pydantic schema for the SpendAhead backend.

This module provides the base schema class with common configuration.
"""

from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, ConfigDict, Field


class BaseSchema(BaseModel):
    """Base schema with common configuration."""

    model_config = ConfigDict(
        from_attributes=True,
        json_encoders={
            datetime: lambda v: v.isoformat() if v else None,
        },
        validate_assignment=True,
        extra="forbid",
    )


class PaginationParams(BaseSchema):
    """Pagination parameters for list endpoints."""

    page: int = Field(default=1, ge=1, description="Page number")
    size: int = Field(default=20, ge=1, le=100, description="Page size")
    skip: Optional[int] = Field(default=None, description="Number of items to skip")


class PaginatedResponse(BaseSchema):
    """Paginated response wrapper."""

    items: list[Any] = Field(description="List of items")
    total: int = Field(description="Total number of items")
    page: int = Field(description="Current page number")
    size: int = Field(description="Page size")
    pages: int = Field(description="Total number of pages")


class ErrorResponse(BaseSchema):
    """Standard error response format."""

    detail: str = Field(description="Error message")
    error_code: Optional[str] = Field(default=None, description="Error code")
    timestamp: datetime = Field(
        default_factory=datetime.utcnow, description="Error timestamp"
    )


class SuccessResponse(BaseSchema):
    """Standard success response format."""

    message: str = Field(description="Success message")
    data: Optional[Dict[str, Any]] = Field(default=None, description="Response data")
    timestamp: datetime = Field(
        default_factory=datetime.utcnow, description="Response timestamp"
    )
