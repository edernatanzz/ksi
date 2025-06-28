import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TableSCR from '../TableSCR'

describe('TableSCR', () => {
  it('When rendered, then it should display section titles', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getByText('SCR - Banco Central')).toBeInTheDocument()
    expect(screen.getByText('Resumo')).toBeInTheDocument()
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('Pontuação')).toBeInTheDocument()
    expect(screen.getByText('Carteira de Crédito')).toBeInTheDocument()
    expect(screen.getByText('Carteira de Crédito Detalhada')).toBeInTheDocument()
  })

  it('When rendered, then it should display values from resumoSCR', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getByText('Inicio de Relacionamento:')).toBeInTheDocument()
    expect(screen.getByText('31/12/1972')).toBeInTheDocument()
    expect(screen.getByText('Quantidade de Instituições:')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('When rendered, then it should display scoreSCR label and classification', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getByText('Score:')).toBeInTheDocument()
    expect(screen.getByText('Ótimo')).toBeInTheDocument()
  })

  it('When rendered, then it should display pontuacaoSCR content', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getByText('Bom:')).toBeInTheDocument()
    expect(screen.getByText('601 a 800 Pontos')).toBeInTheDocument()
  })

  it('When rendered, then it should display carteiraSCR with formatted currency', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    const allMoeda1 = screen.getAllByText((content) => content.replace(/\s/g, '') === 'R$3.476,97');
    expect(allMoeda1.length).toBeGreaterThanOrEqual(1);
    const allMoeda2 = screen.getAllByText((content) => content.replace(/\s/g, '') === 'R$7.222,44');
    expect(allMoeda2.length).toBeGreaterThanOrEqual(1);
  })

  it('When rendered, then it should show detailed carteiraSCRDetalhada section with percentages', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getAllByText('Creditos a vencer ate 30 dias').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText((content) => content.replace(/\s/g, '') === 'R$5,33')).toBeInTheDocument()
    expect(screen.getByText('0.05%')).toBeInTheDocument()
  })

  it('When rendered, then it should show all headers of detailed tables', () => {
    // Arrange & Act
    render(<TableSCR />)

    // Assert
    expect(screen.getByText('Emprestimos:')).toBeInTheDocument()
    expect(screen.getByText('Outros Créditos:')).toBeInTheDocument()
    expect(screen.getByText('Limites:')).toBeInTheDocument()
    expect(screen.getByText('Empréstimos com garantia:')).toBeInTheDocument()
  })
})
