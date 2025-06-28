import { render, screen } from "@testing-library/react";
import { CreditLimitSection } from "../CreditLimitSection";

describe("CreditLimitSection", () => {
  test("When personType is 'fisica', then renders credit limit title and tooltip content for pessoa física", () => {
    // Arrange & Act
    render(<CreditLimitSection personType="fisica" />);

    // Assert
    expect(screen.getByText("LIMITE DE CRÉDITO")).toBeInTheDocument();
    expect(screen.getByText("R$ 0,00")).toBeInTheDocument();

    // Evita erro de múltiplos elementos com "Resumo"
    const resumoElements = screen.getAllByText("Resumo");
    expect(resumoElements.length).toBe(2); // Deve haver 2 elementos com texto "Resumo"

    // Verifica que as duas tabelas estão no documento
    expect(screen.getByTestId("DataTable")).toBeInTheDocument();
    expect(screen.getByTestId("LimitInfoTable")).toBeInTheDocument();

    // Verifica se os dados específicos estão presentes
    expect(screen.getByText("RGI do Brasil")).toBeInTheDocument();
    expect(screen.getByText("Início de Relacionamento")).toBeInTheDocument();


    // Opcional: verifica alguns dados específicos da tabela
    expect(screen.getByText("RGI do Brasil")).toBeInTheDocument();
    expect(screen.getByText("Início de Relacionamento")).toBeInTheDocument();
  });

  test("When personType is 'juridica', then renders presumed revenue title and tooltip content for pessoa jurídica", () => {
    // Arrange & Act
    render(<CreditLimitSection personType="juridica" />);

    // Assert
    expect(screen.getByText("FATURAMENTO MENSAL PRESUMIDO")).toBeInTheDocument();
    expect(screen.getByText("R$ 0,00")).toBeInTheDocument();

    // Evita erro de múltiplos elementos com "Resumo"
    const resumoElements = screen.getAllByText("Resumo");
    expect(resumoElements.length).toBe(2);

    expect(screen.getByTestId("DataTable")).toBeInTheDocument();
    expect(screen.getByTestId("LimitInfoTable")).toBeInTheDocument();

    expect(screen.getByText("RGI do Brasil")).toBeInTheDocument();
    expect(screen.getByText("Início de Relacionamento")).toBeInTheDocument();
  });
});
