import React, { useState } from 'react';
import PhoneCaseTemplate from './components/PhoneCaseTemplate';
import ImageUploader from './components/ImageUploader';
import { PHONE_MODELS } from './config/models';
import { LAYOUTS } from './config/Layouts';
import { Step, LayoutType } from './types';
import './styles/App.css';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('case');
  const [selectedModelId, setSelectedModelId] = useState(PHONE_MODELS[0].id);
  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null]);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('full');
  const [imageSettings, setImageSettings] = useState([
    { scale: 1.2, position: { x: 50, y: 50 } },
    { scale: 1.2, position: { x: 50, y: 50 } }
  ]);

  const selectedModel = PHONE_MODELS.find(model => model.id === selectedModelId);

  const handleNextStep = () => {
    if (currentStep === 'case') setCurrentStep('photos');
    else if (currentStep === 'photos') setCurrentStep('filters');
  };

  const handlePreviousStep = () => {
    if (currentStep === 'filters') setCurrentStep('photos');
    else if (currentStep === 'photos') setCurrentStep('case');
  };

  const handleLayoutSelect = (newLayout: LayoutType) => {
    setSelectedLayout(newLayout);
    if (newLayout === 'full') {
      setUploadedImages([uploadedImages[0] || null, null]);
      setImageSettings([
        imageSettings[0],
        { scale: 1.2, position: { x: 50, y: 50 } }
      ]);
    } else if (uploadedImages.every(img => img === null)) {
      setUploadedImages([null, null]);
      setImageSettings([
        { scale: 1.2, position: { x: 50, y: 50 } },
        { scale: 1.2, position: { x: 50, y: 50 } }
      ]);
    }
  };

  const handleImageUpload = (index: number, image: string) => {
    const newImages = [...uploadedImages];
    newImages[index] = image;
    setUploadedImages(newImages);

    const newSettings = [...imageSettings];
    newSettings[index] = { scale: 1.2, position: { x: 50, y: 50 } };
    setImageSettings(newSettings);
  };

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
                    images={[null, null]}  // Não precisa mostrar imagens no preview
                    layout="full"
                    imageSettings={imageSettings}
                    className="w-full"
                    isEditable={false}
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
                    onClick={() => handleLayoutSelect(layout.id)}
                    className={`p-4 border rounded-lg ${selectedLayout === layout.id ? 'border-blue-500 bg-blue-50' : ''}`}
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
                        className="absolute inset-0"  // Modificado para cobrir toda a área
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

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep !== 'case' && (
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
                disabled={currentStep === 'photos' && !uploadedImages.some(img => img !== null)}
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