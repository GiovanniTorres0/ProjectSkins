import React from 'react';
import type { PhoneModel } from '../../config/PhoneModels';

interface PhoneTemplateProps {
  model: PhoneModel;
  image: string | null;
  className?: string;
}

const PhoneCaseTemplate: React.FC<PhoneTemplateProps> = ({ 
  model, 
  image, 
  className = "" 
}) => {
  if (!model) return null;

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: '280px',
        height: '560px'
      }}
    >
      {/* Base phone image */}
      <img 
        src={model.images.preview}
        alt={`${model.name} template`}
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Customized image area */}
      {image && (
        <div 
          className="absolute"
          style={{
            top: `${model.template.printableArea.top}%`,
            left: `${model.template.printableArea.left}%`,
            right: `${model.template.printableArea.right}%`,
            bottom: `${model.template.printableArea.bottom}%`,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Overlay mask */}
      <img 
        src={model.images.mask}
        alt={`${model.name} mask`}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};

export default PhoneCaseTemplate;