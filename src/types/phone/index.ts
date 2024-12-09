export interface PhoneModelImages {
    preview: string;    
    border: string;      
  }
  
  export interface PhoneModel {
    id: string;
    brand: string;
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