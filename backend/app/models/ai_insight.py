"""
AI Insight model for the SpendAhead backend.

This module defines the AIInsight model for storing AI-generated financial insights,
recommendations, and analysis results.
"""

from decimal import Decimal
from typing import Optional

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    String,
    Text,
    ForeignKey,
    Numeric,
    Integer,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class AIInsight(Base):
    """AI Insight model for AI-generated financial insights."""

    __tablename__ = "ai_insights"

    # Primary key
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )

    # User relationship
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Insight details
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    insight_type = Column(
        String(50), nullable=False
    )  # spending_pattern, budget_optimization, savings_opportunity, etc.
    category = Column(
        String(50), nullable=False
    )  # warning, recommendation, analysis, alert

    # Insight content
    content = Column(JSONB, nullable=False)  # Structured insight data
    summary = Column(Text, nullable=True)  # Human-readable summary

    # AI processing data
    ai_model_used = Column(String(50), nullable=True)  # gpt-4, gpt-3.5-turbo, etc.
    ai_confidence_score = Column(Numeric(3, 2), nullable=True)  # 0.00 to 1.00
    ai_processing_time = Column(
        Integer, nullable=True
    )  # Processing time in milliseconds
    ai_tokens_used = Column(Integer, nullable=True)  # Number of tokens used

    # Insight metadata
    data_period_start = Column(DateTime(timezone=True), nullable=True)
    data_period_end = Column(DateTime(timezone=True), nullable=True)
    affected_categories = Column(JSONB, nullable=True)  # Array of category IDs
    affected_accounts = Column(JSONB, nullable=True)  # Array of account IDs

    # Financial impact
    potential_savings = Column(Numeric(10, 2), nullable=True)
    impact_score = Column(Integer, nullable=True)  # 1-10 scale of potential impact

    # User interaction
    is_read = Column(Boolean, default=False, nullable=False)
    is_actioned = Column(Boolean, default=False, nullable=False)
    action_taken = Column(String(100), nullable=True)  # What action user took
    user_feedback = Column(String(20), nullable=True)  # helpful, not_helpful, neutral

    # Insight status
    is_active = Column(Boolean, default=True, nullable=False)
    priority = Column(
        String(20), default="medium", nullable=False
    )  # low, medium, high, critical

    # Scheduling and delivery
    scheduled_for = Column(
        DateTime(timezone=True), nullable=True
    )  # When to show this insight
    expires_at = Column(
        DateTime(timezone=True), nullable=True
    )  # When insight becomes irrelevant

    # Timestamps
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Soft delete
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="ai_insights")

    def __repr__(self) -> str:
        """String representation of the AIInsight model."""
        return f"<AIInsight(id={self.id}, title='{self.title}', type='{self.insight_type}')>"

    @property
    def is_warning(self) -> bool:
        """Check if insight is a warning."""
        return getattr(self, "category", "") == "warning"

    @property
    def is_recommendation(self) -> bool:
        """Check if insight is a recommendation."""
        return getattr(self, "category", "") == "recommendation"

    @property
    def is_analysis(self) -> bool:
        """Check if insight is an analysis."""
        return getattr(self, "category", "") == "analysis"

    @property
    def is_alert(self) -> bool:
        """Check if insight is an alert."""
        return getattr(self, "category", "") == "alert"

    def get_confidence_level(self) -> str:
        """Get AI confidence level as string."""
        confidence = getattr(self, "ai_confidence_score", None)
        if confidence is None:
            return "unknown"
        elif confidence >= Decimal("0.9"):
            return "high"
        elif confidence >= Decimal("0.7"):
            return "medium"
        else:
            return "low"

    def get_priority_level(self) -> str:
        """Get priority level."""
        return getattr(self, "priority", "medium")

    def is_expired(self) -> bool:
        """Check if insight has expired."""
        expires_at = getattr(self, "expires_at", None)
        if expires_at is None:
            return False
        from datetime import datetime, timezone

        return datetime.now(timezone.utc) > expires_at

    def is_scheduled(self) -> bool:
        """Check if insight is scheduled for future delivery."""
        scheduled_for = getattr(self, "scheduled_for", None)
        if scheduled_for is None:
            return False
        from datetime import datetime, timezone

        return datetime.now(timezone.utc) < scheduled_for

    def mark_as_read(self) -> None:
        """Mark insight as read."""
        setattr(self, "is_read", True)

    def mark_as_actioned(self, action: str) -> None:
        """Mark insight as actioned with specific action."""
        setattr(self, "is_actioned", True)
        setattr(self, "action_taken", action)

    def provide_feedback(self, feedback: str) -> None:
        """Provide user feedback on the insight."""
        valid_feedback = ["helpful", "not_helpful", "neutral"]
        if feedback in valid_feedback:
            setattr(self, "user_feedback", feedback)
