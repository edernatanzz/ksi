import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function createData(
    descricao: string,
    resultado: string,
 ) {
    return { descricao, resultado };
 }
 
interface RowData {
  descricao: string;
  resultado: string;
}

interface TablePassagemComerciaisProps {
  rows?: RowData[];
}

export default function TablePassagemComerciais({ rows }: TablePassagemComerciaisProps) {
  const defaultRows = [
    createData("19/05/2025", "CAIXA ECONOMICA FEDERAL"),
    createData("11/04/2025", "CAIXA ECONOMICA FEDERAL"),
    createData("14/03/2025", "CAIXA ECONOMICA FEDERAL"),
 ];
  const dataRows = rows ?? defaultRows;

    return(
        <div>
            <h3 className="p-2 flex justify-center align-itens">Passagens Comerciais</h3>
            <TableContainer className="mb-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#112331" }}>
                        <TableCell className="text-white font-bold">Data</TableCell>
                        <TableCell className="text-white font-bold" align="right">Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                  {dataRows.length > 0 ? (
                          dataRows.map((row, index) => (
                                <TableRow
                                    key={row.descricao}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.descricao}
                                    </TableCell>
                                    <TableCell align="right">{row.resultado}</TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta"/>
                        )}
                </TableBody>
                </Table>
            </TableContainer>        
        </div>
    )
}