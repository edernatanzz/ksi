import { render, screen } from "@testing-library/react"
import { FinanceiroData } from "../FinanceiroData"
import { describe, it, expect } from "vitest"

describe("FinanceiroData", () => {
  const defaultProps = {
    rendaEstimada: 15000,
    limiteDeCredito: 10000,
    pontualidade: 85,
    scorePositivo: 750,
    personType: "fisica"
  }

  it("When rendered, then it should display the card title", () => {
    // Arrange & Act
    render(<FinanceiroData {...defaultProps} />)

    // Assert
    expect(screen.getByText("Dados financeiros")).toBeInTheDocument()
  })

  it("When rendered, then it should display formatted 'Limite De Crédito'", () => {
    render(<FinanceiroData {...defaultProps} />)
  
    // Corrigido: permite variações como espaços incondicionais
    expect(
      screen.getByText((content) => content.includes("10.000,00"))
    ).toBeInTheDocument()
  })

  it("When rendered with personType 'fisica', then it should show label 'Renda presumida'", () => {
    render(<FinanceiroData {...defaultProps} />)
    expect(screen.getByText("Renda presumida")).toBeInTheDocument()
  })

  it("When rendered with personType 'juridica', then it should show label 'Faturamento presumido'", () => {
    render(
      <FinanceiroData
        {...defaultProps}
        personType="juridica"
      />
    )
    expect(screen.getByText("Faturamento presumido")).toBeInTheDocument()
  })

  it("When rendered, then it should display formatted 'Renda Estimada'", () => {
    render(<FinanceiroData {...defaultProps} />)
  
    // Corrigido: permite variações como espaços incondicionais
    expect(
      screen.getByText((content) => content.includes("15.000,00"))
    ).toBeInTheDocument()
  })

  it("When rendered, then it should render the ScoreIndicator component", () => {
    render(<FinanceiroData {...defaultProps} />)
    expect(screen.getByText("Score Positivo")).toBeInTheDocument()
    // Pode adicionar teste mais robusto se ScoreIndicator renderizar valor visível
  })

  it("When rendered, then it should render the ProgressBar component with correct label", () => {
    render(<FinanceiroData {...defaultProps} />)
    expect(screen.getByText("Pontualidade de Pagamento")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
  })
})
