import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/transactions',
  '/budgets',
  '/analytics',
  '/categories',
  '/ai-assistant',
  '/settings'
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/signup',
  '/auth/reset-password'
]

function isValidToken(tokenData: string): boolean {
  try {
    const parsed = JSON.parse(tokenData)

    // Check if token has required fields
    if (!parsed.token || !parsed.expiresAt || !parsed.user) {
      return false
    }

    // Check if token is expired
    if (Date.now() > parsed.expiresAt) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const tokenData = request.cookies.get('auth_token')?.value

  // Validate the token
  const isAuthenticated = tokenData && isValidToken(tokenData)

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Check if the current path is a public auth route
  const isPublicAuthRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  )

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access auth routes
  if (isAuthenticated && isPublicAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If accessing root path, redirect based on auth status
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 