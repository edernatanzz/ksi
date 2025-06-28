import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";

interface TableInfoProps {
    personType: string;
}

function createData(
    descricao: string,
    resultado: string | number,
 ) {
    return { descricao, resultado };
}

export const rows = [
    createData("Cliente Premium:", "Não"),
    createData("Classe Social:", "C2"),
    createData("Recuperação Judicial e Falência :", "Nada consta"),
 ];
 
 export const rows1 = [
    createData("Atividade Social:", "Não informado"),
    createData("Capital Social:", 0),
 ]

 export default function TableInfo({personType}: TableInfoProps) {
    // Não renderizar nada se o tipo de pessoa não for válido
    if (personType !== "fisica" && personType !== "juridica") {
        return null;
    }

    return(
        <TableContainer className="mb-4 bg-secondary-25" component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                {personType === "fisica" && (
                    rows.length > 0 ? (
                        rows.map((row, index) => (
                            <TableRow
                                key={row.descricao}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                            >
                                <TableCell component="th" scope="row">{row.descricao}</TableCell>
                                <TableCell align="right">{row.resultado}</TableCell>
                            </TableRow>
                            ))
                    ) : (
                        <TableNoInfo text="Nada consta"/>
                    ))}
                {personType === "juridica" && (
                    rows1.length > 0 ? (
                        rows1.map((row, index) => (
                            <TableRow
                                key={row.descricao}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                            >
                                <TableCell component="th" scope="row">{row.descricao}</TableCell>
                                <TableCell align="right">{row.resultado}</TableCell>
                            </TableRow>
                            ))
                    ) : (
                        <TableNoInfo text="Nada consta"/>
                    ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}