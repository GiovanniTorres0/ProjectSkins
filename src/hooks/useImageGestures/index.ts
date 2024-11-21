import { useState, useRef } from 'react';
import type { ImageSettings } from '../../types';

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

  const calculateMaxOffset = (scale: number, aspectRatio: number): { maxX: number; maxY: number } => {
    if (!containerRef.current) return { maxX: 0, maxY: 0 };

    const container = containerRef.current;
    const containerAspectRatio = container.clientWidth / container.clientHeight;

    let maxX = 0;
    let maxY = 0;

    if (aspectRatio > containerAspectRatio) {
      const imageWidth = container.clientHeight * aspectRatio;
      maxX = (imageWidth - container.clientWidth) / 2;
    } else {
      const imageHeight = container.clientWidth / aspectRatio;
      maxY = (imageHeight - container.clientHeight) / 2;
    }

    return {
      maxX: maxX * (scale - initialScale),
      maxY: maxY * (scale - initialScale)
    };
  };

  const constrainMovement = (position: { x: number; y: number }, scale: number, aspectRatio: number) => {
    const { maxX, maxY } = calculateMaxOffset(scale, aspectRatio);

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
      const aspectRatio = currentSettings.aspectRatio;

      const newScale = changes.scale
        ? Math.max(initialScale, Math.min(MAX_SCALE, changes.scale))
        : currentSettings.scale;

      const newPosition = changes.position
        ? constrainMovement(changes.position, newScale, aspectRatio)
        : constrainMovement(currentSettings.position, newScale, aspectRatio);

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