import React from 'react';
import { Camera, ChevronRight } from 'lucide-react';

const brands = [
  { id: 'apple', name: 'Apple', models: [] },
  { id: 'asus', name: 'Asus', models: [] },
  { id: 'huawei', name: 'Huawei', models: [] },
  { id: 'lenovo', name: 'Lenovo', models: [] },
  { id: 'lg', name: 'LG', models: [] },
  { id: 'microsoft', name: 'Microsoft', models: [] },
  { id: 'motorola', name: 'Motorola', models: [] },
  { id: 'nokia', name: 'Nokia', models: [] },
  { id: 'realme', name: 'Realme', models: [] },
  { id: 'samsung', name: 'Samsung', models: [] },
  { id: 'sony', name: 'Sony', models: [] },
  { id: 'xiaomi', name: 'Xiaomi', models: [] }
];

const BrandCategories = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Escolha a marca do seu celular</h1>
        <p className="text-gray-600">Selecione a marca para ver os modelos disponíveis</p>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <button className="w-full p-4 text-left flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gray-400" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-600">
                  {brand.name}
                </span>
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