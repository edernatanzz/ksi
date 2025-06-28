import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableAcoesCiveis from "../TableAcoesCiveis";

describe("TableAcoesCiveis", () => {
  it("When rendered without data, then it should display the 'Não consta ações cíveis' message", () => {
    // Arrange & Act
    render(<TableAcoesCiveis />);

    // Assert
    expect(screen.getByText("Não consta ações cíveis")).toBeInTheDocument();
  });

  it("When rendered, then it should display the table headers", () => {
    // Arrange & Act
    render(<TableAcoesCiveis />);

    // Assert
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("When rendered, then it should display the title 'Ações Cíveis'", () => {
    // Arrange & Act
    render(<TableAcoesCiveis />);

    // Assert
    expect(screen.getByText("Ações Cíveis")).toBeInTheDocument();
  });
});
