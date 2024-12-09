import React, { useState } from 'react';
import {
  PhoneCaseTemplate,
  ImageUploader,
  BrandCategories,
  ModelSelection
} from './components';
import { getModelById } from './config/models';
import { LAYOUTS } from './config/Layouts';
import { Step, LayoutType, ImageSettings } from './types';
import './styles/App.css';

type ExtendedStep = 'brand' | 'model' | Step;

function App() {
  // Estados
  const [currentStep, setCurrentStep] = useState<ExtendedStep>('brand');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null]);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('full');
  const [imageSettings, setImageSettings] = useState<ImageSettings[]>([
    { scale: 1.2, rotation: 0, position: { x: 0, y: 0 }, aspectRatio: 1 },
    { scale: 1.2, rotation: 0, position: { x: 0, y: 0 }, aspectRatio: 1 }
  ]);

  const selectedModel = selectedModelId ? getModelById(selectedModelId) : null;

  const handleNextStep = () => {
    if (currentStep === 'brand') setCurrentStep('model');
    else if (currentStep === 'model') setCurrentStep('photos');
    else if (currentStep === 'photos') setCurrentStep('filters');
  };

  const handlePreviousStep = () => {
    if (currentStep === 'filters') setCurrentStep('photos');
    else if (currentStep === 'photos') setCurrentStep('model');
    else if (currentStep === 'model') {
      setCurrentStep('brand');
      setSelectedBrandId(null);
    }
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
    setCurrentStep('model');
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setCurrentStep('photos');
  };

  const handleLayoutSelect = (newLayout: LayoutType) => {
    setSelectedLayout(newLayout);
    if (newLayout === 'full') {
      setUploadedImages([uploadedImages[0] || null, null]);
      setImageSettings([
        imageSettings[0],
        { scale: 1.2, rotation: 0, position: { x: 0, y: 0 }, aspectRatio: 1 }
      ]);
    }
  };

  const handleImageUpload = (index: number, image: string) => {
    const newImages = [...uploadedImages];
    newImages[index] = image;
    setUploadedImages(newImages);

    const newSettings = [...imageSettings];
    newSettings[index] = { 
      scale: 1.2, 
      rotation: 0, 
      position: { x: 0, y: 0 }, 
      aspectRatio: 1 
    };
    setImageSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Steps Navigation */}
          <div className="flex mb-6 border-b">
            {[
              { id: 'brand', label: '1 • Marca' },
              { id: 'model', label: '2 • Modelo' },
              { id: 'photos', label: '3 • Fotos' },
              { id: 'filters', label: '4 • Filtros' }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id as ExtendedStep)}
                disabled={!selectedBrandId && step.id !== 'brand'}
                className={`px-4 py-2 ${
                  currentStep === step.id 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500'
                } ${
                  !selectedBrandId && step.id !== 'brand'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:text-blue-500'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 'brand' && (
            <BrandCategories onSelectBrand={handleBrandSelect} />
          )}

          {currentStep === 'model' && selectedBrandId && (
            <ModelSelection
              brandId={selectedBrandId}
              onSelectModel={handleModelSelect}
              onBack={handlePreviousStep}
            />
          )}

          {currentStep === 'photos' && selectedModel && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Escolha o layout</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {LAYOUTS.map(layout => (
                  <button
                    key={layout.id}
                    onClick={() => handleLayoutSelect(layout.id)}
                    className={`p-4 border rounded-lg ${
                      selectedLayout === layout.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    {layout.name}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="relative w-[280px]">
                  <PhoneCaseTemplate
                    model={selectedModel}
                    images={uploadedImages}
                    layout={selectedLayout}
                    imageSettings={imageSettings}
                    setImageSettings={setImageSettings}
                    className="w-full"
                    isEditable={true}
                  />

                  {LAYOUTS.find(l => l.id === selectedLayout)?.areas.map((area, index) => (
                    !uploadedImages[index] && (
                      <div
                        key={index}
                        className="absolute inset-0"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        }}
                      >
                        <ImageUploader
                          onImageSelect={(image) => handleImageUpload(index, image)}
                          className="w-full h-full"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'filters' && selectedModel && uploadedImages[0] && (
            <div>
              {/* Implementar filtros aqui */}
              <h2 className="text-lg font-semibold mb-3">Aplique filtros à sua imagem</h2>
              {/* ... conteúdo dos filtros ... */}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep !== 'brand' && (
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
            )}

            {currentStep !== 'filters' ? (
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
                disabled={
                  (currentStep === 'model' && !selectedModelId) ||
                  (currentStep === 'photos' && !uploadedImages.some(img => img !== null))
                }
              >
                Próximo
              </button>
            ) : (
              uploadedImages[0] && (
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto">
                  Finalizar Pedido
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;