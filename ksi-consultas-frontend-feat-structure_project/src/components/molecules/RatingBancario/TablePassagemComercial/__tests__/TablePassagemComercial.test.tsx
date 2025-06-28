import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { TablePassagemComercial } from '../TablePassagemComercial'

const mockData = [
  { data: '01/01/2024', tipo: 'Aéreo', valor: 'R$ 500,00', status: 'Confirmado' },
  { data: '02/01/2024', tipo: 'Rodoviário', valor: 'R$ 200,00', status: 'Pendente' }
]

describe('TablePassagemComercial', () => {
  it('When data is provided, then it should render all rows correctly', () => {
    // Arrange
    render(<TablePassagemComercial data={mockData} />)

    // Act & Assert
    expect(screen.getByText('01/01/2024')).toBeInTheDocument()
    expect(screen.getByText('Aéreo')).toBeInTheDocument()
    expect(screen.getByText('R$ 500,00')).toBeInTheDocument()
    expect(screen.getByText('Confirmado')).toBeInTheDocument()

    expect(screen.getByText('02/01/2024')).toBeInTheDocument()
    expect(screen.getByText('Rodoviário')).toBeInTheDocument()
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument()
    expect(screen.getByText('Pendente')).toBeInTheDocument()
  })

  it('When data is empty, then it should render the empty message', () => {
    // Arrange
    render(<TablePassagemComercial data={[]} />)

    // Act & Assert
    expect(screen.getByText('Nenhuma informação encontrada na base')).toBeInTheDocument()
  })

  it('When rendered, then it should display table headers', () => {
    // Arrange
    render(<TablePassagemComercial data={[]} />)

    // Act & Assert
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText('Valor')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })
})
