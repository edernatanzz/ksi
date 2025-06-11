'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function DevPage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.DEVS]}>
      <h1 className="text-2xl font-bold mb-4">Painel de Desenvolvimento</h1>
      <p className="text-gray-600">
        Bem-vindo ao painel de desenvolvimento. Aqui você tem acesso às ferramentas de desenvolvimento.
      </p>
    </SetorLayout>
  )
} 