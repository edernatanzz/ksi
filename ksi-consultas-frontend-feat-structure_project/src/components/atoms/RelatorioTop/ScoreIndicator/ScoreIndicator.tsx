interface ScoreIndicatorProps {
  score: number
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  // Determina a categoria de risco baseada no score
  let riskCategory = "Alto Risco"
  let colorClass = "text-red-600"

  if (score >= 700) {
    riskCategory = "Baixo Risco"
    colorClass = "text-green-600"
  } else if (score >= 500) {
    riskCategory = "Médio Risco"
    colorClass = "text-yellow-600"
  }

  // Calcula a porcentagem para a barra de progresso (considerando 1000 como máximo)
  const percentage = Math.min(Math.max((score / 1000) * 100, 0), 100)

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="text-2xl font-bold">{score}</div>
        <div className={`text-sm font-medium ${colorClass}`}>{riskCategory}</div>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          style={{ width: `${percentage}%`, display: 'block' }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={1000}
          aria-label="Indicador de score"
          data-testid="score-progress-bar"
        />
      </div>
    </div>
  )
}
