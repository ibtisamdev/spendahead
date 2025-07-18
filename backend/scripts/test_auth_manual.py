#!/usr/bin/env python3
"""
Manual test script for the authentication system.

This script demonstrates how to use the authentication API endpoints.
"""

import asyncio
import json
import sys
from typing import Dict, Any

import httpx

# Configuration
BASE_URL = "http://localhost:8000"
API_BASE = f"{BASE_URL}/api/v1"


async def make_request(
    method: str,
    endpoint: str,
    data: Dict[str, Any] | None = None,
    token: str | None = None,
) -> Dict[str, Any]:
    """Make an HTTP request to the API."""
    url = f"{API_BASE}{endpoint}"
    headers = {"Content-Type": "application/json"}

    if token:
        headers["Authorization"] = f"Bearer {token}"

    async with httpx.AsyncClient() as client:
        if method.upper() == "GET":
            response = await client.get(url, headers=headers)
        elif method.upper() == "POST":
            response = await client.post(url, json=data, headers=headers)
        elif method.upper() == "PUT":
            response = await client.put(url, json=data, headers=headers)
        elif method.upper() == "DELETE":
            response = await client.delete(url, headers=headers)
        else:
            raise ValueError(f"Unsupported method: {method}")

    return {
        "status_code": response.status_code,
        "data": response.json() if response.content else None,
        "headers": dict(response.headers),
    }


async def test_health():
    """Test the health endpoint."""
    print("🔍 Testing health endpoint...")
    result = await make_request("GET", "/health")
    print(f"Status: {result['status_code']}")
    print(f"Response: {json.dumps(result['data'], indent=2)}")
    print()


async def test_register():
    """Test user registration."""
    print("📝 Testing user registration...")

    user_data = {
        "email": "test@example.com",
        "password": "TestPassword123",
        "first_name": "Test",
        "last_name": "User",
        "timezone": "UTC",
        "currency": "USD",
        "language": "en",
    }

    result = await make_request("POST", "/auth/register", user_data)
    print(f"Status: {result['status_code']}")
    print(f"Response: {json.dumps(result['data'], indent=2)}")
    print()

    return result


async def test_login():
    """Test user login."""
    print("🔑 Testing user login...")

    login_data = {"email": "test@example.com", "password": "TestPassword123"}

    result = await make_request("POST", "/auth/login", login_data)
    print(f"Status: {result['status_code']}")

    if result["status_code"] == 200:
        print("✅ Login successful!")
        print(f"Access Token: {result['data']['access_token'][:50]}...")
        print(f"Refresh Token: {result['data']['refresh_token'][:50]}...")
        print(f"User: {result['data']['user']['email']}")
        return result["data"]["access_token"], result["data"]["refresh_token"]
    else:
        print(f"❌ Login failed: {result['data']}")
        return None, None
    print()


async def test_get_profile(token: str):
    """Test getting user profile."""
    print("👤 Testing get profile...")

    result = await make_request("GET", "/auth/me", token=token)
    print(f"Status: {result['status_code']}")

    if result["status_code"] == 200:
        print("✅ Profile retrieved successfully!")
        print(f"User: {result['data']['email']}")
        print(f"Name: {result['data']['full_name']}")
        print(f"Verified: {result['data']['is_verified']}")
    else:
        print(f"❌ Failed to get profile: {result['data']}")
    print()


async def test_update_profile(token: str):
    """Test updating user profile."""
    print("✏️ Testing profile update...")

    update_data = {
        "first_name": "Updated",
        "last_name": "Name",
        "timezone": "America/New_York",
        "currency": "EUR",
    }

    result = await make_request("PUT", "/auth/me", update_data, token)
    print(f"Status: {result['status_code']}")

    if result["status_code"] == 200:
        print("✅ Profile updated successfully!")
        print(f"New name: {result['data']['full_name']}")
        print(f"New timezone: {result['data']['timezone']}")
        print(f"New currency: {result['data']['currency']}")
    else:
        print(f"❌ Failed to update profile: {result['data']}")
    print()


async def test_refresh_token(refresh_token: str):
    """Test token refresh."""
    print("🔄 Testing token refresh...")

    refresh_data = {"refresh_token": refresh_token}
    result = await make_request("POST", "/auth/refresh", refresh_data)
    print(f"Status: {result['status_code']}")

    if result["status_code"] == 200:
        print("✅ Token refreshed successfully!")
        print(f"New Access Token: {result['data']['access_token'][:50]}...")
        return result["data"]["access_token"]
    else:
        print(f"❌ Failed to refresh token: {result['data']}")
        return None
    print()


async def test_password_reset():
    """Test password reset request."""
    print("🔐 Testing password reset request...")

    reset_data = {"email": "test@example.com"}
    result = await make_request("POST", "/auth/password-reset", reset_data)
    print(f"Status: {result['status_code']}")
    print(f"Response: {json.dumps(result['data'], indent=2)}")
    print()


async def test_resend_verification(token: str):
    """Test resending verification email."""
    print("📧 Testing resend verification...")

    result = await make_request("POST", "/auth/resend-verification", token=token)
    print(f"Status: {result['status_code']}")
    print(f"Response: {json.dumps(result['data'], indent=2)}")
    print()


async def test_delete_account(token: str):
    """Test account deletion."""
    print("🗑️ Testing account deletion...")

    result = await make_request("DELETE", "/auth/me", token=token)
    print(f"Status: {result['status_code']}")
    print(f"Response: {json.dumps(result['data'], indent=2)}")
    print()


async def main():
    """Run all authentication tests."""
    print("🚀 Starting Authentication System Manual Tests")
    print("=" * 50)

    try:
        # Test health endpoint
        await test_health()

        # Test registration
        await test_register()

        # Test login
        access_token, refresh_token = await test_login()

        if access_token and refresh_token:
            # Test get profile
            await test_get_profile(access_token)

            # Test update profile
            await test_update_profile(access_token)

            # Test token refresh
            new_access_token = await test_refresh_token(refresh_token)

            if new_access_token:
                # Test with new token
                await test_get_profile(new_access_token)

            # Test resend verification
            await test_resend_verification(access_token)

            # Test password reset request
            await test_password_reset()

            # Uncomment to test account deletion (will delete the account!)
            # await test_delete_account(access_token)

        print("✅ All tests completed!")

    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
