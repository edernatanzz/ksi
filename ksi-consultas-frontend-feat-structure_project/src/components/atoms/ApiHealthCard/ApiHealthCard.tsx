import { ApiDataItem, ApiStatus } from '@/types/api';
import React from 'react';


interface ApiHealthCardProps {
  api: ApiDataItem;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const ApiHealthCard: React.FC<ApiHealthCardProps> = ({
  api,
  isSelected,
  onClick,
}) => {
  const getStatusColor = (status: ApiStatus) => {
    switch (status) {
      case 'healthy': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'slow': return 'bg-orange-200';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 w-full h-28 ${
        isSelected 
          ? 'ring-2 ring-primary-500 transform scale-105 shadow-lg' 
          : 'hover:transform hover:scale-102 hover:shadow-md'
      }`}
      onClick={() => onClick(api.id)}
    >
      <div className={`w-full h-full rounded-xl p-3 ${getStatusColor(api.status)} opacity-80 hover:opacity-100 transition-opacity`}>
        <div className="flex flex-col justify-between h-full text-gray-900">
          <div>
            <div className="text-xs font-medium opacity-90">{api.provider}</div>
            <div className="text-sm font-semibold">{api.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xs">{api.usage}%</div>
            <div className="text-xs opacity-80">{api.latency}ms</div>
          </div>
        </div>
      </div>
      
      {/* Pulse animation for critical APIs */}
      {api.status === 'error' && (
        <div className="absolute inset-0 rounded-xl bg-red-500 opacity-30 animate-pulse"></div>
      )}
    </div>
  );
};

export default ApiHealthCard; 