import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// =============================================================
// SOLARVOICE MIDDLEWARE
// =============================================================
// Handles: Security headers, auth cookie refresh
// MVP Mode: Auth disabled for testing (enable in production)
// Note: Supabase session refresh moved to route handlers to avoid
//       Edge Runtime compatibility issues
// =============================================================

// Paths that require authentication (when enabled)
const protectedPaths = ['/dashboard', '/systems', '/analytics', '/settings', '/profile']

// Paths that should redirect if already authenticated
const authPaths = ['/login', '/register', '/forgot-password']

// Paths that need voice/microphone access
const voiceEnabledPaths = ['/dashboard/agents', '/voice-test', '/conversation', '/pricing']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ===== SECURITY HEADERS =====
  const response = NextResponse.next()

  const isVoiceEnabled = voiceEnabledPaths.some(path => pathname.startsWith(path))

  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Selectively enable microphone access for voice-enabled pages
  const permissionsPolicy = isVoiceEnabled
    ? 'camera=(), microphone=(self), geolocation=()'
    : 'camera=(), microphone=(), geolocation=()'

  response.headers.set('Permissions-Policy', permissionsPolicy)

  // ===== MVP MODE: AUTH DISABLED =====
  // For MVP testing, allow all access to dashboard
  // TODO: Re-enable authentication for production
  const mvpMode = process.env.NODE_ENV === 'development' || process.env.MVP_AUTH_DISABLED === 'true'

  if (mvpMode) {
    return response
  }

  // ===== PRODUCTION AUTH LOGIC =====
  // Check Supabase auth cookies
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Supabase stores session in cookies with patterns like:
  // sb-<project-ref>-auth-token
  const hasAuthCookie = Array.from(request.cookies.getAll()).some(
    cookie => cookie.name.includes('auth-token') || cookie.name.startsWith('sb-')
  )

  if (isProtectedPath && !hasAuthCookie) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPath && hasAuthCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
