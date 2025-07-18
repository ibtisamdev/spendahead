# Authentication System Documentation

## Overview

The SpendAhead backend implements a comprehensive JWT-based authentication system with the following features:

- User registration and login
- JWT access and refresh tokens
- Password reset functionality
- Email verification
- User profile management
- Account deletion

## API Endpoints

### Authentication Endpoints

#### POST `/api/v1/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "timezone": "UTC",
  "currency": "USD",
  "language": "en"
}
```

**Response:**

```json
{
  "message": "User registered successfully. Please check your email for verification.",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "phone": "+1234567890",
      "timezone": "UTC",
      "currency": "USD",
      "language": "en",
      "theme_preference": "light",
      "is_active": true,
      "is_verified": false,
      "is_superuser": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "last_login_at": null
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### POST `/api/v1/auth/login`

Log in with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800,
  "refresh_expires_in": 604800,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "phone": "+1234567890",
    "timezone": "UTC",
    "currency": "USD",
    "language": "en",
    "theme_preference": "light",
    "is_active": true,
    "is_verified": false,
    "is_superuser": false,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "last_login_at": "2024-01-01T00:00:00Z"
  }
}
```

#### POST `/api/v1/auth/refresh`

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:** Same as login response with new tokens.

#### GET `/api/v1/auth/me`

Get current user profile (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "timezone": "UTC",
  "currency": "USD",
  "language": "en",
  "theme_preference": "light",
  "is_active": true,
  "is_verified": false,
  "is_superuser": false,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "last_login_at": "2024-01-01T00:00:00Z"
}
```

#### PUT `/api/v1/auth/me`

Update current user profile (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+0987654321",
  "timezone": "America/New_York",
  "currency": "EUR",
  "language": "es",
  "theme_preference": "dark"
}
```

**Response:** Updated user profile.

#### POST `/api/v1/auth/password-reset`

Request password reset.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "If the email exists, a password reset link has been sent.",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### POST `/api/v1/auth/password-reset/confirm`

Confirm password reset with token.

**Request Body:**

```json
{
  "token": "reset_token_here",
  "new_password": "NewSecurePassword123"
}
```

**Response:**

```json
{
  "message": "Password reset successfully. You can now log in with your new password.",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### POST `/api/v1/auth/verify-email`

Verify email with verification token.

**Request Body:**

```json
{
  "token": "verification_token_here"
}
```

**Response:**

```json
{
  "message": "Email verified successfully.",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### POST `/api/v1/auth/resend-verification`

Resend email verification (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "Verification email sent successfully. Please check your inbox.",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### DELETE `/api/v1/auth/me`

Delete current user account (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "Account deleted successfully.",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Security Features

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit

### Token Management

- **Access Token**: Valid for 30 minutes
- **Refresh Token**: Valid for 7 days
- **Password Reset Token**: Valid for 1 hour
- **Email Verification Token**: Valid for 24 hours

### JWT Token Structure

```json
{
  "exp": 1640995200,
  "sub": "user_id",
  "type": "access|refresh|password_reset|email_verification"
}
```

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "detail": "Email already registered"
}
```

#### 401 Unauthorized

```json
{
  "detail": "Could not validate credentials",
  "headers": {
    "WWW-Authenticate": "Bearer"
  }
}
```

#### 403 Forbidden

```json
{
  "detail": "Email not verified"
}
```

#### 500 Internal Server Error

```json
{
  "detail": "Registration failed. Please try again."
}
```

## Usage Examples

### Frontend Integration

#### Login Flow

```javascript
const login = async (email, password) => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    // Store tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data.user;
  }

  throw new Error('Login failed');
};
```

#### Authenticated Request

```javascript
const getProfile = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch('/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error('Failed to get profile');
};
```

#### Token Refresh

```javascript
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const response = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  }

  // Redirect to login
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
};
```

## Environment Variables

Make sure to set these environment variables:

```bash
# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost/spendahead

# Email (for future implementation)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Testing

Run the authentication tests:

```bash
cd backend
python -m pytest tests/test_auth.py -v
```

## Future Enhancements

1. **Email Integration**: Implement actual email sending for verification and password reset
2. **OAuth Integration**: Add Google, GitHub, or other OAuth providers
3. **Two-Factor Authentication**: Implement 2FA with TOTP
4. **Session Management**: Track active sessions and allow logout from all devices
5. **Rate Limiting**: Implement rate limiting for auth endpoints
6. **Audit Logging**: Log authentication events for security monitoring

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Secure Headers**: Implement security headers (HSTS, CSP, etc.)
3. **Token Storage**: Store tokens securely (httpOnly cookies for web apps)
4. **Password Policy**: Enforce strong password requirements
5. **Account Lockout**: Implement account lockout after failed attempts
6. **Regular Audits**: Regularly audit authentication logs
7. **Token Rotation**: Implement automatic token rotation
8. **Input Validation**: Validate all user inputs thoroughly
