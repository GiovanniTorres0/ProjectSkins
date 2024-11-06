export interface PhoneModel {
    id: string;
    name: string;
    dimensions: {
      width: number;
      height: number;
    };
    imageUrl?: string;
  }
  
  export interface CustomizationData {
    phoneModel: PhoneModel;
    image: {
      url: string;
      position: {
        x: number;
        y: number;
        scale: number;
        rotation: number;
      };
    };
  }
  
  export interface Order extends CustomizationData {
    id: string;
    status: 'pending' | 'processing' | 'completed';
    createdAt: Date;
    customerInfo?: {
      name: string;
      email: string;
      phone: string;
    };
  }