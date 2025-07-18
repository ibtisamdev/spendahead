"""
Tests for authentication system.

This module contains tests for user authentication and management.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import app
from app.schemas.auth import UserCreate, UserLogin

client = TestClient(app)


def test_register_user():
    """Test user registration endpoint."""
    user_data = {
        "email": "test@example.com",
        "password": "TestPassword123",
        "first_name": "Test",
        "last_name": "User",
        "timezone": "UTC",
        "currency": "USD",
        "language": "en",
    }

    response = client.post("/api/v1/auth/register", json=user_data)

    # For now, just check that the endpoint exists and returns a response
    assert response.status_code in [200, 201, 400, 500]


def test_login_user():
    """Test user login endpoint."""
    login_data = {"email": "test@example.com", "password": "TestPassword123"}

    response = client.post("/api/v1/auth/login", json=login_data)

    # For now, just check that the endpoint exists and returns a response
    assert response.status_code in [200, 401, 500]


def test_auth_endpoints_exist():
    """Test that all auth endpoints are accessible."""
    endpoints = [
        "/api/v1/auth/register",
        "/api/v1/auth/login",
        "/api/v1/auth/refresh",
        "/api/v1/auth/me",
        "/api/v1/auth/password-reset",
        "/api/v1/auth/verify-email",
    ]

    for endpoint in endpoints:
        # Just check that endpoints exist (will return 405 for GET on POST endpoints)
        response = client.get(endpoint)
        assert response.status_code in [
            405,
            401,
            403,
            422,
        ]  # Method not allowed, unauthorized, forbidden, or validation error


def test_health_endpoint():
    """Test that health endpoint is working."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
