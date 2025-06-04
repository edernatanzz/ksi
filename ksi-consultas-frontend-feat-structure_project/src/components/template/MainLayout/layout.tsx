'use client'
import React, { useState } from 'react'
import { menuItems } from '@/data/dashboard'
import Sidebar from '@/components/molecules/Sidebar/Sidebar'
import { useAuth } from '@/contexts/AuthContext'

interface MainLayoutProps {
  children: React.ReactNode
}

const MobileHeader: React.FC<{
  onMenuClick: () => void
}> = ({ onMenuClick }) => (
  <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <button
      onClick={onMenuClick}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Abrir menu"
    >
      <span className="material-icons text-[24px]">menu</span>
    </button>
    <div className="text-lg font-medium text-gray-800">
      KSI CONSULTAS
    </div>
    <div className="w-10"></div>
  </div>
)

// Atom - Login Screen
const LoginScreen: React.FC = () => {
  const { login } = useAuth()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            KSI Sistema
          </h2>
          <p className="text-gray-600 mb-8">
            Faça login para acessar o sistema
          </p>
          <button
            onClick={login}
            className="w-full py-3 px-4 bg-[#e02725] hover:bg-[#dc2626] text-white font-medium rounded-lg transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

// Molecule - Desktop Sidebar Container
const DesktopSidebar: React.FC = () => (
  <div
    data-testid="sidebar-container"
    className="hidden lg:block w-[275px] h-full shrink-0"
  >
    <Sidebar
      menuItems={menuItems}
      isOpen={true}
      onClose={() => {}}
    />
  </div>
)

// Molecule - Mobile Sidebar Container
const MobileSidebar: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => (
  <div className="lg:hidden">
    <Sidebar
      menuItems={menuItems}
      isOpen={isOpen}
      onClose={onClose}
    />
  </div>
)

// Molecule - Content Area
const ContentArea: React.FC<{
  children: React.ReactNode
  onMenuClick: () => void
}> = ({ children, onMenuClick }) => (
  <div
    data-testid="content-container"
    className="flex-1 flex flex-col overflow-hidden"
  >
    <MobileHeader onMenuClick={onMenuClick} />
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
)

// Organism - Dashboard Layout
const DashboardLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div
      role="main-layout"
      className="flex h-screen w-screen overflow-hidden bg-white text-secondary-800"
    >
      <DesktopSidebar />
      <MobileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <ContentArea onMenuClick={toggleSidebar}>
        {children}
      </ContentArea>
    </div>
  )
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

export default MainLayout