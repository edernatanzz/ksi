'use client'

import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole } from '@/types/auth'

export default function TestePage() {
  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN, UserRole.DEVS]}>
      <h1 className="text-2xl font-bold mb-4">Página de Teste</h1>
      <p className="text-gray-600">
        Hello World! Esta é uma página de teste.
      </p>
    </SetorLayout>
  )
} 