"""
Redis configuration and connection management.

This module provides Redis connection setup and management for caching,
session storage, and other Redis-based functionality.
"""

import asyncio
from typing import Optional

import redis.asyncio as redis
from redis.asyncio import Redis

from app.core.config import settings

# Redis connection pool
redis_pool: Optional[redis.ConnectionPool] = None
redis_client: Optional[Redis] = None


class RedisManager:
    """Redis connection manager with async support."""

    def __init__(self):
        self._pool: Optional[redis.ConnectionPool] = None
        self._client: Optional[Redis] = None

    async def connect(self) -> None:
        """Initialize Redis connection pool and client."""
        if self._pool is None:
            self._pool = redis.ConnectionPool.from_url(
                settings.redis_url,
                max_connections=settings.redis_pool_size,
                decode_responses=True,
            )
            self._client = redis.Redis(connection_pool=self._pool)

    async def disconnect(self) -> None:
        """Close Redis connection pool."""
        if self._client:
            await self._client.close()
        if self._pool:
            await self._pool.disconnect()
        self._client = None
        self._pool = None

    async def get_client(self) -> Redis:
        """Get Redis client instance."""
        if self._client is None:
            await self.connect()
        assert self._client is not None
        return self._client

    async def ping(self) -> bool:
        """Test Redis connection."""
        try:
            client = await self.get_client()
            await client.ping()
            return True
        except Exception:
            return False

    async def set(self, key: str, value: str, expire: Optional[int] = None) -> bool:
        """Set a key-value pair in Redis."""
        try:
            client = await self.get_client()
            await client.set(key, value, ex=expire)
            return True
        except Exception:
            return False

    async def get(self, key: str) -> Optional[str]:
        """Get a value from Redis by key."""
        try:
            client = await self.get_client()
            return await client.get(key)
        except Exception:
            return None

    async def delete(self, key: str) -> bool:
        """Delete a key from Redis."""
        try:
            client = await self.get_client()
            await client.delete(key)
            return True
        except Exception:
            return False

    async def exists(self, key: str) -> bool:
        """Check if a key exists in Redis."""
        try:
            client = await self.get_client()
            return bool(await client.exists(key))
        except Exception:
            return False


# Global Redis manager instance
redis_manager = RedisManager()


async def get_redis() -> Redis:
    """
    Get Redis client instance.

    Returns:
        Redis: Redis client instance
    """
    return await redis_manager.get_client()


async def check_redis_connection() -> bool:
    """
    Check if Redis connection is working.

    Returns:
        True if connection is successful, False otherwise
    """
    return await redis_manager.ping()


async def init_redis() -> None:
    """Initialize Redis connection."""
    await redis_manager.connect()


async def close_redis() -> None:
    """Close Redis connection."""
    await redis_manager.disconnect()
