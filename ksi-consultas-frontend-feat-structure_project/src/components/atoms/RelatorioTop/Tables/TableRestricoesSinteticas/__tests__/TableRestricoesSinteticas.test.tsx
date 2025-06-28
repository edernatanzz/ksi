import { render, screen } from '@testing-library/react';
import TableRestricoesSinteticas from '../TableRestricoesSinteticas';
import { vi } from 'vitest';

// Mock dos dados originais
const mockRows1 = [
  {
    descricao: 'REGISTRO DE SPC',
    quantidade: 0,
    valorTotal: 0,
    ultimaOcorrencia: '--/--/----',
  },
  {
    descricao: 'PENDENCIAS FINANCEIRAS SERASA',
    quantidade: 8,
    valorTotal: 8484.28,
    ultimaOcorrencia: '05/01/2025',
  },
];

// Mock do módulo original
vi.mock('@/data/restricoesSinteticas', () => ({
  rows1: mockRows1,
}));

describe('TableRestricoesSinteticas', () => {
  describe('When there are restrictions to display', () => {
    it('then renders the table with correct data', () => {
      // Arrange
      const expectedData = mockRows1;

      // Act
      render(<TableRestricoesSinteticas />);

      // Assert
      // Verifica se o título está presente
      expect(screen.getByText('Restrições Sintéticas')).toBeInTheDocument();

      // Verifica os cabeçalhos da tabela
      expect(screen.getByText('Descrição')).toBeInTheDocument();
      expect(screen.getByText('Quantidade')).toBeInTheDocument();
      expect(screen.getByText('Última Ocorrência')).toBeInTheDocument();
      expect(screen.getByText('Valor Total')).toBeInTheDocument();

      // Verifica se os dados são renderizados corretamente
      expectedData.forEach((row) => {
        expect(screen.getByText(row.descricao)).toBeInTheDocument();
        expect(screen.getByText(row.quantidade.toString())).toBeInTheDocument();
        expect(screen.getByText(row.ultimaOcorrencia)).toBeInTheDocument();

        if (row.valorTotal > 0) {
          // Busca o valor formatado diretamente no DOM
          const valorTotalCell = screen.getAllByText(/R\$\s*\d+\.\d+,\d+/).find(
            (element) => element.textContent?.includes('8.484,28')
          );
          expect(valorTotalCell).toBeInTheDocument();
        } else {
          expect(screen.getByText('-')).toBeInTheDocument();
        }
      });

      // Verifica a alternância de cores das linhas
      const dataRows = screen.getAllByRole('row').slice(1); // Ignora o cabeçalho
      expect(dataRows[0]).toHaveClass('bg-secondary-100'); // Linha par
      expect(dataRows[1]).toHaveClass('bg-white'); // Linha ímpar
    });
  });

  describe('When there are no restrictions to display', () => {
    beforeEach(() => {
      // Limpa todos os mocks antes de cada teste
      vi.clearAllMocks();
    });

    it('then renders the TableNoInfo component', async () => {
      // Act
      render(<TableRestricoesSinteticas rows={[]} />);
    
      // Assert
      const noInfoElement = await screen.findByText((content) => {
        return content.includes('Não consta') && content.includes('restrições sintéticas');
      });
      expect(noInfoElement).toBeInTheDocument();
    });
  });

  describe('When rendering the table structure', () => {
    it('then has correct Material-UI components structure', () => {
      // Arrange & Act
      render(<TableRestricoesSinteticas />);
  
      // Assert
      expect(screen.getByRole('table')).toBeInTheDocument();
      
      // Verifica os grupos de linhas (thead e tbody)
      const rowGroups = screen.getAllByRole('rowgroup');
      expect(rowGroups.length).toBe(2);
      
      // Verifica linhas (incluindo cabeçalho)
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(3); // 1 cabeçalho + 2 linhas de dados
      
      // Verifica TODAS as células (incluindo th scope="row")
      const cells = screen.queryAllByRole('cell');
      const rowHeaders = screen.queryAllByRole('rowheader');
      const allDataCells = [...cells, ...rowHeaders];
      expect(allDataCells.length).toBe(8); // 2 linhas × 4 colunas (3 cells + 1 rowheader por linha)
      
      // Verifica cabeçalhos de coluna
      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders.length).toBe(4);
    });
  });
});