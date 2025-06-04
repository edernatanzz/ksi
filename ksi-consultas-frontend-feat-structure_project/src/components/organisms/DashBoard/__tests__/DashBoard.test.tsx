import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '../DashBoard'
import { dashboardCards } from '@/data/dashboard'

// Mock dos componentes filhos
vi.mock('@/components/molecules/DashboardCard/DashboardCard', () => ({
  default: vi.fn(({ card }) => <div data-testid={`dashboard-card-${card.id}`}>{card.title}</div>)
}))

vi.mock('@/components/atoms/Button/Button', () => ({
  default: vi.fn(({ children, variant, size, startIcon }) => (
    <button data-testid={`button-${variant}-${size}`}>
      {startIcon && <span data-testid="button-icon">{startIcon}</span>}
      {children}
    </button>
  ))
}))

describe('Dashboard Component', () => {
  it('When render, then should display the correct title', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    expect(screen.getByText('PAINEL DE CONTROLE')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-2xl')
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('font-medium')
  })

  it('When render, then should display both buttons', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    expect(screen.getByTestId('button-secondary-small')).toHaveTextContent('Nova Consulta')
    expect(screen.getByTestId('button-primary-small')).toHaveTextContent('Ver Histórico')
  })

  it('When render, then should display icon in the first button', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
  })

  it('When render, then should display all dashboard cards', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    dashboardCards.forEach(card => {
      expect(screen.getByTestId(`dashboard-card-${card.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`dashboard-card-${card.id}`)).toHaveTextContent(card.title)
    })
  })

  it('When render, then should apply correct layout classes', () => {
    // Arrange & Act
    render(<Dashboard />)
    const container = screen.getByTestId('dashboard-container')
    const grid = screen.getByTestId('dashboard-grid')
    
    // Assert
    // Container principal
    expect(container).toHaveClass('p-8')
    expect(container).toHaveClass('bg-ksiBeige')
    expect(container).toHaveClass('min-h-screen')
    
    // Grid interna
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-3')
    expect(grid).toHaveClass('gap-5')
  })

  it('When render, then button container should have correct spacing', () => {
    // Arrange & Act
    render(<Dashboard />)
    const buttonContainer = screen.getByTestId('buttons-container')
    
    // Assert
    expect(buttonContainer).toHaveClass('flex')
    expect(buttonContainer).toHaveClass('space-x-3')
  })
})