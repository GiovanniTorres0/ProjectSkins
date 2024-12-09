import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { getBrandById, getModelsByBrand } from '../../config/models';
import ModelCard from '../ModelCard';

interface ModelSelectionProps {
  brandId: string;
  onSelectModel: (modelId: string) => void;
  onBack: () => void;
  className?: string;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  brandId,
  onSelectModel,
  onBack,
  className = ""
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const brand = getBrandById(brandId);
  const models = getModelsByBrand(brandId);

  if (!brand) return null;

  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`max-w-4xl mx-auto p-4 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar para marcas</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-xl">{brand.icon}</span>
          <span>{brand.name}</span>
        </h1>
        <p className="text-gray-600 mt-1">
          Selecione o modelo específico do seu celular
        </p>
      </div>

      {/* Seletor Retrátil */}
      <div className="relative">
        {/* Campo de Busca que abre a lista */}
        <div 
          onClick={() => setIsListOpen(!isListOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer flex items-center justify-between"
        >
          <input
            type="text"
            placeholder="Buscar modelo..."
            value={searchTerm}
            onChange={(e) => {
              e.stopPropagation();
              setSearchTerm(e.target.value);
              setIsListOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsListOpen(true);
            }}
            className="w-full focus:outline-none placeholder-gray-400"
          />
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isListOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>

        {/* Lista Retrátil */}
        {isListOpen && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
            {filteredModels.length > 0 ? (
              <div className="divide-y">
                {filteredModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onClick={(modelId) => {
                      onSelectModel(modelId);
                      setIsListOpen(false);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-3 text-gray-500">
                Nenhum modelo encontrado
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ajuda */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Não encontrou seu modelo? 
        <button className="text-blue-600 hover:underline ml-1">
          Entre em contato conosco
        </button>
      </div>
    </div>
  );
};

export default ModelSelection;