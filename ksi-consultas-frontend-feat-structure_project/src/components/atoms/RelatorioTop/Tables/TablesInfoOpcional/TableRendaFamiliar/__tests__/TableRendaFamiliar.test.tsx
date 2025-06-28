import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableRendaFamiliar from "../TableRendaFamiliar";

describe("TableRendaFamiliar", () => {
  it("When personType is 'fisica' and renda > 0, then it should display formatted renda", () => {
    // Arrange
    const personType = "fisica";

    // Act
    render(<TableRendaFamiliar personType={personType} />);

    // Assert
    expect(screen.getByText("Renda Familiar")).toBeInTheDocument();
    expect(screen.getByText((content) => content.replace(/\s/g, "") === "R$5.500,00")).toBeInTheDocument();
  });

  it("When personType is 'fisica' and renda = 0, then it should display '-' (mocked case)", () => {
    // Arrange
    // Não precisa de mock, basta passar a prop renda=0

    // Act
    render(<TableRendaFamiliar personType="fisica" renda={0} />);

    // Assert
    expect(screen.getByText("Renda Familiar")).toBeInTheDocument();
    // Use getByText com função para garantir que '-' está presente
    expect(screen.getByText((content) => content.trim() === "-")).toBeInTheDocument();
  });

  it("When personType is 'juridica', then it should render only the title", () => {
    // Arrange
    const personType = "juridica";

    // Act
    render(<TableRendaFamiliar personType={personType} />);

    // Assert
    expect(screen.getByText("Renda Familiar")).toBeInTheDocument();
    expect(screen.queryByText("R$ 5.500,00")).not.toBeInTheDocument();
    expect(screen.queryByText("-")).not.toBeInTheDocument();
  });
});
