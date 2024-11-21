import { useState, useRef } from 'react';
import type { ImageSettings } from '../../types';
import { updateImageSettings } from '../../utils/mobileGestureUtils';

interface UseImageGesturesMobileProps {
  isEditable: boolean;
  activeImageIndex: number;
  imageSettings: ImageSettings[];
  setImageSettings?: React.Dispatch<React.SetStateAction<ImageSettings[]>>;
  containerRef: React.RefObject<HTMLDivElement>;
  initialScale: number;
}

const MAX_SCALE = 4;

export const useImageGesturesMobile = ({
  isEditable,
  activeImageIndex,
  imageSettings,
  setImageSettings,
  containerRef,
  initialScale
}: UseImageGesturesMobileProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialTouch = useRef({ x: 0, y: 0, scale: 1, angle: 0 });

  const updateImage = (changes: Partial<ImageSettings>) => {
    if (!setImageSettings || !containerRef.current) return;

    const container = containerRef.current;
    
    setImageSettings(prev => {
      const newSettings = [...prev];
      newSettings[activeImageIndex] = updateImageSettings(
        newSettings[activeImageIndex],
        changes,
        container.clientWidth,
        container.clientHeight,
        initialScale,
        MAX_SCALE
      );
      return newSettings;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable) return;
    e.preventDefault();
  
    if (e.touches.length === 2) {
      const [touch1, touch2] = e.touches;
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
  
      initialTouch.current = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        scale: Math.hypot(dx, dy),
        angle: Math.atan2(dy, dx)
      };
    } else if (e.touches.length === 1) {
      // Removemos completamente a verificação de scale aqui
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      dragStart.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
      setIsDragging(true);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isEditable) return;
    e.preventDefault();
  
    if (e.touches.length === 2) {
      const [touch1, touch2] = e.touches;
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
  
      const currentScale = Math.hypot(dx, dy);
      const currentAngle = Math.atan2(dy, dx);
  
      const scaleDelta = currentScale / initialTouch.current.scale;
      const angleDelta = (currentAngle - initialTouch.current.angle) * (180 / Math.PI);
  
      const currentSettings = imageSettings[activeImageIndex];
      const newScale = currentSettings.scale * scaleDelta;
  
      updateImage({
        scale: newScale,
        rotation: (currentSettings.rotation + angleDelta) % 360
      });
  
      initialTouch.current = {
        ...initialTouch.current,
        scale: currentScale,
        angle: currentAngle
      };
    } else if (e.touches.length === 1 && isDragging) {
      // Removemos a verificação de scale aqui também
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
  
      const deltaX = offsetX - dragStart.current.x;
      const deltaY = offsetY - dragStart.current.y;
  
      const currentPosition = imageSettings[activeImageIndex].position;
      updateImage({
        position: {
          x: currentPosition.x + deltaX,
          y: currentPosition.y + deltaY
        }
      });
  
      dragStart.current = { x: offsetX, y: offsetY };
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};