import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TableParticipacaoSocietaria from "@/components/atoms/RelatorioTop/Tables/TableParticipacaoSocietaria/TableParticipacaoSocietaria";
import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";

// Mock do componente TableNoInfo com estrutura correta
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

describe("TableParticipacaoSocietaria", () => {
  describe("When there are no data rows", () => {
    it("should render the no info message", () => {
      // Act
      render(<TableParticipacaoSocietaria rows={[]} />);

      // Assert
      expect(screen.getByText("Não consta participação societária")).toBeInTheDocument();
    });

    it("should render the correct table headers", () => {
      // Arrange
      const expectedHeaders = ["Nome", "Documento"];

      // Act
      render(<TableParticipacaoSocietaria rows={[]} />);

      // Assert
      const headerCells = screen.getAllByRole("columnheader");
      expect(headerCells).toHaveLength(2);
      expect(headerCells[0]).toHaveTextContent(expectedHeaders[0]);
      expect(headerCells[1]).toHaveTextContent(expectedHeaders[1]);
    });

    it("should render the TableNoInfo component with correct props", () => {
      // Act
      render(<TableParticipacaoSocietaria rows={[]} />);

      // Assert
      expect(TableNoInfo).toHaveBeenCalledWith(
        { text: "Não consta participação societária" },
        undefined
      );
    });
  });

  describe("When there are data rows", () => {
    const mockRows = [
      { data: "Empresa A", resultado: "123456789" },
      { data: "Empresa B", resultado: "987654321" },
    ];

    beforeEach(() => {
      vi.resetAllMocks();
    });

    it("should render the correct number of rows", () => {
      // Act
      render(<TableParticipacaoSocietaria rows={mockRows} />);

      // Assert
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(3); // 2 data rows + 1 header row
    });

    it("should render the row data correctly", () => {
      // Act
      render(<TableParticipacaoSocietaria rows={mockRows} />);

      // Assert
      expect(screen.getByText("Empresa A")).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
      expect(screen.getByText("Empresa B")).toBeInTheDocument();
      expect(screen.getByText("987654321")).toBeInTheDocument();
    });
  });

  it("should have the correct table styling", () => {
    // Act
    render(<TableParticipacaoSocietaria rows={[]} />);

    // Assert
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("aria-label", "a dense table");
    
    const headerRow = screen.getAllByRole("row")[0];
    expect(headerRow).toHaveStyle({ backgroundColor: "rgb(17, 35, 49)" });
    
    const tableBody = screen.getAllByRole("rowgroup")[1];
    expect(tableBody).toHaveStyle({ backgroundColor: "rgb(241, 245, 249)" });
  });

});