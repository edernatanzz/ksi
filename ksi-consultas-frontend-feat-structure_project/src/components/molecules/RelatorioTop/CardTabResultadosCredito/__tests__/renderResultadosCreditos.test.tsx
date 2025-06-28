import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderResultadosCreditos } from "../renderResultadosCreditos";

describe("renderResultadosCreditos", () => {
  it("should render all tables components with correct headers", () => {
    // Arrange
    render(renderResultadosCreditos());

    // Act & Assert
    // Verifica os cabeçalhos principais
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    expect(screen.getByText("RGI - Registro Geral de Inadimplente Do Brasil:")).toBeInTheDocument();

    // Verifica os cabeçalhos das colunas
    expect(screen.getAllByText("Descrição").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quantidade").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Valor Total").length).toBeGreaterThan(0);
  });

  it("should render the container div with correct classes", () => {
    // Arrange
    const { container } = render(renderResultadosCreditos());

    // Act
    const divContainer = container.firstChild;

    // Assert
    expect(divContainer).toHaveClass("w-full");
    expect(divContainer).toHaveClass("mb-4");
  });

  it("should render sample data correctly", () => {
    // Arrange
    render(renderResultadosCreditos());

    // Act & Assert
    expect(screen.getByText("RGI do Brasil")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("R$ 7.893,23")).toBeInTheDocument();
    expect(screen.getByText("Cheque sem fundo")).toBeInTheDocument();
    expect(screen.getByText("Protesto Nacional Cenprot")).toBeInTheDocument();
  });
});