import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper } from "@mui/material";

function createData(
    data: string,
    contrato: string,
    informante: string,
    valor: number,
){
    return { data, contrato, informante, valor };
}
  
const rows = [
    createData("05/10/2022", "83C26AD89C66A85E", "NU FINANCEIRA S/A", 526.75),
    createData("05/10/2023", "102130734876", "LOJAS RIACHUELO S/A", 222.05),
    createData("10/08/2022", "10055197544", " BANCO CSF SA ATACADAO",  2816.38),
    createData("26/10/2022", " 0038715615236452690000", "CAIXA ECONOMICA FEDERAL",  4328.05),
];

export function TableRGIPendencias() {
    return (
        <div>
            <h2 className="flex justify-center align-itens">Detalhes</h2>
            <h3 className="p-2 flex justify-center align-itens">RGI - Registro Geral de Inadimplente Do Brasil:</h3>
            <TableContainer className="mb-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#112331" }}>
                        <TableCell className="text-white font-bold">Data</TableCell>
                        <TableCell className="text-white font-bold" align="right">Contrato</TableCell>
                        <TableCell className="text-white font-bold" align="right">Informante</TableCell>
                        <TableCell className="text-white font-bold" align="right">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                    {rows.map((row, index) => (
                    <TableRow
                        key={row.data}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                    >
                        <TableCell component="th" scope="row">{row.data}</TableCell>
                        <TableCell align="right">{row.contrato}</TableCell>
                        <TableCell align="right">{row.informante}</TableCell>
                        <TableCell align="right">
                        {row.valor > 0
                            ? row.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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