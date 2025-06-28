import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import RelatorioTopPage from "@/app/consultas/relatorio-top/page"

describe("RelatorioTopPage", () => {
  it("When page is rendered initially, then it shows consulta form and description", () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Assert
    expect(screen.getByText("Relatório Top")).toBeInTheDocument()
    expect(screen.getByText("Análise completa de crédito e score")).toBeInTheDocument()
    expect(screen.getByText("Dados Opcionais")).toBeInTheDocument()
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
    expect(screen.getByText("Descrição")).toBeInTheDocument()
  })

  it("When no document is provided and form is submitted, then it does not transition to result page", async () => {
    // Arrange
    render(<RelatorioTopPage />)

    // Act
    const submitButton = screen.getByRole("button", { name: /consultar/i })
    fireEvent.click(submitButton)

    // Assert
    expect(screen.queryByText("Análise IA")).not.toBeInTheDocument()
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
  })  
  
  it("When optional data checkbox is clicked, then item is selected", () => {
    // Arrange
    render(<RelatorioTopPage />)

    const checkbox = screen.getByLabelText(/SCR - Banco Central/i)

    // Act
    fireEvent.click(checkbox)

    // Assert
    expect(checkbox).toBeChecked()
  })
})
