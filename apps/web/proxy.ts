import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Redirect unauthenticated users from / to login
  if (!isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect unauthenticated users from dashboard
  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
})

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register'],
}
