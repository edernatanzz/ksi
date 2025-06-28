import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { FormularioConsulta } from "../FormConsulta"

describe("FormularioConsulta", () => {
  const mockProps = {
    personType: "fisica",
    document: "",
    newConsultation: false,
    isLoading: false,
    onPersonTypeChange: vi.fn(),
    onDocumentChange: vi.fn(),
    onNewConsultationChange: vi.fn(),
    onSubmit: vi.fn(),
  }

  it("When rendered, then displays correct title and subtitle", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} />)
    
    // Act
    const title = screen.getByText("Formulário de Consulta")
    const subtitle = screen.getByText("Preencha os dados para realizar a consulta")
    
    // Assert
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it("When personType is changed, then calls onPersonTypeChange", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} />)
    const juridicaRadio = screen.getByRole("radio", { name: "Jurídica" })
    
    // Act
    fireEvent.click(juridicaRadio)
    
    // Assert
    expect(mockProps.onPersonTypeChange).toHaveBeenCalledWith("juridica")
  })

  it("When document is changed, then calls onDocumentChange with formatted value", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} personType="juridica" />)
    const documentInput = screen.getByRole("textbox")
    
    // Act
    fireEvent.change(documentInput, { target: { value: "12345678901" } })
    
    // Assert
    expect(mockProps.onDocumentChange).toHaveBeenCalledWith("12.345.678/901")
  })

  it("When checkbox is clicked, then calls onNewConsultationChange", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} />)
    const checkbox = screen.getByRole("checkbox")
    
    // Act
    fireEvent.click(checkbox)
    
    // Assert
    expect(mockProps.onNewConsultationChange).toHaveBeenCalledWith(true)
  })

  it("When form is submitted with valid data, then calls onSubmit", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} document="12345678901" />)
    const button = screen.getByRole("button", { name: /Consultar/i })
    
    // Act
    fireEvent.click(button)
    
    // Assert
    expect(mockProps.onSubmit).toHaveBeenCalled()
  })

  it("When isLoading is true, then shows loading state", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} isLoading={true} />)
    
    // Act
    const loadingText = screen.getByText("Consultando...")
    const loadingIcon = screen.getByTestId("loading-icon")
    
    // Assert
    expect(loadingText).toBeInTheDocument()
    expect(loadingIcon).toBeInTheDocument()
  })

  it("When document is empty, then disables submit button", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} document="" />)
    const button = screen.getByRole("button", { name: /Consultar/i })
    
    // Act & Assert
    expect(button).toBeDisabled()
  })

  it("When document is not empty, then enables submit button", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} document="12345678901" />)
    const button = screen.getByRole("button", { name: /Consultar/i })
    
    // Act & Assert
    expect(button).not.toBeDisabled()
  })

  it("When not loading, then shows search icon", () => {
    // Arrange
    render(<FormularioConsulta {...mockProps} />)
    
    // Act
    const searchIcon = screen.getByTestId("search-icon")
    
    // Assert
    expect(searchIcon).toBeInTheDocument()
  })
})  