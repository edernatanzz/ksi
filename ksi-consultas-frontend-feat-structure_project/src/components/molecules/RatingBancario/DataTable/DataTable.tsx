'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box } from "@mui/material"
import { CheckCircle } from "lucide-react"

interface DataTable {
    item: string
    quantidade: string
    ultimaOcorrencia: string
    pontuacao: string
    valorTotal: string
}

interface DataTableProps {
    data: DataTable[]
    title?: string
}

export function DataTable({ data, title }: DataTableProps) {
    return(
        <Box>
            {title && (
                <Box sx={{ mb: 2, textAlign: "center" }}>
                    <h4 className="text-lg font-bold text-sec">{title}</h4>
                </Box>
            )}
            <TableContainer data-testid="DataTable" component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                            <TableCell sx={{ fontWeight: 600 }}>Quantidade</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Última Ocorrência</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Pontuação</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Valor Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" } }}>
                                <TableCell>
                                    <Box>
                                        <div className="font-medium">{row.item}</div>
                                        <div className="text-sm text-gray-600">{row.quantidade}</div>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.ultimaOcorrencia}</TableCell>
                                <TableCell>
                                    {row.pontuacao === "APROVADO" ? (
                                        <Chip 
                                        icon={<CheckCircle size={16}/>}
                                        label="APROVADO"
                                        color="success"
                                        size="small"
                                        variant="filled"
                                        />
                                    ) : (
                                        row.pontuacao
                                    )}
                                </TableCell>
                                <TableCell>{row.valorTotal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}