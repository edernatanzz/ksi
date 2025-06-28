'use client'

import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

interface PassagemComercial {
    data: string
    tipo: string
    valor: string
    status: string
}

interface TablePassagemComercialProps {
    data: PassagemComercial[]
}

export function TablePassagemComercial({ data }: TablePassagemComercialProps) {
    return (
        <TableContainer component={Paper} elevation={1}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                        <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Valor</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((passagem, index) => (
                            <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" } }}>
                                <TableCell>{passagem.data}</TableCell>
                                <TableCell>{passagem.tipo}</TableCell>
                                <TableCell>{passagem.valor}</TableCell>
                                <TableCell>{passagem.status}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography variant="body1" color="text.secondary">
                                    Nenhuma informação encontrada na base
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
