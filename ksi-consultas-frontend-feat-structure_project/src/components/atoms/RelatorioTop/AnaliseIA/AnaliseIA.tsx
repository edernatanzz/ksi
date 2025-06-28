import { Card, CardContent } from "@mui/material"
import { AlertTriangle, BotIcon } from "lucide-react"

export function AnaliseIA(){
  return (
    <Card className="bg-secondary-100 lg:w-2/3">
      <div className="p-2">
        <h1 className="text-lg flex items-center gap-2">
          <span className="text-red-500">
            <AlertTriangle size={18} role="img" aria-label="Alerta"/>
          </span>
          Conclusão Análise Inteligente
        </h1>
      </div>
      <CardContent>
        <div className="flex items-start gap-3">
          <BotIcon size={74} className="text-gray-500" role="img" aria-label="Ícone de robô" />
          <p className="text-sm">
            O crédito não pode ser aprovado devido à quantidade significativa de pendências financeiras registradas e ao
            score de crédito baixo. Recomenda-se regularizar as pendências antes de solicitar um novo crédito.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}