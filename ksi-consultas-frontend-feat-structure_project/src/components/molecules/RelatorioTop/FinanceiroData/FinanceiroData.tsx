import { Card, CardContent, CardHeader } from "@mui/material";
import { ScoreIndicator } from "@/components/atoms/RelatorioTop/ScoreIndicator/ScoreIndicator";
import { ProgressBar } from "@/components/atoms/RelatorioTop/ProgressBar/ProgressBar";

interface FinanceiroDataProps {
    rendaEstimada: number
    limiteDeCredito: number
    pontualidade: number
    scorePositivo: number
    personType: string
}

export function FinanceiroData({rendaEstimada, limiteDeCredito, pontualidade, scorePositivo, personType}: FinanceiroDataProps) {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
  }

    return (
        <div className="lg:w-2/3">
            <Card className="bg-secondary-100 w-full">
                <CardHeader title="Dados financeiros" className="pb-2 text-lg"/>
                <CardContent className="space-y-4">
                    <div>
                    <div className="text-sm text-gray-500 mb-1">Score Positivo</div>
                    <ScoreIndicator score={scorePositivo} />
                    </div>

                    <div>
                    <div className="text-sm text-gray-500 mb-1">Pontualidade de Pagamento</div>
                    <ProgressBar value={pontualidade} max={100} label={`${pontualidade}%`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Limite De Crédito</div>
                        <div className="font-medium">{formatCurrency(limiteDeCredito)}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-1"> {" "}{personType === "fisica" ? "Renda presumida" : "Faturamento presumido"}</div>
                        <div className="font-medium">{formatCurrency(rendaEstimada)}</div>
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}