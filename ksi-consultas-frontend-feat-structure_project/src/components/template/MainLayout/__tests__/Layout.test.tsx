import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MainLayout } from '@/components/template/MainLayout/layout'
import { useAuth } from '@/contexts/AuthContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Mocks
vi.mock('@/contexts/AuthContext')
vi.mock('@/components/template/LoginPage/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login</div>
}))
vi.mock('@/components/molecules/Sidebar/Sidebar', () => ({
  default: ({ isOpen, onClose }: SidebarProps) => (
    <div data-testid="sidebar" data-open={isOpen} onClick={onClose}>
      Sidebar
    </div>
  )
}))
vi.mock('@/data/dashboard', () => ({ menuItems: [] }))

const mockUseAuth = vi.mocked(useAuth)

describe('MainLayout', () => {
  describe('When user is not authenticated', () => {
    it('When not authenticated, then should show LoginPage', () => {
      // Arrange
      mockUseAuth.mockReturnValue({
          isAuthenticated: false,
          login: function (): void {
              throw new Error('Function not implemented.')
          },
          logout: function (): void {
              throw new Error('Function not implemented.')
          }
      })

      // Act
      render(<MainLayout><div>Content</div></MainLayout>)

      // Assert
      expect(screen.getByTestId('login-page')).toBeInTheDocument()
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })

  describe('When user is authenticated', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
          isAuthenticated: true,
          login: function (): void {
              throw new Error('Function not implemented.')
          },
          logout: function (): void {
              throw new Error('Function not implemented.')
          }
      })
    })

    it('When authenticated, then should show dashboard layout', () => {
      // Arrange & Act
      render(<MainLayout><div>Dashboard Content</div></MainLayout>)

      // Assert
      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
      expect(screen.getByRole('main-layout')).toBeInTheDocument()
    })

    it('When mobile menu clicked, then should toggle sidebar', () => {
      // Arrange
      render(<MainLayout><div>Content</div></MainLayout>)
      const menuBtn = screen.getByLabelText('Abrir menu')
      
      // Act - open sidebar
      fireEvent.click(menuBtn)

      // Assert
      const sidebar = screen.getAllByTestId('sidebar')[1] // mobile sidebar
      expect(sidebar).toHaveAttribute('data-open', 'true')
    })

    it('When sidebar closed, then should close mobile sidebar', () => {
      // Arrange
      render(<MainLayout><div>Content</div></MainLayout>)
      const menuBtn = screen.getByLabelText('Abrir menu')
      fireEvent.click(menuBtn) // open first
      
      // Act - close sidebar
      const mobileSidebar = screen.getAllByTestId('sidebar')[1]
      fireEvent.click(mobileSidebar)

      // Assert
      expect(mobileSidebar).toHaveAttribute('data-open', 'false')
    })

    it('When rendered, then should display mobile header', () => {
      // Arrange & Act
      render(<MainLayout><div>Content</div></MainLayout>)

      // Assert
      expect(screen.getByText('KSI CONSULTAS')).toBeInTheDocument()
      expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument()
    })

    it('When rendered, then should have desktop and mobile sidebars', () => {
      // Arrange & Act
      render(<MainLayout><div>Content</div></MainLayout>)

      // Assert
      const sidebars = screen.getAllByTestId('sidebar')
      expect(sidebars).toHaveLength(2) // desktop + mobile
      expect(sidebars[0]).toHaveAttribute('data-open', 'true') // desktop always open
    })

    it('When children provided, then should render content area', () => {
      // Arrange
      const content = <div data-testid="custom-content">Custom Content</div>

      // Act
      render(<MainLayout>{content}</MainLayout>)

      // Assert
      expect(screen.getByTestId('custom-content')).toBeInTheDocument()
      expect(screen.getByTestId('content-container')).toBeInTheDocument()
    })
  })
})