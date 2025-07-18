#!/usr/bin/env python3
"""
Database setup script for SpendAhead backend.

This script sets up the database by:
1. Running database migrations
2. Creating initial seed data
3. Setting up Redis connection
4. Verifying the setup
"""

import asyncio
import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text, select
from alembic.config import Config
from alembic import command

from app.core.database import engine, AsyncSessionLocal, check_database_connection
from app.core.redis import redis_manager
from app.core.seeds import seed_user_data
from app.models import User


async def run_migrations():
    """Run database migrations using Alembic."""
    print("🔄 Running database migrations...")

    try:
        # Get the alembic config
        alembic_cfg = Config(str(backend_dir / "alembic.ini"))

        # Run the migration
        command.upgrade(alembic_cfg, "head")
        print("✅ Database migrations completed successfully!")

    except Exception as e:
        print(f"❌ Error running migrations: {e}")
        raise


async def test_database_connection():
    """Test database connection."""
    print("🔍 Testing database connection...")

    try:
        is_connected = await check_database_connection()
        if is_connected:
            print("✅ Database connection successful!")
        else:
            print("❌ Database connection failed!")
            return False
    except Exception as e:
        print(f"❌ Error testing database connection: {e}")
        return False

    return True


async def test_redis_connection():
    """Test Redis connection."""
    print("🔍 Testing Redis connection...")

    try:
        is_connected = await redis_manager.ping()
        if is_connected:
            print("✅ Redis connection successful!")
        else:
            print("❌ Redis connection failed!")
            return False
    except Exception as e:
        print(f"❌ Error testing Redis connection: {e}")
        return False

    return True


async def create_sample_user():
    """Create a sample user for testing."""
    print("👤 Creating sample user...")

    async with AsyncSessionLocal() as session:
        try:
            # Check if sample user already exists
            existing_user_result = await session.execute(
                text("SELECT id FROM users WHERE email = 'demo@spendahead.com'")
            )
            existing_user = existing_user_result.scalar_one_or_none()

            if existing_user:
                print("✅ Sample user already exists!")
                return existing_user

            # Create sample user
            from app.core.security import get_password_hash

            user = User(
                email="demo@spendahead.com",
                hashed_password=get_password_hash("demo123"),
                first_name="Demo",
                last_name="User",
                is_active=True,
                is_verified=True,
                is_superuser=False,
                currency="USD",
                timezone="UTC",
                language="en",
                theme_preference="light",
            )

            session.add(user)
            await session.commit()
            await session.refresh(user)

            print("✅ Sample user created successfully!")
            return user.id

        except Exception as e:
            print(f"❌ Error creating sample user: {e}")
            await session.rollback()
            raise


async def seed_sample_data(user_id: str):
    """Seed sample data for the demo user."""
    print("🌱 Seeding sample data...")

    async with AsyncSessionLocal() as session:
        try:
            # Seed user data
            seeded_data = await seed_user_data(session, user_id)

            print(f"✅ Created {len(seeded_data['categories'])} categories")
            print(f"✅ Created {len(seeded_data['accounts'])} accounts")
            print(f"✅ Created budget: {seeded_data['budget'].name}")

        except Exception as e:
            print(f"❌ Error seeding sample data: {e}")
            await session.rollback()
            raise


async def verify_setup():
    """Verify the database setup."""
    print("🔍 Verifying database setup...")

    async with AsyncSessionLocal() as session:
        try:
            # Check if tables exist
            tables = await session.execute(
                text(
                    """
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('users', 'categories', 'accounts', 'transactions', 'budgets', 'ai_insights', 'audit_logs')
                """
                )
            )

            table_names = [row[0] for row in tables.fetchall()]
            expected_tables = [
                "users",
                "categories",
                "accounts",
                "transactions",
                "budgets",
                "ai_insights",
                "audit_logs",
            ]

            missing_tables = set(expected_tables) - set(table_names)

            if missing_tables:
                print(f"❌ Missing tables: {missing_tables}")
                return False
            else:
                print("✅ All required tables exist!")

                # Check if sample user exists
            user_count = await session.execute(
                text("SELECT COUNT(*) FROM users WHERE email = 'demo@spendahead.com'")
            )

            user_count_result = user_count.scalar()
            if user_count_result and user_count_result > 0:
                print("✅ Sample user exists!")
            else:
                print("❌ Sample user not found!")
                return False

            # Check if categories exist
            category_count = await session.execute(
                text(
                    "SELECT COUNT(*) FROM categories WHERE user_id IN (SELECT id FROM users WHERE email = 'demo@spendahead.com')"
                )
            )

            category_count_result = category_count.scalar()
            if category_count_result and category_count_result > 0:
                print("✅ Sample categories exist!")
            else:
                print("❌ Sample categories not found!")
                return False

            print("✅ Database setup verification completed successfully!")
            return True

        except Exception as e:
            print(f"❌ Error verifying setup: {e}")
            return False


async def main():
    """Main setup function."""
    print("🚀 Starting SpendAhead database setup...")
    print("=" * 50)

    try:
        # Test database connection
        if not await test_database_connection():
            print("❌ Cannot proceed without database connection!")
            sys.exit(1)

        # Test Redis connection
        if not await test_redis_connection():
            print("⚠️  Redis connection failed, but continuing...")

        # Run migrations
        await run_migrations()

        # Create sample user
        user_id = await create_sample_user()

        # Seed sample data
        if user_id is not None:
            await seed_sample_data(str(user_id))

        # Verify setup
        if await verify_setup():
            print("\n🎉 Database setup completed successfully!")
            print("\n📋 Setup Summary:")
            print("- Database migrations: ✅")
            print("- Sample user: demo@spendahead.com / demo123")
            print("- Default categories: ✅")
            print("- Default accounts: ✅")
            print("- Sample budget: ✅")
            print("\n🚀 You can now start the application!")
        else:
            print("\n❌ Database setup verification failed!")
            sys.exit(1)

    except Exception as e:
        print(f"\n❌ Database setup failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
