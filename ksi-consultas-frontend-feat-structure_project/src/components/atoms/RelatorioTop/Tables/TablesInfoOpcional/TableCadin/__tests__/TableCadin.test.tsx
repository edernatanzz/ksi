import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableCadin from "../TableCadin";

describe("TableCadin", () => {
  it("When rendered, then it should display title and message", () => {
    // Arrange
    // (nenhuma preparação necessária, o componente não depende de props)

    // Act
    render(<TableCadin />);

    // Assert
    expect(screen.getByRole("heading", { name: /cadin/i })).toBeInTheDocument();
    expect(screen.getByText(/nenhuma informação encontrada/i)).toBeInTheDocument();
  });
});
