import { render, screen } from "@testing-library/react";
import TablePassagemComerciais from "@/components/atoms/RelatorioTop/Tables/TablePassagensComerciais/TablePassagensComerciais";
import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";

// Mock do TableNoInfo para verificar quando é renderizado
vi.mock("@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo", () => ({
  __esModule: true,
  default: vi.fn(({ text }) => (
    <tr>
      <td colSpan={4} align="center">
        {text}
      </td>
    </tr>
  )),
}));

describe("TablePassagemComerciais", () => {
  describe("When there are commercial passages data, then it should render the table with correct data", () => {
    it("should render the table with headers and data rows", () => {
      // Arrange
      render(<TablePassagemComerciais />);
      
      // Act - renderização já ocorreu no Arrange
      
      // Assert
      // Verifica o título
      expect(screen.getByText("Passagens Comerciais")).toBeInTheDocument();
      
      // Verifica os headers da tabela
      expect(screen.getByText("Data")).toBeInTheDocument();
      expect(screen.getByText("Descrição")).toBeInTheDocument();
      
      // Verifica os dados da tabela
      expect(screen.getByText("19/05/2025")).toBeInTheDocument();
      const allDescriptions = screen.getAllByText("CAIXA ECONOMICA FEDERAL");
      expect(allDescriptions.length).toBe(3);
    });

    it("should apply correct styling to table elements", () => {
      // Arrange
      render(<TablePassagemComerciais />);
      
      // Act - renderização já ocorreu no Arrange
      
      // Assert
      // Verifica estilização do header
      const headerCells = screen.getAllByRole("columnheader");
      expect(headerCells[0]).toHaveClass("text-white");
      expect(headerCells[0]).toHaveClass("font-bold");
      
      // Verifica zebrado das linhas
      const rows = screen.getAllByRole("row").slice(1); // Ignora o header
      expect(rows[0]).toHaveClass("bg-secondary-100");
      expect(rows[1]).toHaveClass("bg-white");
      expect(rows[2]).toHaveClass("bg-secondary-100");
    });
  });

  describe("When there are no commercial passages data, then it should render the no info message", () => {
    it("should render TableNoInfo when rows are empty", () => {
      // Arrange
      // Não é mais necessário mockar o módulo, basta passar rows vazio
      
      // Act
      render(<TablePassagemComerciais rows={[]} />);
      
      // Assert
      expect(TableNoInfo).toHaveBeenCalledWith({ text: "Nada consta" }, undefined);
    });
  });
});