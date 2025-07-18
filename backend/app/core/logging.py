"""
Logging configuration for the SpendAhead backend.

This module provides structured logging setup with different
formatters and handlers for development and production environments.
"""

import logging
import sys
from typing import Any, Dict, Optional

import structlog
from structlog.stdlib import LoggerFactory

from app.core.config import settings


def setup_logging() -> None:
    """Setup structured logging configuration."""
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer() if settings.log_format == "json" else structlog.dev.ConsoleRenderer(),
        ],
        context_class=dict,
        logger_factory=LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, settings.log_level.upper()),
    )

    # Set specific logger levels
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.INFO)
    logging.getLogger("sqlalchemy.engine").setLevel(
        logging.DEBUG if settings.debug else logging.WARNING
    )


def get_logger(name: str) -> structlog.stdlib.BoundLogger:
    """
    Get a structured logger instance.

    Args:
        name: Logger name (usually __name__)

    Returns:
        Configured structured logger
    """
    return structlog.get_logger(name)


def log_request_info(logger: structlog.stdlib.BoundLogger, **kwargs: Any) -> None:
    """
    Log request information in a structured way.

    Args:
        logger: Structured logger instance
        **kwargs: Request information to log
    """
    logger.info("Request processed", **kwargs)


def log_error(
    logger: structlog.stdlib.BoundLogger,
    error: Exception,
    context: Optional[Dict[str, Any]] = None,
) -> None:
    """
    Log error information in a structured way.

    Args:
        logger: Structured logger instance
        error: Exception that occurred
        context: Additional context information
    """
    error_context = context or {}
    error_context.update(
        {
            "error_type": type(error).__name__,
            "error_message": str(error),
        }
    )
    logger.error("Error occurred", **error_context, exc_info=True) 