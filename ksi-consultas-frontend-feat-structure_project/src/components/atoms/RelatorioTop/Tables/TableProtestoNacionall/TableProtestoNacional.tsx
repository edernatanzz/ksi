import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper, Typography } from "@mui/material";

interface DataRow {
    data: string;
    contrato: string;
    informante: string;
    valor: number;
}

export const rows: DataRow[] = [];

export function TableProtestoNacional() {
    return (
        <div>
            <h3 className="p-2 flex justify-center align-itens">Protesto Nacional Cenprot:</h3>
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
                {rows.length > 0 ? (
                            rows.map((row, index) => (
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
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1" color="text.secondary">
                                        Documento sem registro no Protesto Nacional.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}