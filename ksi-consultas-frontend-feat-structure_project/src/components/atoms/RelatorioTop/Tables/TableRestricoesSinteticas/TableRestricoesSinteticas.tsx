import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function createData1(
    descricao: string,
    quantidade: number,
    valorTotal: number,
    ultimaOcorrencia: string,
) {
    return { descricao, quantidade, valorTotal, ultimaOcorrencia };
}
    
interface TableRestricoesSinteticasProps {
    rows?: Array<{
        descricao: string;
        quantidade: number;
        valorTotal: number;
        ultimaOcorrencia: string;
    }>;
}

export default function TableRestricoesSinteticas({ 
    rows = [
        createData1('REGISTRO DE SPC', 0, 0, '--/--/----'),
        createData1('PENDENCIAS FINANCEIRAS SERASA', 8, 8484.28, '05/01/2025'),
    ]
}: TableRestricoesSinteticasProps) {
    return(
        <div className="w-full mb-4">
            <h3 className="flex justify-center align-itens">Restrições Sintéticas</h3>
            <TableContainer className="mb-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#112331" }}>
                        <TableCell className="text-white font-bold">Descrição</TableCell>
                        <TableCell className="text-white font-bold" align="right">Quantidade</TableCell>
                        <TableCell className="text-white font-bold" align="right">Última Ocorrência</TableCell>
                        <TableCell className="text-white font-bold" align="right">Valor Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                    {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow
                                    key={row.descricao}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.descricao}
                                    </TableCell>
                                    <TableCell align="right">{row.quantidade}</TableCell>
                                    <TableCell align="right">{row.ultimaOcorrencia}</TableCell>
                                    <TableCell align="right">
                                    {row.valorTotal > 0
                                        ? row.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                        : '-'}
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Não consta restrições sintéticas"/>
                        )}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}