import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { DetailedPortfolioSection } from '../DetailedPortfolioSection'

describe('DetailedPortfolioSection', () => {
  const mockOnVoltar = vi.fn()

  it('When personType is "fisica", then should render creditDataFisica and alertasDataFisica', () => {
    // Arrange
    render(<DetailedPortfolioSection onVoltar={mockOnVoltar} personType="fisica" />)

    // Assert
    expect(screen.getByText('Carteira de Crédito Detalhada')).toBeInTheDocument()
    expect(screen.getByText('CARTAO DE CREDITO ? COMPRA, FATURA PARCELADA OU SAQUE FINANCIADO PELA INSTITUICAO EMITENTE DO CARTAO')).toBeInTheDocument()
    expect(screen.getByText('STATUS CADASTRO POSITIVO')).toBeInTheDocument()
    expect(screen.getAllByText('✚ Ocorrências :').length).toBeGreaterThan(0)
  })

  it('When personType is "juridica", then should render creditDataJuridica and alertasDataJuridica', () => {
    // Arrange
    render(<DetailedPortfolioSection onVoltar={mockOnVoltar} personType="juridica" />)

    // Assert
    expect(screen.getByText('Carteira de Crédito Detalhada')).toBeInTheDocument()
    // Verifica se existe pelo menos um elemento com o texto
    expect(screen.getAllByText('ADIANTAMENTOS A DEPOSITANTES').length).toBeGreaterThan(0)
    expect(screen.getByText('MATRIZ/FILIAL')).toBeInTheDocument()
  })

  it('When render, then should display the "Fazer nova consulta" button', () => {
    // Arrange
    render(<DetailedPortfolioSection onVoltar={mockOnVoltar} personType="fisica" />)

    // Assert
    expect(screen.getByRole('button', { name: 'Fazer nova consulta' })).toBeInTheDocument()
  })

  it('When "Fazer nova consulta" button is clicked, then should call onVoltar', () => {
    // Arrange
    render(<DetailedPortfolioSection onVoltar={mockOnVoltar} personType="fisica" />)

    // Act
    screen.getByRole('button', { name: 'Fazer nova consulta' }).click()

    // Assert
    expect(mockOnVoltar).toHaveBeenCalledTimes(1)
  })
})