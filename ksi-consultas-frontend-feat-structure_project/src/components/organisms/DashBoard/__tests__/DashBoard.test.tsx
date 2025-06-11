import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Dashboard from '../DashBoard'

vi.mock('@/components/molecules/DashboardCard/DashboardCard', () => ({
  default: vi.fn(({ card }) => <div data-testid={`dashboard-card-${card.id}`}>{card.title}</div>)
}))

vi.mock('@/components/atoms/Navigation/Navigation', () => ({
  default: vi.fn(() => <nav data-testid="navigation">Navigation</nav>)
}))

vi.mock('@/components/molecules/SearchSection/SearchSection', () => ({
  default: vi.fn(({ searchQuery, onSearchChange, resultCount }) => (
    <div data-testid="search-section">
      <input 
        data-testid="search-input"
        value={searchQuery || ''}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder="Buscar serviços"
      />
      {resultCount !== undefined && (
        <span data-testid="result-count">{resultCount} resultados</span>
      )}
    </div>
  ))
}))

vi.mock('@/components/molecules/SearchSection/SeachSection', () => ({
  default: vi.fn(({ searchQuery, onSearchChange }) => (
    <div data-testid="search-section-typo">
      <input 
        data-testid="search-input-typo"
        value={searchQuery || ''}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder="Buscar serviços"
      />
    </div>
  ))
}))

vi.mock('@/components/atoms/Button/Button', () => ({
  default: vi.fn(({ children, variant, size, startIcon, onClick }) => (
    <button 
      data-testid={`button-${variant}-${size}`}
      onClick={onClick}
    >
      {startIcon && <span data-testid="button-icon">{startIcon}</span>}
      {children}
    </button>
  ))
}))

vi.mock('@/components/atoms/EmptyStates/EmptyState', () => ({
  default: vi.fn(() => <div data-testid="empty-state">Empty State</div>)
}))

vi.mock('@mui/material', () => ({
  Fade: vi.fn(({ children }) => <div data-testid="fade-wrapper">{children}</div>)
}))

vi.mock('@/utils/searchUtils', () => ({
  searchAllServices: vi.fn(() => [])
}))

vi.mock('@/data/dashboard', async () => {
  const actual = await vi.importActual('@/data/dashboard')
  return {
    ...actual,
    serviceCategories: [
      { id: 'bancario', title: 'SERVIÇOS BANCÁRIOS' },
      { id: 'veicular', title: 'CONSULTAS VEICULARES' },
      { id: 'localizacao', title: 'LOCALIZAÇÃO E BENS' },
      { id: 'juridico', title: 'CONSULTAS JURÍDICAS' },
      { id: 'comercial', title: 'SERVIÇOS COMERCIAIS' }
    ],
    dashboardCardsByCategory: {}
  }
})

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('When render, then should display the correct title', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('PAINEL DE CONTROLE')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-xl', 'sm:text-2xl')
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('font-medium')
  })

  it('When render, then should display both action buttons', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('button-secondary-small')).toHaveTextContent('Nova Consulta')
    expect(screen.getByTestId('button-primary-small')).toHaveTextContent('Ver Histórico')
  })

  it('When render, then should display icon in the Nova Consulta button', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
  })

  it('When render, then should display all service category cards', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('dashboard-card-bancario')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-card-veicular')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-card-localizacao')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-card-juridico')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-card-comercial')).toBeInTheDocument()
  })

  it('When render, then should apply correct layout classes', () => {
    // Arrange & Act
    render(<Dashboard />)
    const container = screen.getByTestId('dashboard-container')
    const grid = screen.getByTestId('dashboard-grid')
    
    // Assert
    // Container principal
    expect(container).toHaveClass('p-4', 'sm:p-8')
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
    expect(buttonContainer).toHaveClass('gap-2', 'sm:gap-3')
  })

  it('When render, then should display navigation component', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('When render, then should display search functionality', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert - Check for search functionality (either mock or actual implementation)
    const searchSection = screen.queryByTestId('search-section')
    const searchSectionTypo = screen.queryByTestId('search-section-typo')
    const searchInput = screen.queryByPlaceholderText('Buscar serviços')
    
    // At least one of these should be present
    expect(searchSection || searchSectionTypo || searchInput).toBeInTheDocument()
  })

  it('When render, then should wrap cards in Fade component', () => {
    // Arrange & Act
    render(<Dashboard />)
    
    // Assert
    expect(screen.getByTestId('fade-wrapper')).toBeInTheDocument()
  })
})