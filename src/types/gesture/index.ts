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