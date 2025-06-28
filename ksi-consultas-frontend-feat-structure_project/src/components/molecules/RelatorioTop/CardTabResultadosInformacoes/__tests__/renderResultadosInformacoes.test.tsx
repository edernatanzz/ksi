import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import renderResultadosInformacoes from "@/components/molecules/RelatorioTop/CardTabResultadosInformacoes/renderResultadosInformacoes";

// Mocks dos componentes filhos
vi.mock("@/components/atoms/RelatorioTop/Tables/TableRestricoesSinteticas/TableRestricoesSinteticas", () => ({
  default: () => <div data-testid="table-restricoes-sinteticas" />,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TableInfo/TableInfo", () => ({
  default: ({ personType }: { personType: string }) => (
    <div data-testid={`table-info-${personType}`} />
  ),
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TableParticipacaoSocietaria/TableParticipacaoSocietaria", () => ({
  default: () => <div data-testid="table-participacao-societaria" />,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TableInfoAlertasRestricoes/TableInfoAlertasRestricoes", () => ({
  default: () => <div data-testid="table-info-alertas-restricoes" />,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TablePassagensComerciais/TablePassagensComerciais", () => ({
  default: () => <div data-testid="table-passagens-comerciais" />,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TableAcoesCiveis/TableAcoesCiveis", () => ({
  default: () => <div data-testid="table-acoes-civeis" />,
}));
vi.mock("@/components/molecules/RelatorioTop/InfoOpcional/InfoOpcional", () => ({
  default: ({ opcionalSelected, personType }: { opcionalSelected: string[]; personType: string }) => (
    <div data-testid={`info-opcional-${personType}-${opcionalSelected.join(",")}`} />
  ),
}));

describe("renderResultadosInformacoes", () => {
  it("When opcionalSelected is empty, then should not render InfoOpcional", () => {
    // Arrange
    const props = {
      personType: "F",
      opcionalSelected: [],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByTestId("table-restricoes-sinteticas")).toBeInTheDocument();
    expect(screen.getByTestId("table-info-F")).toBeInTheDocument();
    expect(screen.getByTestId("table-participacao-societaria")).toBeInTheDocument();
    expect(screen.getByTestId("table-info-alertas-restricoes")).toBeInTheDocument();
    expect(screen.getByTestId("table-passagens-comerciais")).toBeInTheDocument();
    expect(screen.getByTestId("table-acoes-civeis")).toBeInTheDocument();
    expect(screen.queryByTestId(/info-opcional/)).not.toBeInTheDocument();
  });

  it("When opcionalSelected has items, then should render InfoOpcional", () => {
    // Arrange
    const props = {
      personType: "J",
      opcionalSelected: ["emails", "telefones"],
    };

    // Act
    render(renderResultadosInformacoes(props));

    // Assert
    expect(screen.getByTestId("table-restricoes-sinteticas")).toBeInTheDocument();
    expect(screen.getByTestId("table-info-J")).toBeInTheDocument();
    expect(screen.getByTestId("table-participacao-societaria")).toBeInTheDocument();
    expect(screen.getByTestId("table-info-alertas-restricoes")).toBeInTheDocument();
    expect(screen.getByTestId("table-passagens-comerciais")).toBeInTheDocument();
    expect(screen.getByTestId("table-acoes-civeis")).toBeInTheDocument();
    expect(screen.getByTestId("info-opcional-J-emails,telefones")).toBeInTheDocument();
  });
});
