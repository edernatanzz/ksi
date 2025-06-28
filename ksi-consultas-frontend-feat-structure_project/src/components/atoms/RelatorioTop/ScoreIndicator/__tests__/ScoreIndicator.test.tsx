import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ScoreIndicator } from "../ScoreIndicator"

describe("ScoreIndicator", () => {
  it("When score is less than 500, then shows 'Alto Risco' and red color", () => {
    // Arrange
    const score = 400

    // Act
    render(<ScoreIndicator score={score} />)

    // Assert
    expect(screen.getByText("400")).toBeInTheDocument()
    expect(screen.getByText("Alto Risco")).toHaveClass("text-red-600")
  })

  it("When score is between 500 and 699, then shows 'Médio Risco' and yellow color", () => {
    // Arrange
    const score = 600

    // Act
    render(<ScoreIndicator score={score} />)

    // Assert
    expect(screen.getByText("600")).toBeInTheDocument()
    expect(screen.getByText("Médio Risco")).toHaveClass("text-yellow-600")
  })

  it("When score is 700 or more, then shows 'Baixo Risco' and green color", () => {
    // Arrange
    const score = 750

    // Act
    render(<ScoreIndicator score={score} />)

    // Assert
    expect(screen.getByText("750")).toBeInTheDocument()
    expect(screen.getByText("Baixo Risco")).toHaveClass("text-green-600")
  })

  it("When score is 1000, then progress bar width is 100%", () => {
    // Arrange
    const score = 1000

    // Act
    render(<ScoreIndicator score={score} />)

    // Assert
    const progressDiv = screen.getByTestId("score-progress-bar")
    expect(progressDiv).toHaveStyle("width: 100%")
  })

  it("When score is negative, then progress bar width is 0%", () => {
    // Arrange
    const score = -100

    // Act
    render(<ScoreIndicator score={score} />)

    // Assert
    const progressDiv = screen.getByTestId("score-progress-bar")
    expect(progressDiv).toHaveStyle("width: 0%")
  })
})
