import { render, screen } from "@testing-library/react";
import TableInfoAlertasRestricoes from "../TableInfoAlertasRestricoes";

describe("TableInfoAlertasRestricoes", () => {
  it("When rendered, then it should display the table title", () => {
    // Arrange + Act
    render(<TableInfoAlertasRestricoes />);

    // Assert
    expect(screen.getByText(/informações alertas restrições/i)).toBeInTheDocument();
  });

  it("When rendered, then it should display all table rows", () => {
    // Arrange + Act
    render(<TableInfoAlertasRestricoes />);

    // Assert
    expect(screen.getByText(/STATUS CADASTRO POSITIVO/i)).toBeInTheDocument();
    expect(screen.getByText("CLIENTE NOTIFICADO, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS")).toBeInTheDocument();

    expect(screen.getByText("CONSULTAS 30 DIAS")).toBeInTheDocument();
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(4);

    expect(screen.getByText("CONSULTAS 31 A 60 DIAS")).toBeInTheDocument();
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(3); // Repetidos
  });

  it("When there are no rows, then it should display the fallback component", () => {
    // Arrange + Act
    render(<TableInfoAlertasRestricoes rows={[]} />);

    // Assert
    expect(screen.getByText("Nada consta")).toBeInTheDocument();
  });
});
