'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material"
import Badge from "@/components/atoms/Badge/Badge"

interface LimitInfoTable {
    item: string
    info: string
}

interface LimitInfoTableProps {
    data: LimitInfoTable[]
    title?: string
}

export function LimitInfoTable({ data, title }: LimitInfoTableProps) {
    return(
        <Box>
            {title && (
                <Box sx={{ my: 2, textAlign: "center" }}>
                    <h4 className="text-lg font-bold text-sec">{title}</h4>
                </Box>
            )}
            <TableContainer data-testid="LimitInfoTable" component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                            <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Informações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" } }}>
                                <TableCell>
                                    <Box>
                                        <div className="font-medium">{row.item}</div>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {row.info === "NADA CONSTA" ? (
                                        <Badge
                                            variant="status"
                                            type="active"
                                            className="bg-green-500 text-white text-xs rounded-lg p-0.5 px-2"
                                        >
                                            NADA CONSTA
                                        </Badge>
                                    ) : (
                                        row.info
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}