import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from '@/types/auth'

// por role
const PROTECTED_ROUTES = {
  '/admin': [UserRole.ADMIN, UserRole.DEVS],
  '/dev': [UserRole.ADMIN, UserRole.DEVS],
  '/marketing': [UserRole.ADMIN, UserRole.DEVS, UserRole.MARKETING],
  '/suporte': [UserRole.ADMIN, UserRole.DEVS, UserRole.SUPORTE],
  '/financeiro': [UserRole.ADMIN, UserRole.DEVS, UserRole.FINANCEIRO],
  '/teste': [UserRole.ADMIN, UserRole.DEVS]
}

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value as UserRole
  const path = request.nextUrl.pathname

  // Verifica se a rota está protegida
  const protectedRoute = Object.entries(PROTECTED_ROUTES).find(([route]) => 
    path.startsWith(route)
  )

  if (protectedRoute) {
    const [, allowedRoles] = protectedRoute
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dev/:path*',
    '/marketing/:path*',
    '/suporte/:path*',
    '/financeiro/:path*',
    '/teste/:path*'
  ]
}