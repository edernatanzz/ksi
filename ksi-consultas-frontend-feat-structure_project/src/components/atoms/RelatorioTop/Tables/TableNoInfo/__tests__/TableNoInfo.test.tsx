import { render, screen } from "@testing-library/react";
import TableNoInfo from "../TableNoInfo";
import { describe, it, expect } from "vitest";

describe("TableNoInfo", () => {
    it('When rendered with text, then should display the text in a table cell', () => {
        render(<TableNoInfo text={"Test message"} />);
        
        const tableCell = screen.getByRole('cell');
        const typography = screen.getByText("Test message");
      
        expect(tableCell).toBeInTheDocument();
        expect(tableCell).toHaveAttribute("colSpan", "4");
        expect(tableCell).toHaveStyle({ textAlign: 'center' });
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("Test message");
      });

  it("When rendered, then should have correct MUI components structure", () => {
    // Arrange
    const testText = "Test message";

    // Act
    const { container } = render(
      <table>
        <tbody>
          <TableNoInfo text={testText} />
        </tbody>
      </table>
    );

    // Assert
    const tableRow = container.querySelector("tr");
    const tableCell = tableRow?.querySelector("td");
    const typography = tableCell?.querySelector(".MuiTypography-body1");

    expect(tableRow).toHaveClass('MuiTableRow-root');
    expect(tableCell).toHaveClass('MuiTableCell-root');
    expect(typography).toBeInTheDocument();
  });
});