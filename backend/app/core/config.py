"""
Configuration management for the SpendAhead backend.

This module handles all application configuration using Pydantic settings
for type safety and environment variable management.
"""

from typing import List, Optional

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    # Application Settings
    app_name: str = Field(default="SpendAhead Backend")
    app_version: str = Field(default="0.1.0")
    debug: bool = Field(default=False)
    environment: str = Field(default="development")

    # Server Settings
    host: str = Field(default="0.0.0.0")
    port: int = Field(default=8000)
    reload: bool = Field(default=True)

    # Database Settings
    database_url: str = Field(
        default="postgresql+asyncpg://user:password@localhost/spendahead"
    )
    database_url_sync: str = Field(
        default="postgresql://user:password@localhost/spendahead"
    )
    database_pool_size: int = Field(default=10)
    database_max_overflow: int = Field(default=20)

    # Redis Settings
    redis_url: str = Field(default="redis://localhost:6379/0")
    redis_pool_size: int = Field(default=10)

    # Security Settings
    secret_key: str = Field(default="dev-secret-key-change-in-production")
    algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=30)
    refresh_token_expire_days: int = Field(default=7)

    # CORS Settings
    allowed_origins: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:3001"]
    )
    allowed_credentials: bool = Field(default=True)

    # AI Integration
    openai_api_key: Optional[str] = Field(default=None)
    openai_model: str = Field(default="gpt-4")
    openai_max_tokens: int = Field(default=1000)
    openai_temperature: float = Field(default=0.1)

    # Rate Limiting
    rate_limit_per_minute: int = Field(default=60)
    rate_limit_per_hour: int = Field(default=1000)

    # Logging
    log_level: str = Field(default="INFO")
    log_format: str = Field(default="json")

    # External APIs (for future use)
    plaid_client_id: Optional[str] = Field(default=None)
    plaid_secret: Optional[str] = Field(default=None)
    plaid_env: str = Field(default="sandbox")

    # Email Settings (for future use)
    smtp_host: Optional[str] = Field(default=None)
    smtp_port: Optional[int] = Field(default=None)
    smtp_user: Optional[str] = Field(default=None)
    smtp_password: Optional[str] = Field(default=None)

    # File Upload (for future use)
    max_file_size: int = Field(default=10485760)  # 10MB
    upload_dir: str = Field(default="uploads")

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        """Parse allowed origins from string to list if needed."""
        if isinstance(v, str):
            # Remove brackets and split by comma
            v = v.strip("[]").split(",")
            return [origin.strip().strip('"').strip("'") for origin in v]
        return v

    @field_validator("secret_key")
    @classmethod
    def validate_secret_key(cls, v):
        """Validate that secret key is set and not default."""
        if not v or v == "your-secret-key-here-change-in-production":
            raise ValueError("SECRET_KEY must be set and not use the default value")
        return v

    @field_validator("database_url")
    @classmethod
    def validate_database_url(cls, v):
        """Validate database URL is provided."""
        if not v:
            raise ValueError("DATABASE_URL must be set")
        return v

    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment.lower() == "development"

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment.lower() == "production"

    @property
    def is_testing(self) -> bool:
        """Check if running in testing environment."""
        return self.environment.lower() == "testing"

    class Config:
        """Pydantic configuration."""

        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Global settings instance
settings = Settings()
