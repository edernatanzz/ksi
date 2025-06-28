import { render, screen } from '@testing-library/react'
import Alert from '../Alert' // ajuste o caminho conforme necessário

describe('Alert', () => {
  it("When rendered with title and info, then it should display both correctly", () => {
    // Arrange
    const title = "Atenção"
    const info = "Esta é uma mensagem de alerta."

    // Act
    render(<Alert title={title} info={info} />)

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(info)).toBeInTheDocument()
  })

  it("When rendered, then it should display the alert icon", () => {
    // Arrange & Act
    render(<Alert title="Alerta" info="Mensagem" />)

    // Assert
    const icon = screen.getByTestId('lucide-icon')
    expect(icon).toBeInTheDocument()
  })
})
