import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableChequeSemFundo } from '../TableChequeSemFundo';

describe('TableChequeSemFundo', () => {
  it('When rendered with no data, then it should display the empty state message', () => {
    // Arrange & Act
    render(<TableChequeSemFundo />);

    // Assert
    expect(
      screen.getByText('Documento sem registro de Cheque Sem Fundo.')
    ).toBeInTheDocument();
  });

  it('When rendered, then it should display the table headers', () => {
    // Arrange & Act
    render(<TableChequeSemFundo />);

    // Assert
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Contrato')).toBeInTheDocument();
    expect(screen.getByText('Informante')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
  });

  it('When rendered, then it should display the table title', () => {
    // Arrange & Act
    render(<TableChequeSemFundo />);

    // Assert
    expect(screen.getByText('Cheque Sem Fundo:')).toBeInTheDocument();
  });
});