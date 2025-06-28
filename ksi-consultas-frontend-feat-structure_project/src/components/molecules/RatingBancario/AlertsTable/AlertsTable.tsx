'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

interface AlertData {
  info: string
  descricao: string
}

interface AlertsTableProps {
  data: AlertData[]
  title: string
}

export function AlertsTable({ data, title }: AlertsTableProps) {
  return (
    <div>
      <h4 className="font-bold text-gray-700 mb-4">{title}</h4>
      <div className="mb-4">
        <span className="font-bold">✚ Ocorrências :</span>
      </div>
      <TableContainer component={Paper} elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
              <TableCell sx={{ fontWeight: 600 }}>Informação</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9fafb" } }}>
                <TableCell sx={{ fontWeight: 500 }}>{row.info}</TableCell>
                <TableCell>{row.descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}