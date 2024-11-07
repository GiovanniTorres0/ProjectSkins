import React, { useState } from 'react';
import PhoneCaseTemplate from './components/PhoneCaseTemplate';
import ImageUploader from './components/ImageUploader';
import { PHONE_MODELS } from './config/PhoneModels';
import './styles/App.css';

type Step = 'case' | 'photos' | 'filters';
type LayoutType = 'full' | 'split-horizontal' | 'split-vertical';

const LAYOUTS = [
  { id: 'full', name: 'Imagem Única' },
  { id: 'split-horizontal', name: 'Dividido Horizontal' },
  { id: 'split-vertical', name: 'Dividido Vertical' }
] as const;

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('case');
  const [selectedModelId, setSelectedModelId] = useState(PHONE_MODELS[0].id);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('full');

  const selectedModel = PHONE_MODELS.find(model => model.id === selectedModelId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Steps Navigation */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setCurrentStep('case')}
              className={`px-4 py-2 ${currentStep === 'case' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            >
              1 • Case
            </button>
            <button
              onClick={() => setCurrentStep('photos')}
              className={`px-4 py-2 ${currentStep === 'photos' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            >
              2 • Fotos
            </button>
            <button
              onClick={() => setCurrentStep('filters')}
              className={`px-4 py-2 ${currentStep === 'filters' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            >
              3 • Filtros
            </button>
          </div>

          {/* Step Content */}
          {currentStep === 'case' && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Escolha o modelo</h2>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                {PHONE_MODELS.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>

              {selectedModel && (
                <div className="w-64 mx-auto">
                  <PhoneCaseTemplate
                    model={selectedModel}
                    image={null}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 'photos' && selectedModel && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Escolha o layout</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {LAYOUTS.map(layout => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id as LayoutType)}
                    className={`p-4 border rounded-lg ${
                      selectedLayout === layout.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    {layout.name}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <PhoneCaseTemplate
                    model={selectedModel}
                    image={uploadedImage}
                    className="w-full max-w-sm mx-auto"
                  />
                  
                  {!uploadedImage && (
                    <ImageUploader
                      onImageSelect={setUploadedImage}
                      className="absolute inset-0"
                    />
                  )}
                </div>

                {uploadedImage && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Preview</h2>
                    <div className="rotate-12 scale-95">
                      <PhoneCaseTemplate
                        model={selectedModel}
                        image={uploadedImage}
                        className="w-full max-w-sm mx-auto shadow-2xl"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep !== 'case' && (
              <button
                onClick={() => setCurrentStep(currentStep === 'filters' ? 'photos' : 'case')}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
            )}
            
            {currentStep !== 'filters' ? (
              <button
                onClick={() => setCurrentStep(currentStep === 'case' ? 'photos' : 'filters')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
              >
                Próximo
              </button>
            ) : (
              uploadedImage && (
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