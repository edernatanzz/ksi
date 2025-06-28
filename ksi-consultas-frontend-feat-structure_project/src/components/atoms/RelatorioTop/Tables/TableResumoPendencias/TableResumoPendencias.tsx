import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper } from "@mui/material";

function createData(
    descricao: string,
    quantidade: number,
    valorTotal: number,
  ) {
    return { descricao, quantidade, valorTotal };
  }
  
  const rows = [
    createData('RGI do Brasil', 4, 7893.23),
    createData('Cheque sem fundo', 0, 0),
    createData('Protesto Nacional Cenprot', 0, 0),
  ];

  export function TableResumoPendencias() {
    return (
        <div>
            <h2 className="flex justify-center align-itens">Resumo</h2>
            <TableContainer className="mb-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#112331" }}>
                    <TableCell className="text-white font-bold">Descrição</TableCell>
                    <TableCell className="text-white font-bold" align="right">Quantidade</TableCell>
                    <TableCell className="text-white font-bold" align="right">Valor Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                    {rows.map((row, index) => (
                    <TableRow
                        key={row.descricao}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                    >
                        <TableCell component="td" scope="row"> {/* Alterado de 'th' para 'td' */}
                        {row.descricao}
                        </TableCell>
                        <TableCell align="right">{row.quantidade}</TableCell>
                        <TableCell align="right">
                        {row.valorTotal > 0
                            ? row.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            : '-'}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>        
    )
}