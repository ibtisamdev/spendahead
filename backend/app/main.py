"""
Main FastAPI application for the SpendAhead backend.

This module creates and configures the FastAPI application with all
necessary middleware, CORS settings, and route registration.
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.api.v1 import health
from app.core.config import settings
from app.core.database import create_tables
from app.core.logging import get_logger, setup_logging

# Import models to ensure they're registered with SQLAlchemy

# Setup logging
setup_logging()
logger = get_logger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager.

    Handles startup and shutdown events for the FastAPI application.
    """
    # Startup
    logger.info("Starting SpendAhead backend application")

    # Create database tables
    try:
        await create_tables()
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.warning(f"Database tables creation failed: {e}")
        logger.info(
            "Continuing without database tables - you can create them manually later"
        )

    logger.info("SpendAhead backend application started successfully")

    yield

    # Shutdown
    logger.info("Shutting down SpendAhead backend application")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI-powered personal finance tracker backend API",
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
    openapi_url="/openapi.json" if settings.debug else None,
    lifespan=lifespan,
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=settings.allowed_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if settings.is_production:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["*"],  # Configure with actual allowed hosts
    )


@app.middleware("http")
async def log_requests(request: Request, call_next) -> Response:
    """
    Middleware to log all HTTP requests.

    Args:
        request: Incoming HTTP request
        call_next: Next middleware or endpoint

    Returns:
        HTTP response
    """
    start_time = request.state.start_time = request.scope.get("start_time")

    response = await call_next(request)

    # Log request information
    process_time = request.scope.get("process_time", 0)
    logger.info(
        "Request processed",
        method=request.method,
        url=str(request.url),
        status_code=response.status_code,
        process_time=process_time,
        client_ip=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )

    return response


@app.middleware("http")
async def add_process_time_header(request: Request, call_next) -> Response:
    """
    Middleware to add process time header to responses.

    Args:
        request: Incoming HTTP request
        call_next: Next middleware or endpoint

    Returns:
        HTTP response with process time header
    """
    import time

    start_time = time.time()
    request.scope["start_time"] = start_time

    response = await call_next(request)

    process_time = time.time() - start_time
    request.scope["process_time"] = process_time
    response.headers["X-Process-Time"] = str(process_time)

    return response


# Include API routes
app.include_router(health.router, prefix="/api/v1")


@app.get("/")
async def root() -> dict:
    """
    Root endpoint.

    Returns:
        Basic application information
    """
    return {
        "message": "Welcome to SpendAhead Backend",
        "version": settings.app_version,
        "environment": settings.environment,
        "docs": "/docs" if settings.debug else "Documentation disabled in production",
    }


@app.get("/api")
async def api_info() -> dict:
    """
    API information endpoint.

    Returns:
        API version and available endpoints
    """
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "endpoints": {
            "health": "/api/v1/health",
            "docs": "/docs" if settings.debug else None,
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        log_level=settings.log_level.lower(),
    )
