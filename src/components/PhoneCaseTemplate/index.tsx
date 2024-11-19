import React, { useState } from 'react';
import type { PhoneModel, LayoutType, ImageSettings } from '../../types';
import { LAYOUTS } from '../../config/Layouts';

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
  isEditable = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStart, setZoomStart] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationStart, setRotationStart] = useState(0);

  const selectedLayout = LAYOUTS.find(l => l.id === layout);
  if (!selectedLayout || !model) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable || !setImageSettings) return;
    e.preventDefault();

    // Zoom start
    setIsZooming(true);
    setZoomStart(
      Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
    );

    // Rotation start
    setIsRotating(true);
    setRotationStart(
      Math.atan2(
        e.touches[1].clientY - e.touches[0].clientY,
        e.touches[1].clientX - e.touches[0].clientX
      )
    );
  };

  const handleZoom = (e: React.TouchEvent) => {
    if (!isZooming || !isEditable || !setImageSettings) return;
    e.preventDefault();
    const currentZoom = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const scale = currentZoom / zoomStart;
    setImageSettings(prev => {
      const newSettings = [...prev];
      newSettings[activeImageIndex] = {
        ...newSettings[activeImageIndex],
        scale: Math.max(0.5, Math.min(3, newSettings[activeImageIndex].scale * scale))
      };
      return newSettings;
    });
    setZoomStart(currentZoom);
  };

  const handleZoomEnd = () => {
    setIsZooming(false);
    setIsRotating(false);
  };

  const handleRotation = (e: React.TouchEvent) => {
    if (!isRotating || !isEditable || !setImageSettings) return;
    e.preventDefault();
    const currentRotation = Math.atan2(
      e.touches[1].clientY - e.touches[0].clientY,
      e.touches[1].clientX - e.touches[0].clientX
    );
    const angle = (currentRotation - rotationStart) * (180 / Math.PI);
    setImageSettings(prev => {
      const newSettings = [...prev];
      newSettings[activeImageIndex] = {
        ...newSettings[activeImageIndex],
        rotation: angle
      };
      return newSettings;
    });
    setRotationStart(currentRotation);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (!isEditable || !setImageSettings) return;

    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setActiveImageIndex(index);
    setIsDragging(true);
    setDragStart({
      x: x - imageSettings[index].position.x,
      y: y - imageSettings[index].position.y
    });
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !isEditable || !setImageSettings) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const newPosition = {
      x: Math.max(0, Math.min(100, x - dragStart.x)),
      y: Math.max(0, Math.min(100, y - dragStart.y))
    };

    setImageSettings(prev => {
      const newSettings = [...prev];
      newSettings[activeImageIndex] = {
        ...newSettings[activeImageIndex],
        position: newPosition
      };
      return newSettings;
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const hasUserImages = images.some(img => img !== null);

  return (
    <div className={`relative w-[280px] h-[560px] mx-auto ${className}`}>
      <div className="absolute inset-0">
        {/* Base branca */}
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
          <>
            <div 
              className="absolute inset-0 overflow-hidden"
              onTouchStart={isEditable ? handleTouchStart : undefined}
              onTouchMove={isEditable ? (e) => {
                handleZoom(e);
                handleRotation(e);
              } : undefined}
              onTouchEnd={isEditable ? handleZoomEnd : undefined}
            >
              {selectedLayout.areas.map((area, index) => (
                images[index] && (
                  <div
                    key={index}
                    className="absolute inset-0" 
                    style={{
                      cursor: isEditable ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    }}
                    onMouseDown={isEditable ? (e) => handleDragStart(e, index) : undefined}
                    onTouchStart={isEditable ? (e) => handleDragStart(e, index) : undefined}
                    onMouseMove={isEditable ? handleDrag : undefined}
                    onTouchMove={isEditable ? handleDrag : undefined}
                    onMouseUp={isEditable ? handleDragEnd : undefined}
                    onTouchEnd={isEditable ? handleDragEnd : undefined}
                    onMouseLeave={isEditable ? handleDragEnd : undefined}  
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${images[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: `${imageSettings[index].position.x}% ${imageSettings[index].position.y}%`,
                        transform: `scale(${imageSettings[index].scale}) rotate(${imageSettings[index].rotation}deg)`,
                        filter: imageFilters?.[index] || 'none',
                      }} 
                    />
                  </div>
                )
              ))}
            </div>
          </>
        )}

        {/* Borda do dispositivo */}
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