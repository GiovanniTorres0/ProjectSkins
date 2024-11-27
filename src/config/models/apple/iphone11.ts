import { PhoneModel } from '../../../types';

export const iphone11: PhoneModel = {
  id: 'iphone11',
  name: 'iPhone 11',
  dimensions: {
    width: 280,
    height: 560
  },
  images: {
    preview: 'https://case4you.s3.amazonaws.com/devices/5d8b82464a44205ed8e17af0/images/6jR8eNGQ.png',
    border: 'https://case4you.s3.amazonaws.com/devices/5d8b82464a44205ed8e17af0/images/border.png'
  },
  template: {
    printableArea: {
      top: 8,
      bottom: 8,
      left: 4,
      right: 4
    },
    camera: {
      type: 'square',
      position: {
        top: 3,
        right: 3,
        width: 29,
        height: 29
      }
    },
    corners: {
      radius: 40
    }
  }
};