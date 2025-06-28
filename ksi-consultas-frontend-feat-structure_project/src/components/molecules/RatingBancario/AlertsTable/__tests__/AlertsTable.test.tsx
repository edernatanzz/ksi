import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AlertsTable } from '../AlertsTable'

describe('AlertsTable', () => {
  it('When given title and data, then renders title and label', () => {
    // Arrange
    const data = [
      { info: 'Erro 404', descricao: 'Página não encontrada' },
      { info: 'Erro 500', descricao: 'Erro interno do servidor' },
    ]
    const title = 'Alertas Ativos'

    // Act
    render(<AlertsTable data={data} title={title} />)

    // Assert
    expect(screen.getByText('Alertas Ativos')).toBeInTheDocument()
    expect(screen.getByText('✚ Ocorrências :')).toBeInTheDocument()
  })

  it('When data is provided, then renders each info and descricao in table rows', () => {
    // Arrange
    const data = [
      { info: 'Erro 403', descricao: 'Acesso negado' },
      { info: 'Erro 401', descricao: 'Não autorizado' },
    ]

    // Act
    render(<AlertsTable data={data} title="Test Título" />)

    // Assert
    expect(screen.getByText('Erro 403')).toBeInTheDocument()
    expect(screen.getByText('Acesso negado')).toBeInTheDocument()
    expect(screen.getByText('Erro 401')).toBeInTheDocument()
    expect(screen.getByText('Não autorizado')).toBeInTheDocument()
  })

  it('When data is empty, then renders only table headers', () => {
    // Arrange
    const data: { info: string; descricao: string }[] = []

    // Act
    render(<AlertsTable data={data} title="Sem Dados" />)

    // Assert
    expect(screen.getByText('Informação')).toBeInTheDocument()
    expect(screen.getByText('Descrição')).toBeInTheDocument()
    expect(screen.queryByRole('row', { name: /Informação Descrição/i })).toBeInTheDocument()
    expect(screen.queryByText(/Erro/i)).not.toBeInTheDocument()
  })
})
