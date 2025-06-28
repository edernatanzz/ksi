'use client'

import { Paper, Typography } from "@mui/material"
import { DashboardCard } from "@/components/molecules/DashboardCard/DashboardCard"
import type { DashboardCard as DashboardCardType } from "@/data/dashboard"


interface CreditPortfolioSectionProps {
    personType: string
}

export function CreditPortfolioSection({ }: CreditPortfolioSectionProps) {

    const cards: DashboardCardType[] = [
        {
            id: "",
            title: "VALOR A PAGAR:",
            subtitle: "R$ 3.476,97", //exemplo de valor
            icon: "payments", // ajuste conforme seu DashboardCardType
            path: "#"
        },
        {
            id: "",
            title: "DÍVIDAS NÃO PAGAS:",
            subtitle: "R$ 0,00", //exemplo de valor
            icon: "cancel",
            path: "#"
        },
        {
            id: "",
            title: "PREJUÍZO AO SISTEMA FINANCEIRO:",
            subtitle: "R$ 0,00", //exemplo de valor
            icon: "warning",
            path: "#"
        },
        {
            id: '',
            title: "LIMITE DE CRÉDITO:",
            subtitle: "R$ 7.222,44", //exemplo de valor
            icon: "credit_score",
            path: "#"
        }
    ]

    return (
        <Paper elevation={2} sx={{ p: 3, backgroundColor: "#FFFCF9" }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} className="text-secondary-800">
                Carteira de Crédito
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
                {cards.map((card, idx) => (
                    <div key={idx} className="w-full">
                        <DashboardCard onClick={() => console.log('Card clicked')} card={card} />
                    </div>
                ))}
            </div>
        </Paper>
    )
}