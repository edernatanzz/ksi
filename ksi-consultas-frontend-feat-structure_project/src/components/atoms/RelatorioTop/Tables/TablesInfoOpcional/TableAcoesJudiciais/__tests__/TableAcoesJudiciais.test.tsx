import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableAcoesJudiciais from "../TableAcoesJudiciais";

describe("TableAcoesJudiciais", () => {
  it("When rendered, then it should display table headers", () => {
    // Arrange & Act
    render(<TableAcoesJudiciais />);

    // Assert
    expect(screen.getByText("Acões Judiciais")).toBeInTheDocument();
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    expect(screen.getAllByText("Ações Judiciais").length).toBeGreaterThanOrEqual(1);
  });

  it("When rendered with static resumo data, then it should display all resumo rows", () => {
    // Arrange & Act
    render(<TableAcoesJudiciais />);

    // Assert
    expect(screen.getByText("Ações Judiciais:")).toBeInTheDocument();
    expect(screen.getByText("Ações como Autor:")).toBeInTheDocument();
    expect(screen.getByText("Ações como Réu:")).toBeInTheDocument();
    expect(screen.getByText("Ações como Outro:")).toBeInTheDocument();
    expect(screen.getByText("Data última Ação Judicial:")).toBeInTheDocument();
  });

  it("When detalhes list is empty, then it should show 'Não consta ações judiciais' in detalhes section", () => {
    // Arrange & Act
    render(<TableAcoesJudiciais />);

    // Assert
    // Duas ocorrências: uma para resumo vazio, outra para detalhes vazio
    const noInfoMessages = screen.getAllByText("Não consta ações judiciais");
    expect(noInfoMessages.length).toBe(1);
  });
});
