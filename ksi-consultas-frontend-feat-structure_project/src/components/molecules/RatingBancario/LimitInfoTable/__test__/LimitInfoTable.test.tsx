import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { LimitInfoTable } from '../LimitInfoTable'

interface TableData {
  item: string;
  info: string;
}

// Mock do Badge para facilitar a verificação no teste
vi.mock('@/components/atoms/Badge/Badge', () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="badge" className={className}>{children}</div>
  )
}))

describe('LimitInfoTable', () => {
  it('When title is provided, then it should render the title', () => {
    // Arrange
    const data: TableData[] = []
    const title = 'Limites de Crédito'

    // Act
    render(<LimitInfoTable data={data} title={title} />)

    // Assert
    expect(screen.getByText('Limites de Crédito')).toBeInTheDocument()
  })

  it('When title is not provided, then it should not render the title section', () => {
    // Arrange
    const data: TableData[] = []

    // Act
    render(<LimitInfoTable data={data} />)

    // Assert
    expect(screen.queryByText('Limites de Crédito')).not.toBeInTheDocument()
  })

  it('When data has rows, then it should render all rows', () => {
    // Arrange
    const data = [
      { item: 'Renda', info: 'R$ 5.000' },
      { item: 'Situação', info: 'NADA CONSTA' }
    ]

    // Act
    render(<LimitInfoTable data={data} />)

    // Assert
    expect(screen.getByText('Renda')).toBeInTheDocument()
    expect(screen.getByText('R$ 5.000')).toBeInTheDocument()
    expect(screen.getByText('Situação')).toBeInTheDocument()
    expect(screen.getByTestId('badge')).toHaveTextContent('NADA CONSTA')
  })

  it('When info is not "NADA CONSTA", then it should render raw info text', () => {
    // Arrange
    const data = [{ item: 'Score', info: '700' }]

    // Act
    render(<LimitInfoTable data={data} />)

    // Assert
    expect(screen.getByText('700')).toBeInTheDocument()
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument()
  })

  it('When data is empty, then it should render only the table headers', () => {
    // Arrange
    const data: [] = []

    // Act
    render(<LimitInfoTable data={data} />)

    // Assert
    expect(screen.getByText('Descrição')).toBeInTheDocument()
    expect(screen.getByText('Informações')).toBeInTheDocument()
    // Nenhuma linha de dado deve existir
    const headers = screen.getAllByRole('row')
    expect(headers.length).toBe(1) // Apenas o cabeçalho
  })
})
