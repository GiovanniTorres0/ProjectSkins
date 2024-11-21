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
        // Imagem mais larga que o container
        imageWidth = containerWidth * scale;
        imageHeight = containerWidth / imageAspectRatio * scale;
    } else {
        // Imagem mais alta que o container
        imageHeight = containerHeight * scale;
        imageWidth = containerHeight * imageAspectRatio * scale;
    }

    // Calcula o offset máximo baseado apenas na diferença entre o tamanho da imagem e do container
    const maxX = (imageWidth - containerWidth) / 2;
    const maxY = (imageHeight - containerHeight) / 2;

    return {
        maxX: Math.max(0, maxX),
        maxY: Math.max(0, maxY)
    };
};

// Em constrainMovement, reduzimos o threshold para permitir movimento mais cedo
export const constrainMovement = (
    position: { x: number; y: number },
    containerWidth: number,
    containerHeight: number,
    imageAspectRatio: number,
    scale: number,
    initialScale: number
) => {
    // Removemos a verificação de scale para permitir movimento sempre
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