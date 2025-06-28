import { render, screen } from "@testing-library/react";
import TableInfo from "../TableInfo";   
import { rows, rows1 } from "../TableInfo";

describe("TableInfo", () => {
  describe("When personType is 'fisica' and has data", () => {
    it("then should render the correct rows with alternating background colors", () => {
      // Arrange
      const personType = "fisica";

      // Act
      render(<TableInfo personType={personType} />);

      // Assert
      expect(screen.getByText("Cliente Premium:")).toBeInTheDocument();
      expect(screen.getByText("Não")).toBeInTheDocument();
      expect(screen.getByText("Classe Social:")).toBeInTheDocument();
      expect(screen.getByText("C2")).toBeInTheDocument();
      expect(screen.getByText("Recuperação Judicial e Falência :")).toBeInTheDocument();
      expect(screen.getByText("Nada consta")).toBeInTheDocument();

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(3);

      // Check alternating row colors
      expect(rows[0]).toHaveClass("bg-secondary-100");
      expect(rows[1]).toHaveClass("bg-white");
      expect(rows[2]).toHaveClass("bg-secondary-100");
    });
  });

  describe("When personType is 'juridica' and has data", () => {
    it("then should render the correct rows with alternating background colors", () => {
      // Arrange
      const personType = "juridica";

      // Act
      render(<TableInfo personType={personType} />);

      // Assert
      expect(screen.getByText("Atividade Social:")).toBeInTheDocument();
      expect(screen.getByText("Não informado")).toBeInTheDocument();
      expect(screen.getByText("Capital Social:")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(2);

      // Check alternating row colors
      expect(rows[0]).toHaveClass("bg-secondary-100");
      expect(rows[1]).toHaveClass("bg-white");
    });
  });

  describe("When personType is 'fisica' and has no data", () => {
    it("then should render TableNoInfo component", () => {
      // Arrange
      const personType = "fisica";
      const originalRows = rows;
      rows.length = 0;

      // Act
      render(<TableInfo personType={personType} />);

      // Assert
      expect(screen.getByText("Nada consta")).toBeInTheDocument();

      // Cleanup
      rows.length = originalRows.length;
    });
  });

  describe("When personType is 'juridica' and has no data", () => {
    it("then should render TableNoInfo component", () => {
      // Arrange
      const personType = "juridica";
      const originalRows1 = rows1;
      rows1.length = 0;

      // Act
      render(<TableInfo personType={personType} />);

      // Assert
      expect(screen.getByText("Nada consta")).toBeInTheDocument();

      // Cleanup
      rows1.length = originalRows1.length;
    });
  });

  describe("When personType is invalid", () => {
    it("then should render nothing", () => {
      // Arrange
      const personType = "invalid";
  
      // Act
      const { container } = render(<TableInfo personType={personType} />);
  
      // Assert
      expect(container.firstChild).toBeNull();
    });
  });
});