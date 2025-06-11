'use client'
import React from 'react'
import ChartLegendItem from '@/components/molecules/AdminMolecules/Painel/ChartLegendItem/ChartLegendItem';


interface CostEvolutionChartSectionProps {
  title: string;
  legendItems: { label: string; color: string }[];
  // Add any props related to chart data here
}

const CostEvolutionChartSection: React.FC<CostEvolutionChartSectionProps> = ({
  title,
  legendItems,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {legendItems.map((item, index) => (
          <ChartLegendItem key={index} label={item.label} color={item.color} />
        ))}
      </div>
      {/* Placeholder para o componente do gráfico real */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
      [ add grafico ]
      </div>
    </div>
  );
};

export default CostEvolutionChartSection;