import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableProtestoNacional } from '../TableProtestoNacional';
import { rows } from '../TableProtestoNacional';

describe('TableProtestoNacional', () => {
  it('When rendering with empty rows, then should display "Documento sem registro" message', () => {
    // Arrange
    render(<TableProtestoNacional />);
    
    // Act
    const noDataMessage = screen.getByText(/Documento sem registro no Protesto Nacional./i);
    
    // Assert
    expect(noDataMessage).toBeInTheDocument();
  });

  it('When rendering with empty rows, then should display correct header columns', () => {
    // Arrange
    render(<TableProtestoNacional />);
    
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
  });

  it('When rendering with rows, then should display all data rows', () => {
    // Arrange - Mock data
    const mockRows = [
      {
        data: '01/01/2023',
        contrato: 'CT001',
        informante: 'Empresa A',
        valor: 1000.50
      },
      {
        data: '02/01/2023',
        contrato: 'CT002',
        informante: 'Empresa B',
        valor: 2000.75
      }
    ];
    
    // Temporarily replace the empty rows array
    rows.push(...mockRows);
    
    // Act
    render(<TableProtestoNacional />);
    
    // Assert
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByText('CT001')).toBeInTheDocument();
    expect(screen.getByText('Empresa A')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000,50')).toBeInTheDocument();
    
    expect(screen.getByText('02/01/2023')).toBeInTheDocument();
    expect(screen.getByText('CT002')).toBeInTheDocument();
    expect(screen.getByText('Empresa B')).toBeInTheDocument();
    expect(screen.getByText('R$ 2.000,75')).toBeInTheDocument();
    
    // Cleanup - restore original rows
    rows.length = 0;
  });

  it('When rendering with zero value, then should display hyphen', () => {
    // Arrange - Mock data
    const mockRow = {
      data: '03/01/2023',
      contrato: 'CT003',
      informante: 'Empresa C',
      valor: 0
    };
    
    // Temporarily replace the empty rows array
    rows.push(mockRow);
    
    // Act
    render(<TableProtestoNacional />);
    
    // Assert
    expect(screen.getByText('-')).toBeInTheDocument();
    
    // Cleanup - restore original rows
    rows.length = 0;
  });

  it('When rendering with rows, then should apply alternating row colors', () => {
    // Arrange - Mock data
    const mockRows = [
      {
        data: '01/01/2023',
        contrato: 'CT001',
        informante: 'Empresa A',
        valor: 1000.50
      },
      {
        data: '02/01/2023',
        contrato: 'CT002',
        informante: 'Empresa B',
        valor: 2000.75
      }
    ];
    
    // Temporarily replace the empty rows array
    rows.push(...mockRows);
    
    // Act
    render(<TableProtestoNacional />);
    const rowsElements = screen.getAllByRole('row');
    
    // Assert - Skip header row (index 0)
    expect(rowsElements[1]).toHaveClass('bg-secondary-100'); // even index
    expect(rowsElements[2]).toHaveClass('bg-white'); // odd index
    
    // Cleanup - restore original rows
    rows.length = 0;
  });

  it('When rendering, then should display correct title', () => {
    // Arrange
    render(<TableProtestoNacional />);
    
    // Act
    const title = screen.getByText('Protesto Nacional Cenprot:');
    
    // Assert
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  });
});