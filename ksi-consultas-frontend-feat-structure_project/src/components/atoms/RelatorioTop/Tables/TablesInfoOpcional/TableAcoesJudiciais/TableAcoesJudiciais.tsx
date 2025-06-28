import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import  TableNoInfo  from "../../TableNoInfo/TableNoInfo";

interface DataTable {
    item: string;
    value: number | string;
}

function acoesJudiciaisData(
    item: string,
    value: number | string,
): DataTable {
    return { item, value };
}

const resumoAcoesJudiciais = [
    acoesJudiciaisData('Ações Judiciais:', 0),
    acoesJudiciaisData('Ações como Autor:', 0),
    acoesJudiciaisData('Ações como Outro:', 0),
    acoesJudiciaisData('Ações como Réu:', 0),
    acoesJudiciaisData('Data última Ação Judicial:', '-'),
]

const detalhesAcoesJudiciais: DataTable[] = []

export default function TableAcoesJudiciais() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h3>Acões Judiciais</h3>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Resumo</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                        {resumoAcoesJudiciais.length > 0 ? (
                            resumoAcoesJudiciais.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.item}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Não consta ações judiciais"/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <h4>Detalhes</h4>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Ações Judiciais</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                        {detalhesAcoesJudiciais.length > 0 ? (
                                detalhesAcoesJudiciais.map((row, index) => (
                                    <TableRow
                                        key={row.item}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                    >
                                        <TableCell component="th" scope="row">
                                        {row.item}
                                        </TableCell>
                                        <TableCell align="right">{row.value}</TableCell>
                                    </TableRow>
                                    ))
                            ) : (
                                <TableNoInfo text="Não consta ações judiciais"/>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}