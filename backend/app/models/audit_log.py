"""
Audit Log model for the SpendAhead backend.

This module defines the AuditLog model for tracking all financial changes,
user actions, and system events for compliance and debugging purposes.
"""

from typing import Optional

from sqlalchemy import Column, DateTime, String, Text, ForeignKey, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class AuditLog(Base):
    """Audit Log model for tracking financial changes and user actions."""

    __tablename__ = "audit_logs"

    # Primary key
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )

    # User relationship (who performed the action)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Action details
    action = Column(String(100), nullable=False)  # create, update, delete, login, etc.
    entity_type = Column(
        String(50), nullable=False
    )  # user, transaction, category, budget, etc.
    entity_id = Column(UUID(as_uuid=True), nullable=True)  # ID of the affected entity

    # Change tracking
    old_values = Column(JSONB, nullable=True)  # Previous values
    new_values = Column(JSONB, nullable=True)  # New values
    changed_fields = Column(JSONB, nullable=True)  # Array of field names that changed

    # Context information
    ip_address = Column(String(45), nullable=True)  # IPv4 or IPv6
    user_agent = Column(Text, nullable=True)  # Browser/client information
    session_id = Column(String(255), nullable=True)  # Session identifier

    # Additional metadata
    description = Column(Text, nullable=True)  # Human-readable description
    audit_metadata = Column(JSONB, nullable=True)  # Additional context data

    # Severity and classification
    severity = Column(
        String(20), default="info", nullable=False
    )  # info, warning, error, critical
    is_sensitive = Column(
        Boolean, default=False, nullable=False
    )  # Contains sensitive financial data

    # Timestamps
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False, index=True
    )

    # Relationships
    user = relationship("User")

    def __repr__(self) -> str:
        """String representation of the AuditLog model."""
        return f"<AuditLog(id={self.id}, action='{self.action}', entity='{self.entity_type}')>"

    @property
    def is_high_severity(self) -> bool:
        """Check if log entry is high severity."""
        severity = getattr(self, "severity", "info")
        return severity in ["error", "critical"]

    @property
    def is_sensitive_data(self) -> bool:
        """Check if log contains sensitive data."""
        return getattr(self, "is_sensitive", False)

    def get_changed_fields_list(self) -> list[str]:
        """Get list of changed field names."""
        changed_fields = getattr(self, "changed_fields", None)
        if changed_fields and isinstance(changed_fields, list):
            return changed_fields
        return []

    def get_old_value(self, field_name: str) -> Optional[object]:
        """Get old value for a specific field."""
        old_values = getattr(self, "old_values", None)
        if old_values and isinstance(old_values, dict):
            return old_values.get(field_name)
        return None

    def get_new_value(self, field_name: str) -> Optional[object]:
        """Get new value for a specific field."""
        new_values = getattr(self, "new_values", None)
        if new_values and isinstance(new_values, dict):
            return new_values.get(field_name)
        return None

    def has_field_changed(self, field_name: str) -> bool:
        """Check if a specific field has changed."""
        return field_name in self.get_changed_fields_list()

    def get_summary(self) -> str:
        """Get a human-readable summary of the audit log entry."""
        action = getattr(self, "action", "")
        entity_type = getattr(self, "entity_type", "")
        description = getattr(self, "description", "")

        if description:
            return description

        return f"{action.title()} {entity_type}"

    def sanitize_sensitive_data(self) -> None:
        """Remove sensitive data from the audit log entry."""
        if self.is_sensitive_data:
            # Remove sensitive fields from old_values and new_values
            sensitive_fields = [
                "hashed_password",
                "account_number",
                "routing_number",
                "amount",
            ]

            old_values = getattr(self, "old_values", {})
            if old_values and isinstance(old_values, dict):
                for field in sensitive_fields:
                    if field in old_values:
                        old_values[field] = "[REDACTED]"
                setattr(self, "old_values", old_values)

            new_values = getattr(self, "new_values", {})
            if new_values and isinstance(new_values, dict):
                for field in sensitive_fields:
                    if field in new_values:
                        new_values[field] = "[REDACTED]"
                setattr(self, "new_values", new_values)
