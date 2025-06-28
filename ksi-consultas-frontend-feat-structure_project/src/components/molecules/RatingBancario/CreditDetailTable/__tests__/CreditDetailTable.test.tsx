import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { CreditDetailTable } from "../CreditDetailTable"

const mockData = [
  {
    category: "Categoria A",
    resumo: "Resumo A",
    items: [
      {
        description: "Descrição A1",
        value: "R$ 1.000,00",
        percentage: "50%",
      },
      {
        description: "Descrição A2",
        value: "R$ 1.000,00",
        percentage: "50%",
      },
    ],
  },
  {
    category: "Categoria B",
    resumo: "Resumo B",
    items: [
      {
        description: "Descrição B1",
        value: "R$ 2.000,00",
        percentage: "100%",
      },
    ],
  },
]

describe("CreditDetailTable", () => {
  it("When data is provided, then it should render all table headers", () => {
    // Arrange
    render(<CreditDetailTable data={mockData} />)

    // Assert
    expect(screen.getByText("Descrição")).toBeInTheDocument()
    expect(screen.getByText("Valor")).toBeInTheDocument()
    expect(screen.getByText("%")).toBeInTheDocument()
  })

  it("When data is provided, then it should render all category headers and summaries", () => {
    // Arrange
    render(<CreditDetailTable data={mockData} />)

    // Assert
    expect(screen.getByText("Categoria A")).toBeInTheDocument()
    expect(screen.getByText("Resumo A")).toBeInTheDocument()
    expect(screen.getByText("Categoria B")).toBeInTheDocument()
    expect(screen.getByText("Resumo B")).toBeInTheDocument()
  })

  it("When data has multiple items, then it should render all item rows correctly", () => {
    // Arrange
    render(<CreditDetailTable data={mockData} />)
  
    // Assert
    expect(screen.getByText("Descrição A1")).toBeInTheDocument()
    expect(screen.getByText("Descrição A2")).toBeInTheDocument()
    expect(screen.getAllByText("R$ 1.000,00")).toHaveLength(2)
    expect(screen.getAllByText("50%")).toHaveLength(2)
  
    expect(screen.getByText("Descrição B1")).toBeInTheDocument()
    expect(screen.getByText("R$ 2.000,00")).toBeInTheDocument()
    expect(screen.getByText("100%")).toBeInTheDocument()
  })  

  it("When data is empty, then it should render no rows", () => {
    // Arrange
    render(<CreditDetailTable data={[]} />)

    // Assert
    expect(screen.queryByText("Categoria A")).not.toBeInTheDocument()
    expect(screen.queryByText("Resumo A")).not.toBeInTheDocument()
    expect(screen.queryByText("Descrição A1")).not.toBeInTheDocument()
  })
})
