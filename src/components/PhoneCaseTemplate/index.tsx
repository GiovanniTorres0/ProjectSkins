import React, { useState, useEffect, useRef } from 'react';
import type { PhoneModel, LayoutType, ImageSettings } from '../../types';
import { LAYOUTS } from '../../config/Layouts';
import { useImageGestures } from '../../hooks/desktopUseImageGestures';
import { useImageGesturesMobile } from '../../hooks/mobileUseImageGestures';

interface PhoneCaseTemplateProps {
  model: PhoneModel;
  images: (string | null)[];
  layout: LayoutType;
  imageSettings: ImageSettings[];
  setImageSettings?: React.Dispatch<React.SetStateAction<ImageSettings[]>>;
  className?: string;
  imageFilters?: string[];
  isEditable?: boolean;
}

const PhoneCaseTemplate: React.FC<PhoneCaseTemplateProps> = ({
  model,
  images,
  layout,
  imageSettings,
  setImageSettings,
  className = "",
  imageFilters,
  isEditable = true
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selectedLayout = LAYOUTS.find(l => l.id === layout);
  const hasUserImages = images.some(img => img !== null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [initialScale, setInitialScale] = useState<number>(1);

  const calculateInitialScale = (imgWidth: number, imgHeight: number) => {
    if (!containerRef.current) return 1;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const widthRatio = containerWidth / imgWidth;
    const heightRatio = containerHeight / imgHeight;

    const scale = Math.max(widthRatio, heightRatio) * 1.1;
    console.log('Initial Scale Calculated:', scale);
    return scale;
  };

  useEffect(() => {
    if (setImageSettings && images.length > imageSettings.length) {
      setImageSettings(prev => [
        ...prev,
        ...Array(images.length - prev.length).fill({
          scale: 1.2,
          rotation: 0,
          position: { x: 0, y: 0 },
          aspectRatio: 1
        })
      ]);
    }
  }, [images.length, setImageSettings]);

  useEffect(() => {
    images.forEach((imageUrl, index) => {
      if (imageUrl && setImageSettings) {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const calculatedInitialScale = calculateInitialScale(img.width, img.height);
          setInitialScale(calculatedInitialScale);

          setImageSettings(prev => {
            const newSettings = [...prev];
            newSettings[index] = {
              ...newSettings[index],
              aspectRatio,
              scale: calculatedInitialScale,
              position: { x: 0, y: 0 }
            };
            return newSettings;
          });
        };
        img.src = imageUrl;
      }
    });
  }, [images, setImageSettings]);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel
  } = useImageGestures({
    isEditable,
    activeImageIndex,
    imageSettings,
    setImageSettings,
    containerRef,
    initialScale,
  });

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useImageGesturesMobile({
    isEditable,
    activeImageIndex,
    imageSettings,
    setImageSettings,
    containerRef,
    initialScale,
  });

  if (!selectedLayout || !model) return null;

  return (
    <div className={`relative w-[280px] h-[560px] mx-auto ${className}`}>
      <div className="absolute inset-0" ref={containerRef}>
        <div className="absolute inset-0 bg-white" />

        {!hasUserImages ? (
          <div className="absolute inset-0">
            <img
              src={model.images.preview}
              alt={model.name}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 overflow-hidden touch-none"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {selectedLayout.areas.map((area, index) => (
              images[index] && (
                <div
                  key={index}
                  className="absolute inset-0"
                  onClick={() => setActiveImageIndex(index)}
                  ref={el => imageRefs.current[index] = el}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={images[index] || ''}
                        alt=""
                        style={{
                          position: 'absolute',
                          width: 'auto',
                          height: 'auto',
                          maxWidth: 'none',
                          maxHeight: 'none',
                          objectFit: 'contain',
                          transform: `
      translate(${imageSettings[index]?.position?.x || 0}px, ${imageSettings[index]?.position?.y || 0}px)
      rotate(${imageSettings[index]?.rotation || 0}deg)
      scale(${imageSettings[index]?.scale || 1})
    `,
                          filter: imageFilters?.[index] || 'none',
                          transformOrigin: 'center',
                          willChange: 'transform',
                          cursor: isEditable && imageSettings[index]?.scale > 1 ? 'move' : 'default',
                          touchAction: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        <img
          src={model.images.border}
          alt={`${model.name} border`}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  );
};

export default PhoneCaseTemplate;