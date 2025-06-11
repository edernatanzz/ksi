'use client'
import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuItem } from '@/data/dashboard'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/auth'

interface SidebarProps {
  menuItems: MenuItem[]
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, isOpen, onClose }) => {
  const pathname = usePathname()
  const {logout, user } = useAuth();

  const filtrarItens = useMemo(() => {
    if(!user) return menuItems;
    return menuItems.filter(item => {
      if (!item.requiredPermissions && !item.allowedRoles && !item.adminOnly) {
        return true
      }

      if (item.adminOnly && user.role !== UserRole.ADMIN) {
        return false
      }

      if (item.allowedRoles && !item.allowedRoles.includes(user.role)) {
        return false
      }

      if (item.requiredPermissions) {
        const hasRequiredPermission = item.requiredPermissions.some(permission =>
          user.permissions.includes(permission)
        )
        if (!hasRequiredPermission) {
          return false
        }
      }

      return true
    })
  }, [menuItems, user])

  const handleLogout = (e : React.MouseEvent) => {
    e.preventDefault();
      logout();
      onClose();
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-[275px] z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="w-full h-full flex flex-col bg-[#0e1a25] text-white">
          <div className="px-6 pt-8 pb-10 flex items-center justify-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:hidden p-2 text-[#e02725] hover:text-white hover:bg-[#e02725] rounded-lg transition-all duration-200"
            >
              <span className="material-icons text-[24px]">close</span>
            </button>
            
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={48}
              height={48}
              className="w-auto h-12 object-contain"
              quality={100}
              priority
              unoptimized
            />
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3">
            <ul className="space-y-1 list-none">
              {filtrarItens.map((item) => {
                const isActive = pathname === item.path
                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center px-3 py-3 text-sm font-medium no-underline transition-all duration-200 rounded-lg
                        ${isActive
                          ? 'bg-[#e02725] text-white border-r-4 border-[#dc2626]'
                          : 'text-gray-300 hover:bg-[#1a2733] hover:text-white'}
                      `}
                    >
                      <span className={`material-icons mr-4 text-[20px] ${
                        isActive ? 'text-white' : 'text-[#e02725]'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Botão de sair */}
          <div className="mt-auto border-t border-gray-700 px-3 pt-3">
            <Link
              href="#"
              onClick={handleLogout}
              className="flex items-center px-3 py-4 text-sm font-medium text-gray-300 hover:bg-[#1a2733] hover:text-white no-underline transition-all duration-200 rounded-lg"
            >
              <span className="material-icons mr-4 text-[20px] text-gray-400">
                logout
              </span>
              <span className="font-medium tracking-wide">
                SAIR
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar