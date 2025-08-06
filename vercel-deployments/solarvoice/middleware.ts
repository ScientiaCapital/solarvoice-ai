import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication
const protectedPaths = ['/dashboard', '/systems', '/analytics', '/settings', '/profile']

// Add paths that should redirect if authenticated
const authPaths = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // MVP: DISABLE AUTH - Allow all access to dashboard
  // TODO: Re-enable authentication after MVP testing
  
  // const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  // const isAuthPath = authPaths.some(path => pathname.startsWith(path))
  // const authToken = request.cookies.get('auth-token')?.value
  
  // if (isProtectedPath && !authToken) {
  //   const url = new URL('/login', request.url)
  //   url.searchParams.set('from', pathname)
  //   return NextResponse.redirect(url)
  // }
  
  // if (isAuthPath && authToken) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  
  return response
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
