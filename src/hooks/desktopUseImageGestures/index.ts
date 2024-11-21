import { useState, useRef } from 'react';
import type { ImageSettings } from '../../types';
import { updateImageSettings } from '../../utils/desktopGestureUtils';

interface UseImageGesturesProps {
  isEditable: boolean;
  activeImageIndex: number;
  imageSettings: ImageSettings[];
  setImageSettings?: React.Dispatch<React.SetStateAction<ImageSettings[]>>;
  containerRef: React.RefObject<HTMLDivElement>;
  initialScale: number;
}

const MAX_SCALE = 4;
const WHEEL_SENSITIVITY = 0.001;

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

    const currentScale = imageSettings[activeImageIndex].scale;
    if (currentScale <= initialScale) return;

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
    handleWheel
  };
};