'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function AdminPage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN]}>
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <p className="text-gray-600">
        Bem-vindo ao painel administrativo Aqui você tem acesso total ao sistema.
      </p>
    </SetorLayout>
  )
}