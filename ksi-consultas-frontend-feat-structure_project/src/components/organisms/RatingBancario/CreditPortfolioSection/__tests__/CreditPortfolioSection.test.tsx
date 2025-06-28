import { render, screen } from '@testing-library/react'
import { CreditPortfolioSection } from '../CreditPortfolioSection'
import { vi } from 'vitest'

// Mock do DashboardCard
vi.mock('@/components/molecules/DashboardCard/DashboardCard', () => ({
  DashboardCard: ({ card }: { card: { title: string; subtitle: string; icon: React.ReactNode } }) => (
    <div data-testid="dashboard-card">
      <span>{card.title}</span>
      <span>{card.subtitle}</span>
      <span>{card.icon}</span>
    </div>
  )
}))

describe('CreditPortfolioSection', () => {
  it('When rendered with personType "fisica", then it should display all 4 credit cards with correct titles and values', () => {
    // Arrange
    const expectedTitles = [
      "VALOR A PAGAR:",
      "DÍVIDAS NÃO PAGAS:",
      "PREJUÍZO AO SISTEMA FINANCEIRO:",
      "LIMITE DE CRÉDITO:"
    ]

    // Act
    render(<CreditPortfolioSection personType="fisica" />)

    // Assert
    const cards = screen.getAllByTestId('dashboard-card')
    expect(cards).toHaveLength(4)

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })

    expect(screen.getByText("R$ 3.476,97")).toBeInTheDocument()
    expect(screen.getAllByText("R$ 0,00")).toHaveLength(2)
    expect(screen.getByText("R$ 7.222,44")).toBeInTheDocument()
  })

  it('When rendered, then it should show section title "Carteira de Crédito"', () => {
    render(<CreditPortfolioSection personType="fisica" />)
    expect(screen.getByText("Carteira de Crédito")).toBeInTheDocument()
  })
})
