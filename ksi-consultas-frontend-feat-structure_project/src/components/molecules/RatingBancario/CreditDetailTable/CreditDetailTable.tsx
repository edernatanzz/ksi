'use client'

import React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material"

interface CreditItem {
    description: string
    value: string
    percentage: string
}

interface CreditSection {
  resumo: string
  category: string
  items: CreditItem[]
}

interface CreditDetailTableProps {
  data: CreditSection[]
}

export function CreditDetailTable({ data }: CreditDetailTableProps) {
  return (
    <Box>
      <TableContainer component={Paper} elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#112331" }}>
              <TableCell className="text-secondary-50" sx={{ fontWeight: 600, width: "60%" }}>Descrição</TableCell>
              <TableCell className="text-secondary-50" sx={{ fontWeight: 600, textAlign: "right" }}>Valor</TableCell>
              <TableCell className="text-secondary-50" sx={{ fontWeight: 600, textAlign: "right" }}>%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      backgroundColor: "#94a3b8",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      py: 1,
                    }}
                  >
                    {section.category}
                  </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell
                    colSpan={3}
                    sx={{
                      backgroundColor: "#e2e8f0",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      py: 1,
                    }}
                  >
                    {section.resumo}
                  </TableCell>
                </TableRow>
                {section.items.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    <TableCell sx={{ fontSize: "0.875rem" }}>{item.description}</TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", textAlign: "right", fontWeight: 500 }}>
                      {item.value}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", textAlign: "right", fontWeight: 500 }}>
                      {item.percentage}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
