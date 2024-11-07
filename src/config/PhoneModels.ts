export interface PhoneModel {
    id: string;
    name: string;
    dimensions: {
      width: number;
      height: number;
    };
    images: {
      preview: string;
      mask: string;
    };
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
  
  export const PHONE_MODELS: PhoneModel[] = [
    {
      id: 'iphone-11',
      name: 'iPhone 11',
      dimensions: {
        width: 75.7,
        height: 150.9
      },
      images: {
        preview: 'https://case4you.s3.amazonaws.com/devices/5d8b82464a44205ed8e17af0/images/6jR8eNGQ.png',
        mask: 'https://case4you.s3.amazonaws.com/devices/5d8b82464a44205ed8e17af0/images/border.png'
      },
      template: {
        printableArea: {
          top: 2,
          bottom: 2,
          left: 3,
          right: 3
        },
        camera: {
          type: 'square',
          position: {
            top: 5,
            right: 5,
            width: 25,
            height: 25
          }
        },
        corners: {
          radius: 8
        }
      }
    }
    // Adicione mais modelos aqui seguindo o mesmo formato
  ];