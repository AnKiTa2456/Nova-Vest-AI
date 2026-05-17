import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

const PROTECTED = ['/dashboard', '/analytics', '/settings', '/admin']
const AUTH_ROUTES = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (isProtected) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    const payload = await verifyToken(token)
    if (!payload) {
      const res = NextResponse.redirect(new URL('/login', request.url))
      res.cookies.delete(COOKIE_NAME)
      return res
    }
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (isAuthRoute && token) {
    const payload = await verifyToken(token)
    if (payload) return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/analytics/:path*', '/settings/:path*', '/admin/:path*', '/login', '/signup'],
}
