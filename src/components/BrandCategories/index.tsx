import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BRANDS } from '../../config/models';

interface BrandCategoriesProps {
  onSelectBrand: (brandId: string) => void;
  className?: string;
}

const BrandCategories: React.FC<BrandCategoriesProps> = ({ 
  onSelectBrand, 
  className = "" 
}) => {
  return (
    <div className={`max-w-4xl mx-auto p-4 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Escolha a marca do seu celular</h1>
        <p className="text-gray-600">Selecione a marca para ver os modelos disponíveis</p>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <button 
              onClick={() => onSelectBrand(brand.id)}
              className="w-full p-4 text-left flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">
                    {brand.name}
                  </span>
                  <p className="text-sm text-gray-500">
                    {brand.models.length} modelos
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Ajuda */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Não encontrou sua marca? 
        <button className="text-blue-600 hover:underline ml-1">
          Entre em contato conosco
        </button>
      </div>
    </div>
  );
};

export default BrandCategories;