import { PhoneModel } from '../../../types';

export const p30: PhoneModel = {
  id: 'p30',
  name: 'P30',
  dimensions: {
    width: 280,
    height: 560
  },
  images: {
    preview: 'https://case4you.s3.amazonaws.com/devices/5d4016347565c5295d3267c7/images/Huawei%20P30.png',
    border: 'https://case4you.s3.amazonaws.com/devices/5d4016347565c5295d3267c7/images/border.png'
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