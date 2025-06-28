import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware as ksiMiddleware } from './middleware-ksi'
import { middlewareFranchisee } from './middleware-franchisee'
import { middlewarePartner } from './middleware-partner'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Roteamento para os diferentes ambientes
  if (path.startsWith('/ksi/')) {
    return ksiMiddleware(request)
  }
  
  if (path.startsWith('/franchisee/')) {
    return middlewareFranchisee(request)
  }
  
  if (path.startsWith('/partner/')) {
    return middlewarePartner(request)
  }

  // Para outras rotas, continua normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Rotas principais dos módulos
    '/ksi',
    '/franchisee',  
    '/partner',
    
    // Rotas KSI
    '/ksi/:path*',
    '/ksi/admin/:path*',
    '/ksi/dev/:path*',
    '/ksi/marketing/:path*',
    '/ksi/suporte/:path*',
    '/ksi/financeiro/:path*',
    '/ksi/teste/:path*',
    '/ksi/consultas/:path*',
    '/ksi/relatorios/:path*',
    
    // Rotas Franchisee
    '/franchisee/:path*',
    '/franchisee/dashboard/:path*',
    '/franchisee/consultas/:path*',
    '/franchisee/relatorios/:path*',
    '/franchisee/clientes/:path*',
    '/franchisee/parceiros/:path*',
    '/franchisee/configuracoes/:path*',
    
    // Rotas Partner
    '/partner/:path*',
    '/partner/dashboard/:path*',
    '/partner/consultas/:path*',
    '/partner/clientes/:path*',
    '/partner/relatorios/:path*',
    '/partner/configuracoes/:path*'
  ]
}