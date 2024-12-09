import React from 'react';
import { PhoneModel } from '../../types';

interface ModelCardProps {
  model: PhoneModel;
  onClick: (modelId: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  return (
    <button
      onClick={() => onClick(model.id)}
      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
    >
      <span className="text-gray-700 hover:text-blue-600">
        {model.name}
      </span>
    </button>
  );
};

export default ModelCard;