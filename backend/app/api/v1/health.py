"""
Health check endpoints for monitoring application status.

This module provides endpoints to check the health of the application,
database connectivity, and external service dependencies.
"""

from datetime import datetime
from typing import Dict, Any

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db, check_database_connection
from app.core.logging import get_logger

router = APIRouter(prefix="/health", tags=["health"])
logger = get_logger(__name__)


@router.get("/")
async def health_check() -> Dict[str, Any]:
    """
    Basic health check endpoint.
    
    Returns:
        Application status information
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.app_version,
        "environment": settings.environment,
    }


@router.get("/detailed")
async def detailed_health_check(
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Detailed health check including database connectivity.
    
    Args:
        db: Database session dependency
        
    Returns:
        Detailed health status with database connectivity
    """
    # Check database connection
    db_healthy = await check_database_connection()
    
    # Check Redis connection (placeholder for future implementation)
    redis_healthy = True  # TODO: Implement Redis health check
    
    # Check AI service (placeholder for future implementation)
    ai_healthy = True  # TODO: Implement AI service health check
    
    overall_healthy = db_healthy and redis_healthy and ai_healthy
    
    health_status = {
        "status": "healthy" if overall_healthy else "unhealthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.app_version,
        "environment": settings.environment,
        "services": {
            "database": {
                "status": "healthy" if db_healthy else "unhealthy",
                "connected": db_healthy,
            },
            "redis": {
                "status": "healthy" if redis_healthy else "unhealthy",
                "connected": redis_healthy,
            },
            "ai_service": {
                "status": "healthy" if ai_healthy else "unhealthy",
                "connected": ai_healthy,
            },
        },
    }
    
    logger.info("Health check performed", health_status=health_status)
    return health_status


@router.get("/ready")
async def readiness_check(db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
    """
    Readiness check for Kubernetes/container orchestration.
    
    Args:
        db: Database session dependency
        
    Returns:
        Readiness status
    """
    db_ready = await check_database_connection()
    
    ready = db_ready
    
    return {
        "ready": ready,
        "timestamp": datetime.utcnow().isoformat(),
        "checks": {
            "database": db_ready,
        },
    }


@router.get("/live")
async def liveness_check() -> Dict[str, Any]:
    """
    Liveness check for Kubernetes/container orchestration.
    
    Returns:
        Liveness status
    """
    return {
        "alive": True,
        "timestamp": datetime.utcnow().isoformat(),
    } 