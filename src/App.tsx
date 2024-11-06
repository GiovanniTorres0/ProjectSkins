import React, { useState } from 'react'
import PhoneCaseTemplate from './components/PhoneCaseTemplate'
import './styles/App.css'

function App() {
  const [selectedModelId, setSelectedModelId] = useState('iphone-14')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Lista de modelos disponíveis
  const PHONE_MODELS = [
    {
      id: 'iphone-14',
      name: 'iPhone 14',
      dimensions: {
        width: 71.5,
        height: 146.7
      },
      template: {
        printableArea: {
          top: 2,
          bottom: 2,
          left: 3,
          right: 3
        },
        camera: {
          type: 'square' as const,
          position: {
            top: 5,
            right: 5,
            width: 25,
            height: 25
          }
        },
        corners: {
          radius: 8
        },
        buttons: {
          positions: [
            {
              type: 'volume' as const,
              side: 'left' as const,
              top: 25,
              height: 15
            },
            {
              type: 'power' as const,
              side: 'right' as const,
              top: 20,
              height: 12
            }
          ]
        }
      }
    },
    {
      id: 'iphone-14-pro',
      name: 'iPhone 14 Pro',
      dimensions: {
        width: 71.5,
        height: 147.5
      },
      template: {
        printableArea: {
          top: 2,
          bottom: 2,
          left: 3,
          right: 3
        },
        camera: {
          type: 'dynamic-island' as const,
          position: {
            top: 1,
            right: 30,
            width: 40,
            height: 10
          }
        },
        corners: {
          radius: 8
        }
      }
    }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const selectedModel = PHONE_MODELS.find(model => model.id === selectedModelId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            Personalize sua Capinha
          </h1>

          {/* Seletor de Modelo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo do Celular
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {PHONE_MODELS.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Editor */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Editor</h2>
              
              {selectedModel && (
                <div className="relative">
                  <PhoneCaseTemplate
                    model={selectedModel}
                    image={uploadedImage}
                    className="w-full max-w-sm mx-auto"
                  />
                  
                  {/* Upload overlay */}
                  {!uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                      >
                        Escolher Imagem
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Preview */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Preview</h2>
              {selectedModel && (
                <div className="rotate-12 scale-95">
                  <PhoneCaseTemplate
                    model={selectedModel}
                    image={uploadedImage}
                    className="w-full max-w-sm mx-auto shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          {uploadedImage && (
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setUploadedImage(null)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Remover Imagem
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="bg-white/90 rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(selectedModel, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App