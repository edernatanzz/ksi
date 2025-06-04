// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import { describe, it, expect } from 'vitest'
// import { menuItems } from '@/data/dashboard'
// import MainLayout from '../layout'

// describe('MainLayout Component', () => {
//   const mockChildren = <div data-testid="test-children">Conteúdo de teste</div>

//   it('When render with children, then should display children content', () => {
//     // Arrange
//     const testId = 'test-children'
    
//     // Act
//     render(<MainLayout>{mockChildren}</MainLayout>)
    
//     // Assert
//     expect(screen.getByTestId(testId)).toBeInTheDocument()
//     expect(screen.getByTestId(testId)).toHaveTextContent('Conteúdo de teste')
//   })

//   it('When render, then should have correct layout structure', () => {
//     // Act
//     render(<MainLayout>{mockChildren}</MainLayout>)
//     const layoutElement = screen.getByRole('main-layout')
//     const sidebarContainer = screen.getByTestId('sidebar-container')
//     const contentContainer = screen.getByTestId('content-container')
    
//     // Assert
//     expect(layoutElement).toBeInTheDocument()
//     expect(sidebarContainer).toBeInTheDocument()
//     expect(contentContainer).toBeInTheDocument()
//   })

//   it('When render, then should apply correct classes to layout elements', () => {
//     // Act
//     render(<MainLayout>{mockChildren}</MainLayout>)
//     const layoutElement = screen.getByRole('main-layout')
//     const sidebarContainer = screen.getByTestId('sidebar-container')
//     const contentContainer = screen.getByTestId('content-container')
    
//     // Assert
//     // Layout principal
//     expect(layoutElement).toHaveClass('flex')
//     expect(layoutElement).toHaveClass('h-screen')
//     expect(layoutElement).toHaveClass('w-screen')
//     expect(layoutElement).toHaveClass('overflow-hidden')
//     expect(layoutElement).toHaveClass('bg-white')
    
//     // Container da sidebar
//     expect(sidebarContainer).toHaveClass('w-[275px]')
//     expect(sidebarContainer).toHaveClass('h-full')
//     expect(sidebarContainer).toHaveClass('shrink-0')
    
//     // Container de conteúdo
//     expect(contentContainer).toHaveClass('flex-1')
//     expect(contentContainer).toHaveClass('overflow-auto')
//   })

//   it('When render, then should pass menuItems to Sidebar component', () => {
//     // Mock do componente Sidebar
//     vi.mock('@/components/molecules/Sidebar', () => ({
//       default: vi.fn(({ menuItems }) => (
//         <div data-testid="mock-sidebar">
//           {menuItems.map((item: { id: React.Key | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
//             <div key={item.id}>{item.label}</div>
//           ))}
//         </div>
//       ))
//     }))
    
//     // Act
//     render(<MainLayout>{mockChildren}</MainLayout>)
    
//     // Assert
//     menuItems.forEach(item => {
//       expect(screen.getByText(item.label)).toBeInTheDocument()
//     })
//   })
// })