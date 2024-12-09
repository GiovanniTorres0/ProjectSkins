import { PhoneModel } from '../../../types';

export const galaxy_a01: PhoneModel = {
  id: 'galaxy_a01',
  name: 'Galaxy A01',
  dimensions: {
    width: 280,
    height: 560
  },
  images: {
    preview: 'https://case4you.s3.amazonaws.com/devices/5f75e2c252c28e5598b62d3f/images/a01-FRONT.png',
    border: 'https://case4you.s3.amazonaws.com/devices/5f75e2c252c28e5598b62d3f/images/border.png'
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