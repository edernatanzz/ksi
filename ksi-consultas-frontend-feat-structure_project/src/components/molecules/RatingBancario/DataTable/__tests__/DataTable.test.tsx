import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DataTable } from "../DataTable"

const mockData = [
  {
    item: "Item 1",
    quantidade: "5",
    ultimaOcorrencia: "2024-05-01",
    pontuacao: "APROVADO",
    valorTotal: "R$ 100,00"
  },
  {
    item: "Item 2",
    quantidade: "2",
    ultimaOcorrencia: "2024-04-20",
    pontuacao: "REPROVADO",
    valorTotal: "R$ 50,00"
  }
]

describe("DataTable", () => {
  it("When title is provided, then it should render the title", () => {
    // Arrange
    const title = "Tabela de Pontuação"

    // Act
    render(<DataTable data={mockData} title={title} />)

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it("When title is not provided, then it should not render a title", () => {
    // Act
    render(<DataTable data={mockData} />)

    // Assert
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  it("When data is passed, then it should render all rows", () => {
    // Act
    render(<DataTable data={mockData} />)

    // Assert
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument()
    expect(screen.getByText("R$ 50,00")).toBeInTheDocument()
  })

  it('When pontuacao is "APROVADO", then it should render a green Chip', () => {
    // Act
    render(<DataTable data={mockData} />)

    // Assert
    expect(screen.getByText("APROVADO")).toBeInTheDocument()
    const chip = screen.getByText("APROVADO").closest(".MuiChip-root")
    expect(chip).toHaveClass("MuiChip-filledSuccess")
  })

  it('When pontuacao is not "APROVADO", then it should render plain text', () => {
    // Act
    render(<DataTable data={mockData} />)

    // Assert
    expect(screen.getByText("REPROVADO")).toBeInTheDocument()
  })

  it("When rendered, then it should display all headers", () => {
    // Act
    render(<DataTable data={mockData} />)

    // Assert
    expect(screen.getByText("Quantidade")).toBeInTheDocument()
    expect(screen.getByText("Última Ocorrência")).toBeInTheDocument()
    expect(screen.getByText("Pontuação")).toBeInTheDocument()
    expect(screen.getByText("Valor Total")).toBeInTheDocument()
  })
})
