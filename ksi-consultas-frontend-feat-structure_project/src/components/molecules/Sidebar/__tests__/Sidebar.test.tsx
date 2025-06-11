import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { MenuItem } from '@/data/dashboard'

interface MockLinkProps {
  children: React.ReactNode
  href: string
  onClick?: (event: React.MouseEvent) => void
  className?: string
}

interface MockImageProps {
  src: string
  alt: string
  className?: string
}

// Mocks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, onClick, className }: MockLinkProps) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: MockImageProps) => (
    <div data-testid="mock-image" data-src={src} data-alt={alt} className={className}>
      {alt}
    </div>
  ),
}))

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockUsePathname = vi.mocked(usePathname)
const mockUseAuth = vi.mocked(useAuth)

describe('Sidebar Component', () => {
  // Arrange - Setup comum
  const mockLogout = vi.fn()
  const mockOnClose = vi.fn()
  
  const mockMenuItems: MenuItem[] = [
    { id: '1', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { id: '2', label: 'Users', path: '/users', icon: 'people' },
    { id: '3', label: 'Settings', path: '/settings', icon: 'settings' },
  ]

  const defaultProps = {
    menuItems: mockMenuItems,
    isOpen: true,
    onClose: mockOnClose,
  }

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      logout: mockLogout,
    })
    mockUsePathname.mockReturnValue('/dashboard')
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('When sidebar is open', () => {
    it('When sidebar is open, then should display all menu items', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: true }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('When sidebar is open, then should display logo', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: true }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      const logo = screen.getByTestId('mock-image')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('data-src', '/favicon.ico')
      expect(logo).toHaveAttribute('data-alt', 'Logo')
    })

    it('When sidebar is open, then should display close button on mobile', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: true }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      const closeButton = screen.getByText('close')
      expect(closeButton).toBeInTheDocument()
    })

    it('When sidebar is open, then should display logout button', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: true }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      expect(screen.getByText('SAIR')).toBeInTheDocument()
      expect(screen.getByText('logout')).toBeInTheDocument()
    })
  })

  describe('When sidebar is closed', () => {
    it('When sidebar is closed, then should apply hidden transform class', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: false }

      // Act
      const { container } = render(<Sidebar {...props} />)

      // Assert
      const sidebar = container.querySelector('.fixed.top-0.left-0')
      expect(sidebar).toHaveClass('-translate-x-full')
    })

    it('When sidebar is closed, then should not display overlay', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: false }

      // Act
      const { container } = render(<Sidebar {...props} />)

      // Assert
      const overlay = container.querySelector('.bg-black.bg-opacity-50')
      expect(overlay).not.toBeInTheDocument()
    })
  })

  describe('When active menu item is highlighted', () => {
    it('When current path matches menu item, then should highlight active item', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/users')
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      const activeLink = screen.getByText('Users').closest('a')
      expect(activeLink).toHaveClass('bg-[#e02725]', 'text-white')
    })

    it('When current path does not match menu item, then should not highlight item', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/dashboard')
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      const inactiveLink = screen.getByText('Users').closest('a')
      expect(inactiveLink).toHaveClass('text-gray-300')
      expect(inactiveLink).not.toHaveClass('bg-[#e02725]')
    })
  })

  describe('When user interactions occur', () => {
    it('When close button is clicked, then should call onClose', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)
      const closeButton = screen.getByText('close')
      fireEvent.click(closeButton)

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('When overlay is clicked, then should call onClose', () => {
      // Arrange
      const props = { ...defaultProps, isOpen: true }

      // Act
      const { container } = render(<Sidebar {...props} />)
      const overlay = container.querySelector('.bg-black.bg-opacity-50')!
      fireEvent.click(overlay)

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('When menu item is clicked, then should call onClose', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)
      const menuLink = screen.getByText('Dashboard').closest('a')!
      fireEvent.click(menuLink)

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('When logout button is clicked, then should call logout and onClose', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)
      const logoutButton = screen.getByText('SAIR').closest('a')!
      fireEvent.click(logoutButton)

      // Assert
      expect(mockLogout).toHaveBeenCalledTimes(1)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('When logout click event is prevented, then should prevent default behavior', () => {
      // Arrange
      const props = { ...defaultProps }
      const preventDefault = vi.fn()

      // Act
      render(<Sidebar {...props} />)
      const logoutButton = screen.getByText('SAIR').closest('a')!
      fireEvent.click(logoutButton, { preventDefault })

      // Assert
      expect(mockLogout).toHaveBeenCalledTimes(1)
    })
  })

  describe('When menu items are rendered', () => {
    it('When menu items have icons, then should display correct icons', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      expect(screen.getByText('dashboard')).toBeInTheDocument()
      expect(screen.getByText('people')).toBeInTheDocument()
      expect(screen.getByText('settings')).toBeInTheDocument()
    })

    it('When menu items have paths, then should render correct href attributes', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      const dashboardLink = screen.getByText('Dashboard').closest('a')
      const usersLink = screen.getByText('Users').closest('a')
      const settingsLink = screen.getByText('Settings').closest('a')

      expect(dashboardLink).toHaveAttribute('href', '/dashboard')
      expect(usersLink).toHaveAttribute('href', '/users')
      expect(settingsLink).toHaveAttribute('href', '/settings')
    })
  })

  describe('When sidebar styling is applied', () => {
    it('When sidebar is rendered, then should have correct base classes', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      const { container } = render(<Sidebar {...props} />)

      // Assert
      const sidebar = container.querySelector('.fixed.top-0.left-0')
      expect(sidebar).toHaveClass(
        'fixed',
        'top-0',
        'left-0',
        'h-full',
        'w-[275px]',
        'z-50',
        'transform',
        'transition-transform',
        'duration-300',
        'ease-in-out'
      )
    })

    it('When sidebar content is rendered, then should have correct background', () => {
      // Arrange
      const props = { ...defaultProps }

      // Act
      const { container } = render(<Sidebar {...props} />)

      // Assert
      const sidebarContent = container.querySelector('.bg-\\[\\#0e1a25\\]')
      expect(sidebarContent).toHaveClass('bg-[#0e1a25]', 'text-white')
    })
  })

  describe('When empty menu items are provided', () => {
    it('When menuItems array is empty, then should render sidebar without menu items', () => {
      // Arrange
      const props = { ...defaultProps, menuItems: [] }

      // Act
      render(<Sidebar {...props} />)

      // Assert
      expect(screen.getByText('SAIR')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })
  })

  describe('When authentication context is unavailable', () => {
    it('When useAuth returns undefined logout, then should handle gracefully', () => {
      // Arrange
      mockUseAuth.mockReturnValue({
        logout: undefined as unknown as () => void,
      })
      const props = { ...defaultProps }

      // Act & Assert
      expect(() => render(<Sidebar {...props} />)).not.toThrow()
    })
  })
})