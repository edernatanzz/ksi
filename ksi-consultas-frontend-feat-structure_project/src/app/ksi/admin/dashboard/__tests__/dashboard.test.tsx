import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../page'

const mockUser = {
  id: '1',
  name: 'Test User',
  permissions: ['READ_DASHBOARD']
}

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: mockUser }))
}))

// Mock do RouteGuard
vi.mock('@/components/template/RouteGuard/RouteGuard', () => ({
  RouteGuard: vi.fn(({ children }) => <div data-testid="route-guard">{children}</div>)
}))

// Mock dos componentes organisms
vi.mock('@/components/organisms/AdminOrganisms/Painel/MetricOverview', () => ({
  default: vi.fn(() => <div data-testid="metric-overview">MetricOverview</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/ComponentGrafico', () => ({
  default: vi.fn(() => <div data-testid="cost-evolution">CostEvolutionChartSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/QuickActionsSection', () => ({
  default: vi.fn(() => <div data-testid="quick-actions">QuickActionsSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/SupplierStatusSection', () => ({
  default: vi.fn(() => <div data-testid="supplier-status">SupplierStatusSection</div>)
}))

vi.mock('@/components/organisms/AdminOrganisms/Painel/RecentAlertsSection', () => ({
  default: vi.fn(() => <div data-testid="recent-alerts">RecentAlertsSection</div>)
}))

vi.mock('@/components/atoms/EmptyStates/EmptyState', () => ({
  default: vi.fn(() => <div data-testid="empty-state">EmptyState</div>)
}))

// Mock dos utilitários
vi.mock('@/data/dashboard', () => ({
  serviceCategories: [],
  dashboardCardsByCategory: {}
}))

vi.mock('@/utils/searchUtils', () => ({
  searchAllServices: vi.fn(() => [])
}))

vi.mock('@/utils/dashBoardPermissions', () => ({
  filterCategoriesByPermissions: vi.fn(() => []),
  filterServicesByPermissions: vi.fn(() => [])
}))

describe('DashboardPage', () => {
  describe('When page renders', () => {
    it('then displays main layout and dashboard sections', () => {
      // Arrange & Act
      render(<Page />)

      // Assert
      expect(screen.getByTestId('route-guard')).toBeInTheDocument()
      expect(screen.getByTestId('dashboard-container')).toBeInTheDocument()
    })

    it('then displays all dashboard components', () => {
      // Arrange & Act
      render(<Page />)

      // Assert
      expect(screen.getByTestId('metric-overview')).toBeInTheDocument()
      expect(screen.getByTestId('cost-evolution')).toBeInTheDocument()
      expect(screen.getByTestId('quick-actions')).toBeInTheDocument()
      expect(screen.getByTestId('supplier-status')).toBeInTheDocument()
      expect(screen.getByTestId('recent-alerts')).toBeInTheDocument()
    })

    it('then displays empty state when no data available', () => {
      // Arrange & Act
      render(<Page />)

      // Assert
      expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    })
  })
})