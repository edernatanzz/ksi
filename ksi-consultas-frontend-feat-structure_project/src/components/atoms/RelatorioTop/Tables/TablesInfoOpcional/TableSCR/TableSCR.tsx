"use client"

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import TableNoInfo from "../../TableNoInfo/TableNoInfo";

interface DataTable {
    item: string;
    value: number | string;
    percent?: number;
}

function SCRData(
    item: string,
    value: number | string,
): DataTable {
    return { item, value };
}

const resumoSCR = [
    SCRData('Inicio de Relacionamento:', '31/12/1972'),
    SCRData('Quantidade de Instituições:', 2),
    SCRData('Quantidade de Operações:', 28),
    SCRData('Quantidade de Operações com Manifestação por Discordância:', 0),
    SCRData('Quantidade de Operações Amparadas por Sub-Judice:', 0),
]

const scoreSCR = [
    SCRData('Score:', '950 Pontos'),
    SCRData('Faixa:', 950),
]

const pontuacaoSCR = [
    SCRData('Péssimo:', '0 a 200 Pontos'),
    SCRData('Ruim:', '201 a 400 Pontos'),
    SCRData('Regular:', '401 a 600 Pontos'),
    SCRData('Bom:', '601 a 800 Pontos'),
    SCRData('Ótimo:', '801 a 1000 Pontos'),
]

const carteiraSCR = [
    SCRData('Valor a pagar (A):', 3476.97),
    SCRData('Dívidas não pagas (B):', 0),
    SCRData('Prejuízo ao sistema finaceiro (C):', 0),
    SCRData('Total (A + B + C):', 3476.97),
    SCRData('Limite de Crédito:', 7222.44),
]

function carteiraSCRDetalhadaData(
    item: string,
    value: number,
    percent: number,
): DataTable {
    return { item, value, percent };
}

const carteiraSCRDetalhada = [
    carteiraSCRDetalhadaData('Creditos a vencer ate 30 dias', 5.33, 0.05),
    carteiraSCRDetalhadaData('Creditos a vencer de 31 a 60 dias',  163.15, 1.52),
    carteiraSCRDetalhadaData('Creditos a vencer de 61 a 90 dias', 35.26, 0.33),
]

const carteiraSCRDetalhada2 = [
    carteiraSCRDetalhadaData('Creditos a vencer ate 30 dias', 2524.56, 23.60),
    carteiraSCRDetalhadaData('Creditos a vencer de 31 a 60 dias',  471.03, 4.40),
    carteiraSCRDetalhadaData('Creditos a vencer de 61 a 90 dias', 277.64, 2.59),
]

const carteiraSCRDetalhada3 = [
    carteiraSCRDetalhadaData('Limite de credito com vencimento ate 360 dias', 7222.44, 67.50),
]

export default function TableSCR() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h3>SCR - Banco Central</h3>
            <h4>Resumo</h4>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Descrição</TableCell>
                            <TableCell className="text-white font-bold">+ Informações:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                        {resumoSCR.length > 0 ? (
                            resumoSCR.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.value === 0 ? (
                                            <Typography variant="body2" className="bg-green-500 font-bold flex w-fit px-1 rounded-lg">Nada consta</Typography>
                                        ) : (
                                            row.value
                                        )}
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <h4>Score</h4>
            <TableContainer className=" w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {scoreSCR.length > 0 ? (
                            scoreSCR.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Number(row.value) <= 200 ? (
                                                <span className="text-red-500 font-bold">Péssimo</span>
                                            ) : Number(row.value) <= 400 ? (
                                                <span className="text-orange-500 font-bold">Ruim</span>
                                            ) : Number(row.value) <= 600 ? (
                                                <span className="text-yellow-500 font-bold">Regular</span>
                                            ) : Number(row.value) <= 800 ? (
                                                <span className="text-blue-500 font-bold">Bom</span>
                                            ) : Number(row.value) <= 1000 ?(
                                                <span className="text-green-500 font-bold">Ótimo</span>
                                            ) : (
                                                <span className="font-bold">{row.value}</span>
                                        )}  
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <h4>Pontuação</h4>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {pontuacaoSCR.length > 0 ? (
                            pontuacaoSCR.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <h3>Carteira de Crédito</h3>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {carteiraSCR.length > 0 ? (
                            carteiraSCR.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Number(row.value) > 0
                                            ? row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <h4>Carteira de Crédito Detalhada</h4>
            <TableContainer className="mb-4 w-full" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Emprestimos:</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#475569" }}>
                            <TableCell className="text-white font-bold">Cartão de crédito? Compra, fatura parcelada ou saque financiado pela instituição eminente do cartão</TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada.reduce((acc, row) => acc + Number(row.value), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada.reduce((acc, row) => acc + (row.percent || 0), 0).toFixed(2)}%
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {carteiraSCRDetalhada.length > 0 ? (
                            carteiraSCRDetalhada.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Number(row.value) > 0
                                                ? row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.percent && Number(row.percent) > 0
                                            ? `${row.percent.toFixed(2)}%`
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>

                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Outros Créditos:</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#475569" }}>
                            <TableCell className="text-white font-bold">Cartão de crédito - Compra a vista e parcelado lojista</TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada2.reduce((acc, row) => acc + Number(row.value), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada2.reduce((acc, row) => acc + (row.percent || 0), 0).toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {carteiraSCRDetalhada2.length > 0 ? (
                            carteiraSCRDetalhada2.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Number(row.value) > 0
                                                ? row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.percent && Number(row.percent) > 0
                                            ? `${row.percent.toFixed(2)}%`
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>

                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Limites:</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#475569" }}>
                            <TableCell className="text-white font-bold">Cartão de Crédito</TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada3.reduce((acc, row) => acc + Number(row.value), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </TableCell>
                            <TableCell className="text-white font-bold">
                                {carteiraSCRDetalhada3.reduce((acc, row) => acc + (row.percent || 0), 0).toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#FFFCF9" }}>
                        {carteiraSCRDetalhada3.length > 0 ? (
                            carteiraSCRDetalhada3.map((row, index) => (
                                <TableRow
                                    key={row.item}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.item}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Number(row.value) > 0
                                                ? row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.percent && Number(row.percent) > 0
                                            ? `${row.percent.toFixed(2)}%`
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableNoInfo text="Nada consta no SCR - Banco Central"/>
                        )}
                    </TableBody>

                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#112331" }}>
                            <TableCell className="text-white font-bold">Empréstimos com garantia:</TableCell>
                            <TableCell className="text-white font-bold">R$ 0,00</TableCell>
                            <TableCell className="text-white font-bold"></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

            
        </div>
    )
}