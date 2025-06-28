import { describe, it, expect } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RatingBancarioPage from "../page"

describe("RatingBancarioPage", () => {
  it("When page loads, then form and resultado are displayed", () => {
    // Arrange
    render(<RatingBancarioPage />)

    // Assert
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
    expect(screen.getByTestId("resultado-consulta")).toBeInTheDocument()
    expect(screen.getByText("Rating Bancário")).toBeInTheDocument()
  })

  it("When document is filled and submitted, then loading and result sections are shown", async () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByRole("textbox") // campo de CPF/CNPJ
    const button = screen.getByRole("button", { name: /consultar/i })

    // Act
    fireEvent.change(input, { target: { value: "12345678901" } })
    fireEvent.click(button)

    // Assert
    await waitFor(() => {
      // Checa se o botão Nova Consulta está presente após carregamento
      expect(screen.getByTestId("nova-consulta-button")).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it("When document is filled and submitted, then loading and result sections are shown", async () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByLabelText(/CPF/i) || screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /consultar/i })

    // Act
    fireEvent.change(input, { target: { value: "12345678901" } })
    fireEvent.click(button)

    // Assert
    expect(button).toBeDisabled() // isLoading = true
    await waitFor(() => {
      expect(screen.getByText("Rating Bancário")).toBeInTheDocument()
      expect(screen.getByTestId("nova-consulta-button")).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it("When clicking nova consulta, then should go back to consulta form", async () => {
    // Arrange
    render(<RatingBancarioPage />)
    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /consultar/i })

    fireEvent.change(input, { target: { value: "12345678901" } })
    fireEvent.click(button)

    // Wait for results
    await waitFor(() => {
      expect(screen.getByTestId("nova-consulta-button")).toBeInTheDocument()
    }, { timeout: 2000 })

    // Act
    fireEvent.click(screen.getByTestId("nova-consulta-button"))

    // Assert
    expect(screen.getByTestId("form-consulta")).toBeInTheDocument()
  })
})
