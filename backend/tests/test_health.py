"""
Tests for health check endpoints.

This module contains tests for the health check API endpoints
to ensure the application is running correctly.
"""

import pytest
from fastapi.testclient import TestClient


@pytest.mark.api
class TestHealthEndpoints:
    """Test health check endpoints."""

    def test_health_check(self, client: TestClient):
        """Test basic health check endpoint."""
        response = client.get("/health")
        assert response.status_code == 200

        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "version" in data
        assert "environment" in data

    def test_detailed_health_check(self, client: TestClient):
        """Test detailed health check endpoint."""
        response = client.get("/health/detailed")
        assert response.status_code == 200

        data = response.json()
        assert "status" in data
        assert "timestamp" in data
        assert "version" in data
        assert "environment" in data
        assert "services" in data

        services = data["services"]
        assert "database" in services
        assert "redis" in services
        assert "ai_service" in services

    def test_readiness_check(self, client: TestClient):
        """Test readiness check endpoint."""
        response = client.get("/health/ready")
        assert response.status_code == 200

        data = response.json()
        assert "ready" in data
        assert "timestamp" in data
        assert "checks" in data

    def test_liveness_check(self, client: TestClient):
        """Test liveness check endpoint."""
        response = client.get("/health/live")
        assert response.status_code == 200

        data = response.json()
        assert data["alive"] is True
        assert "timestamp" in data


@pytest.mark.api
class TestRootEndpoints:
    """Test root endpoints."""

    def test_root_endpoint(self, client: TestClient):
        """Test root endpoint."""
        response = client.get("/")
        assert response.status_code == 200

        data = response.json()
        assert "message" in data
        assert "version" in data
        assert "environment" in data

    def test_api_info_endpoint(self, client: TestClient):
        """Test API info endpoint."""
        response = client.get("/api")
        assert response.status_code == 200

        data = response.json()
        assert "name" in data
        assert "version" in data
        assert "environment" in data
        assert "endpoints" in data

        endpoints = data["endpoints"]
        assert "health" in endpoints
