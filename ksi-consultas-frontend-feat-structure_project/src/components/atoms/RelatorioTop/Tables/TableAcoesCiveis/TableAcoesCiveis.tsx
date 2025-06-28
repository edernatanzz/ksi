import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface DataRow {
    data: string;
    resultado: string;
  }
  
  const rows: DataRow[] = [];

export default function TableAcoesCiveis() {
    return(
        <div>
            <h3 className="p-2 flex justify-center align-itens ">Ações Cíveis</h3>
            <TableContainer className="mb-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#112331" }}>
                        <TableCell className="text-white font-bold">Data</TableCell>
                        <TableCell className="text-white font-bold" align="right">Descrição</TableCell>
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
                                    <TableCell align="right">{row.resultado}</TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Não consta ações cíveis"/>
                        )}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}