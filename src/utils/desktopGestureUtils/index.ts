import type { ImageSettings } from '../types';

export const calculateMaxOffset = (
  containerWidth: number,
  containerHeight: number,
  imageAspectRatio: number,
  scale: number,
  initialScale: number
) => {
  let imageWidth: number;
  let imageHeight: number;
  
  const containerAspectRatio = containerWidth / containerHeight;
  
  if (imageAspectRatio > containerAspectRatio) {
    imageWidth = containerWidth * scale;
    imageHeight = containerWidth / imageAspectRatio * scale;
  } else {
    imageHeight = containerHeight * scale;
    imageWidth = containerHeight * imageAspectRatio * scale;
  }

  const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
  const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

  return { maxX, maxY };
};

export const constrainMovement = (
  position: { x: number; y: number },
  containerWidth: number,
  containerHeight: number,
  imageAspectRatio: number,
  scale: number,
  initialScale: number
) => {
  if (scale <= initialScale) {
    return { x: 0, y: 0 };
  }

  const { maxX, maxY } = calculateMaxOffset(
    containerWidth,
    containerHeight,
    imageAspectRatio,
    scale,
    initialScale
  );

  return {
    x: Math.max(-maxX, Math.min(maxX, position.x)),
    y: Math.max(-maxY, Math.min(maxY, position.y))
  };
};

export const updateImageSettings = (
  currentSettings: ImageSettings,
  changes: Partial<ImageSettings>,
  containerWidth: number,
  containerHeight: number,
  initialScale: number,
  maxScale: number
): ImageSettings => {
  const newScale = changes.scale
    ? Math.max(initialScale, Math.min(maxScale, changes.scale))
    : currentSettings.scale;

  const newPosition = changes.position
    ? constrainMovement(
        changes.position,
        containerWidth,
        containerHeight,
        currentSettings.aspectRatio,
        newScale,
        initialScale
      )
    : constrainMovement(
        currentSettings.position,
        containerWidth,
        containerHeight,
        currentSettings.aspectRatio,
        newScale,
        initialScale
      );

  return {
    ...currentSettings,
    ...changes,
    scale: newScale,
    position: newPosition,
    rotation: changes.rotation || currentSettings.rotation
  };
};