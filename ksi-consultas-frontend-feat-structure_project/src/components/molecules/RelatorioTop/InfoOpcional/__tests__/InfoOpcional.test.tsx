import { render, screen } from "@testing-library/react";
import InfoOpcional from "../InfoOpcional";

// Mock dos componentes filhos
vi.mock("@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableRendaFamiliar/TableRendaFamiliar", () => ({
  default: () => <div>Mock Renda Familiar</div>,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableAcoesJudiciais/TableAcoesJudiciais", () => ({
  default: () => <div>Mock Ações Judiciais</div>,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableSCR/TableSCR", () => ({
  default: () => <div>Mock SCR</div>,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableCadin/TableCadin", () => ({
  default: () => <div>Mock Cadin</div>,
}));
vi.mock("@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableObito/TableObito", () => ({
  default: () => <div>Mock Óbito</div>,
}));

describe("InfoOpcional", () => {
  it("When no options are selected, then it should render only the title", () => {
    // Arrange
    const props = { opcionalSelected: [], personType: "PF" };

    // Act
    render(<InfoOpcional {...props} />);

    // Assert
    expect(screen.getByText("Informações Opcionais")).toBeInTheDocument();
    expect(screen.queryByText(/Mock/)).not.toBeInTheDocument();
  });

  it("When 'rendaFamiliar' is selected, then it should render TableRendaFamiliar", () => {
    // Arrange
    const props = { opcionalSelected: ["rendaFamiliar"], personType: "PF" };

    // Act
    render(<InfoOpcional {...props} />);

    // Assert
    expect(screen.getByText("Mock Renda Familiar")).toBeInTheDocument();
  });

  it("When 'acaoJudicial' is selected, then it should render TableAcoesJudiciais", () => {
    render(<InfoOpcional opcionalSelected={["acaoJudicial"]} personType="PF" />);
    expect(screen.getByText("Mock Ações Judiciais")).toBeInTheDocument();
  });

  it("When 'SCR' is selected, then it should render TableSCR", () => {
    render(<InfoOpcional opcionalSelected={["SCR"]} personType="PF" />);
    expect(screen.getByText("Mock SCR")).toBeInTheDocument();
  });

  it("When 'cadin' is selected, then it should render TableCadin", () => {
    render(<InfoOpcional opcionalSelected={["cadin"]} personType="PF" />);
    expect(screen.getByText("Mock Cadin")).toBeInTheDocument();
  });

  it("When 'obito' is selected, then it should render TableObito", () => {
    render(<InfoOpcional opcionalSelected={["obito"]} personType="PF" />);
    expect(screen.getByText("Mock Óbito")).toBeInTheDocument();
  });

  it("When multiple options are selected, then it should render all corresponding components", () => {
    // Arrange
    const props = {
      opcionalSelected: ["rendaFamiliar", "acaoJudicial", "SCR", "cadin", "obito"],
      personType: "PJ",
    };

    // Act
    render(<InfoOpcional {...props} />);

    // Assert
    expect(screen.getByText("Mock Renda Familiar")).toBeInTheDocument();
    expect(screen.getByText("Mock Ações Judiciais")).toBeInTheDocument();
    expect(screen.getByText("Mock SCR")).toBeInTheDocument();
    expect(screen.getByText("Mock Cadin")).toBeInTheDocument();
    expect(screen.getByText("Mock Óbito")).toBeInTheDocument();
  });
});
