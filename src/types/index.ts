// src/types/index.ts

export type LayoutType = 'full' | 'split-horizontal' | 'split-vertical';
export type Step = 'case' | 'photos' | 'filters';

export interface ImageSettings {
  scale: number;
  rotation: number;
  position: {
    x: number;
    y: number;
  };
  aspectRatio: number;
}

export interface Area {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Layout {
  id: LayoutType;
  name: string;
  areas: Area[];
}

export interface PhoneModelImages {
  preview: string;    
  border: string;      
}

export interface PhoneModel {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  images: PhoneModelImages;
  template: {
    printableArea: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    camera: {
      type: 'square' | 'pill' | 'circle' | 'dynamic-island';
      position: {
        top: number;
        right: number;
        width: number;
        height: number;
      };
    };
    corners: {
      radius: number;
    };
  };
}

// Hook Interfaces
export interface DragState {
  isDragging: boolean;
  startPosition: { x: number; y: number };
}

export interface ZoomState {
  scale: number;
  initialDistance: number;
}

export interface RotationState {
  angle: number;
  initialAngle: number;
}

export interface GestureHandlers {
  onDragStart: (x: number, y: number) => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd: () => void;
  onZoom: (scale: number) => void;
  onRotate: (angle: number) => void;
  onWheel: (delta: number) => void;
}