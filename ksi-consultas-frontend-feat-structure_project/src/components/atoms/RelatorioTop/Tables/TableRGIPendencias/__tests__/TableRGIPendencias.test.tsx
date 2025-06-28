import { render, screen } from '@testing-library/react';
import { TableRGIPendencias } from '../TableRGIPendencias';
import { describe, it, expect } from 'vitest';

describe('TableRGIPendencias', () => {
  it('When component is rendered, then it should display the main title and subtitle', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const mainTitle = screen.getByText('Detalhes');
    const subtitle = screen.getByText('RGI - Registro Geral de Inadimplente Do Brasil:');
    
    // Assert
    expect(mainTitle).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('When component is rendered, then it should display table headers correctly', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const dataHeader = screen.getByText('Data');
    const contractHeader = screen.getByText('Contrato');
    const informantHeader = screen.getByText('Informante');
    const valueHeader = screen.getByText('Valor');
    
    // Assert
    expect(dataHeader).toBeInTheDocument();
    expect(contractHeader).toBeInTheDocument();
    expect(informantHeader).toBeInTheDocument();
    expect(valueHeader).toBeInTheDocument();
    expect(dataHeader).toHaveClass('text-white');
    expect(contractHeader).toHaveClass('text-white');
  });

  it('When component is rendered, then it should display all rows with correct data', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const rows = screen.getAllByRole('row');
    // Remove header row
    const dataRows = rows.slice(1);
    
    // Assert
    expect(dataRows).toHaveLength(4);
    expect(screen.getByText('05/10/2022')).toBeInTheDocument();
    expect(screen.getByText('83C26AD89C66A85E')).toBeInTheDocument();
    expect(screen.getByText('NU FINANCEIRA S/A')).toBeInTheDocument();
    expect(screen.getByText('R$ 526,75')).toBeInTheDocument();
  });

  it('When component is rendered, then it should format currency values correctly', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const currencyValues = screen.getAllByText(/R\$/);
    
    // Assert
    expect(currencyValues).toHaveLength(4);
    expect(currencyValues[0]).toHaveTextContent('R$ 526,75');
    expect(currencyValues[1]).toHaveTextContent('R$ 222,05');
    expect(currencyValues[2]).toHaveTextContent('R$ 2.816,38');
    expect(currencyValues[3]).toHaveTextContent('R$ 4.328,05');
  });

  it('When component is rendered, then it should apply alternating row colors', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1);
    
    // Assert
    expect(dataRows[0]).toHaveClass('bg-secondary-100');
    expect(dataRows[1]).toHaveClass('bg-white');
    expect(dataRows[2]).toHaveClass('bg-secondary-100');
    expect(dataRows[3]).toHaveClass('bg-white');
  });

  it('When component is rendered, then table should have proper accessibility attributes', () => {
    // Arrange
    render(<TableRGIPendencias />);
    
    // Act
    const table = screen.getByRole('table');
    const denseAttribute = table.getAttribute('aria-label');
    
    // Assert
    expect(table).toBeInTheDocument();
    expect(denseAttribute).toBe('a dense table');
  });
});