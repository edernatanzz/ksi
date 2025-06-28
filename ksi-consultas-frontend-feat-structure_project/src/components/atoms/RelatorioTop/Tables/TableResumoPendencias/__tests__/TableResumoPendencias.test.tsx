import { render, screen, within } from '@testing-library/react';
import { TableResumoPendencias } from '../TableResumoPendencias';

describe('TableResumoPendencias', () => {
    describe('When rendering the table', () => {
      it('then should display the correct header and data', () => {
        // Arrange
        render(<TableResumoPendencias />);
  
        // Act - rendering is the action
  
        // Assert
        // Check title
        expect(screen.getByText('Resumo')).toBeInTheDocument();
  
        // Check header
        expect(screen.getByText('Descrição')).toBeInTheDocument();
        expect(screen.getByText('Quantidade')).toBeInTheDocument();
        expect(screen.getByText('Valor Total')).toBeInTheDocument();
  
        // Check data rows
        const rows = screen.getAllByRole('row');
        
        // First data row
        const firstRowCells = within(rows[1]).getAllByRole('cell');
        expect(firstRowCells[0]).toHaveTextContent('RGI do Brasil');
        expect(firstRowCells[1]).toHaveTextContent('4');
        expect(firstRowCells[2]).toHaveTextContent('R$ 7.893,23');
  
        // Second data row
        const secondRowCells = within(rows[2]).getAllByRole('cell');
        expect(secondRowCells[0]).toHaveTextContent('Cheque sem fundo');
        expect(secondRowCells[1]).toHaveTextContent('0');
        expect(secondRowCells[2]).toHaveTextContent('-');
  
        // Third data row
        const thirdRowCells = within(rows[3]).getAllByRole('cell');
        expect(thirdRowCells[0]).toHaveTextContent('Protesto Nacional Cenprot');
        expect(thirdRowCells[1]).toHaveTextContent('0');
        expect(thirdRowCells[2]).toHaveTextContent('-');
      });
      
    it('then should apply correct styling to header', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      const headerCells = screen.getAllByRole('columnheader');
      expect(headerCells[0]).toHaveClass('text-white');
      expect(headerCells[0]).toHaveClass('font-bold');
      expect(headerCells[1]).toHaveClass('text-white');
      expect(headerCells[1]).toHaveClass('font-bold');
      expect(headerCells[2]).toHaveClass('text-white');
      expect(headerCells[2]).toHaveClass('font-bold');
    });

    it('then should apply alternating row colors', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      const dataRow1 = rows[1];
      const dataRow2 = rows[2];
      const dataRow3 = rows[3];

      expect(dataRow1).toHaveClass('bg-secondary-100');
      expect(dataRow2).not.toHaveClass('bg-secondary-100');
      expect(dataRow3).toHaveClass('bg-secondary-100');
    });

    it('then should format currency values correctly', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      expect(screen.getByText('R$ 7.893,23')).toBeInTheDocument();
    });

    it('then should display dash for zero values', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      const dashes = screen.getAllByText('-');
      expect(dashes.length).toBe(2);
    });
  });

  describe('When checking table structure', () => {
    it('then should have the correct number of rows', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      const rows = screen.getAllByRole('row');
      // 1 header row + 3 data rows
      expect(rows.length).toBe(4);
    });

    it('then should have the correct number of cells in each row', () => {
      // Arrange
      render(<TableResumoPendencias />);

      // Act - rendering is the action

      // Assert
      const rows = screen.getAllByRole('row');
      // Header row
      expect(rows[0].querySelectorAll('th, td').length).toBe(3);
      // Data rows
      expect(rows[1].querySelectorAll('th, td').length).toBe(3);
      expect(rows[2].querySelectorAll('th, td').length).toBe(3);
      expect(rows[3].querySelectorAll('th, td').length).toBe(3);
    });
  });
});