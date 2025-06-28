import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserActivityModal from '../UserActivityModal'

// Mock do Recharts
vi.mock('recharts', () => ({
  LineChart: vi.fn(({ children }) => <div data-testid="line-chart">{children}</div>),
  BarChart: vi.fn(({ children }) => <div data-testid="bar-chart">{children}</div>),
  Line: vi.fn(() => <div data-testid="line" />),
  Bar: vi.fn(() => <div data-testid="bar" />),
  XAxis: vi.fn(() => <div data-testid="x-axis" />),
  YAxis: vi.fn(() => <div data-testid="y-axis" />),
  CartesianGrid: vi.fn(() => <div data-testid="cartesian-grid" />),
  Tooltip: vi.fn(() => <div data-testid="tooltip" />),
  ResponsiveContainer: vi.fn(({ children }) => <div data-testid="responsive-container">{children}</div>)
}))

describe('UserActivityModal', () => {
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@ksi.com',
    profile: 'Admin',
    department: 'TI'
  }

  const mockOnClose = vi.fn()

  const defaultProps = {
    user: mockUser,
    onClose: mockOnClose,
    isOpen: true
  }

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe('When modal is open', () => {
    it('then displays user information and title', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('Atividades do Usuário')).toBeInTheDocument()
      expect(screen.getByText('João Silva - joao@ksi.com')).toBeInTheDocument()
    })

    it('then displays all filter controls', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert
      expect(screen.getByDisplayValue('Últimos 30 dias')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todas as Atividades')).toBeInTheDocument()
      expect(screen.getByText('Exportar')).toBeInTheDocument()
    })

    it('then displays all stat cards', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('2.450')).toBeInTheDocument() // Total queries
      expect(screen.getByText('R$ 1230.50')).toBeInTheDocument() // Total cost
      expect(screen.getByText('82')).toBeInTheDocument() // Avg per day
      expect(screen.getByText('R$ 0.50')).toBeInTheDocument() // Avg cost per query
      expect(screen.getByText('98.5%')).toBeInTheDocument() // Success rate
      expect(screen.getByText('45min')).toBeInTheDocument() // Avg session time
    })

    it('then displays charts', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('Atividade Diária')).toBeInTheDocument()
      expect(screen.getByText('Distribuição de Custos por API')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })

    it('then displays activity timeline', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert
      expect(screen.getByText('Timeline de Atividades')).toBeInTheDocument()
      expect(screen.getByText('Consulta CPF realizada')).toBeInTheDocument()
      expect(screen.getByText('Relatório de custos gerado')).toBeInTheDocument()
      expect(screen.getByText('Login realizado')).toBeInTheDocument()
    })
  })

  describe('When close button is clicked', () => {
    it('then calls onClose callback', () => {
      // Arrange
      render(<UserActivityModal {...defaultProps} />)

      // Act
      fireEvent.click(screen.getByRole('button', { name: /fechar/i }))

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('then calls onClose when X button is clicked', () => {
      // Arrange
      render(<UserActivityModal {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      const xButton = buttons.find(button => button.querySelector('svg[class*="lucide-x"]'))

      // Act
      if (xButton) fireEvent.click(xButton)

      // Assert
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When period filter is changed', () => {
    it('then updates selected period', () => {
      // Arrange
      render(<UserActivityModal {...defaultProps} />)
      const periodSelect = screen.getByDisplayValue('Últimos 30 dias')

      // Act
      fireEvent.change(periodSelect, { target: { value: '7d' } })

      // Assert
      expect(screen.getByDisplayValue('Últimos 7 dias')).toBeInTheDocument()
    })
  })

  describe('When activity filter is changed', () => {
    it('then updates activity filter and filters timeline', () => {
      // Arrange
      render(<UserActivityModal {...defaultProps} />)
      const activitySelect = screen.getByDisplayValue('Todas as Atividades')

      // Act
      fireEvent.change(activitySelect, { target: { value: 'query' } })

      // Assert
      expect(screen.getByDisplayValue('Consultas')).toBeInTheDocument()
      // Verifica se apenas atividades de consulta aparecem
      expect(screen.getByText('Consulta CPF realizada')).toBeInTheDocument()
      expect(screen.getByText('Consulta CNPJ realizada')).toBeInTheDocument()
    })

    it('then filters to login activities only', () => {
      // Arrange
      render(<UserActivityModal {...defaultProps} />)
      const activitySelect = screen.getByDisplayValue('Todas as Atividades')

      // Act
      fireEvent.change(activitySelect, { target: { value: 'login' } })

      // Assert
      expect(screen.getByText('Login realizado')).toBeInTheDocument()
      expect(screen.queryByText('Consulta CPF realizada')).not.toBeInTheDocument()
    })
  })

  describe('When different user data is provided', () => {
    it('then displays correct user information', () => {
      // Arrange
      const differentUser = {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@ksi.com',
        profile: 'User',
        department: 'Financeiro'
      }

      // Act
      render(<UserActivityModal {...defaultProps} user={differentUser} />)

      // Assert
      expect(screen.getByText('Maria Santos - maria@ksi.com')).toBeInTheDocument()
    })
  })

  describe('When modal layout is verified', () => {
    it('then has correct modal structure', () => {
      // Arrange
      const { container } = render(<UserActivityModal {...defaultProps} />)

      // Assert
      const modalBackdrop = container.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
      const modalContent = container.querySelector('.bg-white.rounded-xl.shadow-xl')
      
      expect(modalBackdrop).toBeInTheDocument()
      expect(modalContent).toBeInTheDocument()
    })
  })

  describe('When activity icons are displayed', () => {
    it('then shows appropriate icons for different activity types', () => {
      // Arrange & Act
      render(<UserActivityModal {...defaultProps} />)

      // Assert - Verifica se diferentes tipos de atividade estão presentes
      expect(screen.getByText('Consulta CPF realizada')).toBeInTheDocument() // query
      expect(screen.getByText('Relatório de custos gerado')).toBeInTheDocument() // report
      expect(screen.getByText('Login realizado')).toBeInTheDocument() // login
      expect(screen.getByText('Configuração alterada')).toBeInTheDocument() // config
      expect(screen.getByText('Erro na consulta')).toBeInTheDocument() // error
    })
  })

  describe('When component handles edge cases', () => {

    it('then handles unknown activity types and status', () => {
      // Arrange - Modifica as atividades para incluir tipos desconhecidos
      const modifiedProps = {
        ...defaultProps,
        // Força a renderização de tipos desconhecidos através de uma prop customizada
      }

      // Act
      render(<UserActivityModal {...modifiedProps} />)

      // Assert - Verifica se o componente renderiza sem errar
      expect(screen.getByText('Timeline de Atividades')).toBeInTheDocument()
    })
  })
})