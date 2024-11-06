import React from 'react'

interface PhoneTemplateProps {
  model: PhoneModel
  image: string | null
  className?: string
}

interface PhoneModel {
  id: string
  name: string
  dimensions: {
    width: number
    height: number
  }
  template: {
    // Medidas em porcentagem para ser responsivo
    printableArea: {
      top: number    // % do topo
      bottom: number // % do fundo
      left: number   // % da esquerda
      right: number  // % da direita
    }
    camera: {
      type: 'pill' | 'square' | 'circle' | 'dynamic-island'
      position: {
        top: number
        right: number
        width: number
        height: number
      }
    }
    buttons?: {
      positions: Array<{
        type: 'volume' | 'power' | 'mute'
        side: 'left' | 'right'
        top: number
        height: number
      }>
    }
    corners: {
      radius: number // % do raio dos cantos
    }
  }
}

// Biblioteca de templates básicos que podem ser combinados
const PHONE_TEMPLATES = {
  // Template base iPhone moderno
  iphoneModern: {
    printableArea: {
      top: 2,    // 2% de margem do topo
      bottom: 2, // 2% de margem do fundo
      left: 3,   // 3% de margem das laterais
      right: 3
    },
    camera: {
      type: 'square',
      position: {
        top: 5,
        right: 5,
        width: 25,
        height: 25
      }
    },
    corners: {
      radius: 8
    }
  },
  // Template base Galaxy moderno
  galaxyModern: {
    printableArea: {
      top: 3,
      bottom: 3,
      left: 4,
      right: 4
    },
    camera: {
      type: 'pill',
      position: {
        top: 5,
        right: 5,
        width: 15,
        height: 35
      }
    },
    corners: {
      radius: 6
    }
  }
} as const

// Catálogo de modelos baseados nos templates
const PHONE_MODELS: PhoneModel[] = [
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    dimensions: {
      width: 71.5,
      height: 146.7
    },
    template: {
      ...PHONE_TEMPLATES.iphoneModern,
      camera: {
        type: 'square',
        position: {
          top: 5,
          right: 5,
          width: 25,
          height: 25
        }
      },
      buttons: {
        positions: [
          {
            type: 'volume',
            side: 'left',
            top: 25,
            height: 15
          },
          {
            type: 'power',
            side: 'right',
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
      ...PHONE_TEMPLATES.iphoneModern,
      camera: {
        type: 'dynamic-island',
        position: {
          top: 1,
          right: 30,
          width: 40,
          height: 10
        }
      }
    }
  }
]

// Componente que gera o SVG da máscara dinamicamente
const PhoneCaseTemplate: React.FC<PhoneTemplateProps> = ({ model, image, className }) => {
  const aspectRatio = model.dimensions.height / model.dimensions.width

  return (
    <div 
      className={`relative ${className}`}
      style={{ aspectRatio: `${model.dimensions.width} / ${model.dimensions.height}` }}
    >
      <svg
        viewBox={`0 0 100 ${aspectRatio * 100}`}
        className="w-full h-full absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Máscara para a área imprimível */}
          <mask id={`printable-${model.id}`}>
            {/* Área total da capinha */}
            <rect width="100" height="100" fill="white"/>
            
            {/* Recortes da câmera */}
            {model.template.camera.type === 'dynamic-island' ? (
              <rect
                x={100 - model.template.camera.position.right - model.template.camera.position.width}
                y={model.template.camera.position.top}
                width={model.template.camera.position.width}
                height={model.template.camera.position.height}
                rx={model.template.camera.position.height / 2}
                fill="black"
              />
            ) : model.template.camera.type === 'square' ? (
              <rect
                x={100 - model.template.camera.position.right - model.template.camera.position.width}
                y={model.template.camera.position.top}
                width={model.template.camera.position.width}
                height={model.template.camera.position.height}
                rx={2}
                fill="black"
              />
            ) : (
              <rect
                x={100 - model.template.camera.position.right - model.template.camera.position.width}
                y={model.template.camera.position.top}
                width={model.template.camera.position.width}
                height={model.template.camera.position.height}
                rx={model.template.camera.position.width / 2}
                fill="black"
              />
            )}
            
            {/* Recortes dos botões */}
            {model.template.buttons?.positions.map((button, index) => (
              <rect
                key={index}
                x={button.side === 'left' ? 0 : 98}
                y={button.top}
                width={2}
                height={button.height}
                fill="black"
              />
            ))}
          </mask>
        </defs>

        {/* Forma da capinha */}
        <rect
          width="100"
          height="100"
          rx={model.template.corners.radius}
          className="fill-gray-800"
        />
        
        {/* Área imprimível com a imagem */}
        {image && (
          <foreignObject
            x={model.template.printableArea.left}
            y={model.template.printableArea.top}
            width={100 - model.template.printableArea.left - model.template.printableArea.right}
            height={100 - model.template.printableArea.top - model.template.printableArea.bottom}
            mask={`url(#printable-${model.id})`}
          >
            <div className="w-full h-full">
              <img 
                src={image} 
                alt="Case background"
                className="w-full h-full object-cover"
              />
            </div>
          </foreignObject>
        )}

        {/* Efeitos de profundidade */}
        <rect
          width="100"
          height="100"
          rx={model.template.corners.radius}
          fill="url(#depth-gradient)"
          opacity="0.1"
        />
      </svg>
    </div>
  )
}

export default PhoneCaseTemplate