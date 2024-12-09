import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PhoneModel } from '../../types';
import ModelCard from '../ModelCard';

interface ModelGroupProps {
  name: string;
  models: PhoneModel[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelectModel: (modelId: string) => void;
}

const ModelGroup: React.FC<ModelGroupProps> = ({
  name,
  models,
  isExpanded,
  onToggle,
  onSelectModel
}) => {
  if (models.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">{name}</span>
          <span className="text-sm text-gray-500">({models.length})</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="divide-y border-t border-gray-100">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onClick={onSelectModel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelGroup;