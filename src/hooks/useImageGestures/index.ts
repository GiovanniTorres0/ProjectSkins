import { useState, useRef } from 'react';
import type { ImageSettings } from '../../types';

interface UseImageGesturesProps {
  isEditable: boolean;
  activeImageIndex: number;
  imageSettings: ImageSettings[];
  setImageSettings?: React.Dispatch<React.SetStateAction<ImageSettings[]>>;
  containerRef: React.RefObject<HTMLDivElement>;
  initialScale: number; // Nova prop
}

const MIN_SCALE = 1; // Aumentado para garantir cobertura total

export const useImageGestures = ({
  isEditable,
  activeImageIndex,
  imageSettings,
  setImageSettings,
  containerRef,
  initialScale
}: UseImageGesturesProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialTouch = useRef({ x: 0, y: 0, scale: 1, angle: 0 });

  const calculateMaxOffset = (scale: number): { maxX: number; maxY: number } => {
    if (scale <= initialScale) {
      return { maxX: 0, maxY: 0 };
    }

    const container = containerRef.current;
    const imageSize = {
      width: container.clientWidth * scale,
      height: container.clientHeight * scale
    };

    return {
      maxX: (imageSize.width - container.clientWidth) / 2,
      maxY: (imageSize.height - container.clientHeight) / 2
    };
  };

  const constrainMovement = (position: { x: number; y: number }, scale: number) => {
    if (scale <= initialScale) {
      return { x: 0, y: 0 };
    }
    const { maxX, maxY } = calculateMaxOffset(scale);
    return {
      x: Math.max(-maxX, Math.min(maxX, position.x)),
      y: Math.max(-maxY, Math.min(maxY, position.y))
    };
  };

  const updateImage = (changes: Partial<ImageSettings>) => {
    if (!setImageSettings) return;

    setImageSettings(prev => {
      const newSettings = [...prev];
      const currentSettings = newSettings[activeImageIndex];

      // Primeiro atualize a escala se houver uma nova
      const newScale = changes.scale
      ? Math.max(initialScale, Math.min(MAX_SCALE, changes.scale)) // Usar initialScale aqui
      : currentSettings.scale;

      // Então calcule e restrinja a posição baseado na nova escala
      const newPosition = changes.position
        ? constrainMovement(changes.position, newScale)
        : constrainMovement(currentSettings.position, newScale);

        newSettings[activeImageIndex] = {
          ...currentSettings,
          ...changes,
          scale: newScale,
          position: newPosition
        };

      return newSettings;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditable) return;

    const currentScale = imageSettings[activeImageIndex].scale;
    if (currentScale <= initialScale) return;

    const rect = e.currentTarget.getBoundingClientRect();
    dragStart.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isEditable) return;

    // Verifica novamente a escala durante o movimento
    const currentScale = imageSettings[activeImageIndex].scale;
    if (currentScale <= 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

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
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable) return;
    e.preventDefault();

    const currentScale = imageSettings[activeImageIndex].scale;

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
      // Só permite movimento se a escala for maior que 1
      if (currentScale <= 1) return;

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const WHEEL_SENSITIVITY = 0.001;
  const MAX_SCALE = 4;

  const handleWheel = (e: React.WheelEvent) => {
    if (!isEditable) return;
    e.preventDefault();
    
    const currentScale = imageSettings[activeImageIndex].scale;
    const scaleDelta = 1 - (e.deltaY * WHEEL_SENSITIVITY);
    const targetScale = currentScale * scaleDelta;
  
    updateImage({
      scale: Math.max(initialScale, Math.min(MAX_SCALE, targetScale))
    });
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleWheel
  };
};