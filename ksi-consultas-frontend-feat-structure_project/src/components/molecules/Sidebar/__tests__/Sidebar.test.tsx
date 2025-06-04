// // Sidebar.test.tsx
// import { render, screen } from '@testing-library/react'
// import { describe, it, expect, vi, Mock } from 'vitest'
// import { usePathname } from 'next/navigation'
// import { MenuItem } from '@/data/dashboard'
// import Sidebar from '../Sidebar'

// // Mock do next/navigation
// vi.mock('next/navigation', () => ({
//   usePathname: vi.fn(),
// }))

// // Mock do next/image
// vi.mock('next/image', () => ({
//   default: (props: any) => <img {...props} />,
// }))

// describe('Sidebar Component', () => {
//   const mockMenuItems: MenuItem[] = [
//     {
//       id: '1',
//       label: 'Dashboard',
//       path: '/dashboard',
//       icon: 'dashboard',
//     },
//     {
//       id: '2',
//       label: 'Usuários',
//       path: '/users',
//       icon: 'people',
//     },
//   ]

//   it('When rendered, then it should display logo and menu items', () => {
//     // Arrange
//     ;(usePathname as Mock).mockReturnValue('/other-route')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
    
//     // Assert
//     expect(screen.getByAltText('Logo')).toBeInTheDocument()
//     expect(screen.getByText('Dashboard')).toBeInTheDocument()
//     expect(screen.getByText('Usuários')).toBeInTheDocument()
//     expect(screen.getByText('SAIR')).toBeInTheDocument()
//   })

//   it('When current path matches menu item path, then it should highlight active item', () => {
//     // Arrange
//     ;(usePathname as Mock).mockReturnValue('/dashboard')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const activeItem = screen.getByText('Dashboard').closest('a')
//     const inactiveItem = screen.getByText('Usuários').closest('a')
    
//     // Assert
//     expect(activeItem).toHaveClass('bg-[#e02725]')
//     expect(inactiveItem).not.toHaveClass('bg-[#e02725]')
//     expect(inactiveItem).toHaveClass('text-gray-300')
//   })

//   it('When menu item is hovered, then it should change style', () => {
//     // Arrange
//     ;(usePathname as vi.Mock).mockReturnValue('/other-route')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const menuItem = screen.getByText('Dashboard').closest('a')
    
//     // Assert
//     expect(menuItem).toHaveClass('hover:bg-[#1a2733]')
//     expect(menuItem).toHaveClass('hover:text-white')
//   })

//   it('When logo is rendered, then it should have correct attributes', () => {
//     // Arrange
//     ;(usePathname as vi.Mock).mockReturnValue('/other-route')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const logo = screen.getByAltText('Logo')
    
//     // Assert
//     expect(logo).toHaveAttribute('src', '/favicon.ico')
//     expect(logo).toHaveAttribute('width', '48')
//     expect(logo).toHaveAttribute('height', '48')
//   })

//   it('When logout button is rendered, then it should have correct styles', () => {
//     // Arrange
//     ;(usePathname as vi.Mock).mockReturnValue('/other-route')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const logoutButton = screen.getByText('SAIR').closest('a')
    
//     // Assert
//     expect(logoutButton).toHaveClass('text-gray-300')
//     expect(logoutButton).toHaveClass('hover:bg-[#1a2733]')
//     expect(logoutButton).toHaveClass('hover:text-white')
//   })

//   it('When icon is active, then it should be white', () => {
//     // Arrange
//     ;(usePathname as vi.Mock).mockReturnValue('/dashboard')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const activeIcon = screen.getByText('dashboard').closest('span')
    
//     // Assert
//     expect(activeIcon).toHaveClass('text-white')
//   })

//   it('When icon is inactive, then it should be red', () => {
//     // Arrange
//     ;(usePathname as vi.Mock).mockReturnValue('/other-route')
    
//     // Act
//     render(<Sidebar menuItems={mockMenuItems} />)
//     const inactiveIcon = screen.getByText('dashboard').closest('span')
    
//     // Assert
//     expect(inactiveIcon).toHaveClass('text-[#e02725]')
//   })
// })