import { Layout } from '../types';

export const LAYOUTS: Layout[] = [
  {
    id: 'full',
    name: 'Imagem Única',
    areas: [{
      top: 2,
      bottom: 2,
      left: 3,
      right: 3
    }]
  },
  {
    id: 'split-horizontal',
    name: 'Dividido Horizontal',
    areas: [
      {
        top: 2,
        left: 3,
        right: 3,
        bottom: 50
      },
      {
        top: 50,
        left: 3,
        right: 3,
        bottom: 2
      }
    ]
  },
  {
    id: 'split-vertical',
    name: 'Dividido Vertical',
    areas: [
      {
        top: 2,
        left: 3,
        right: 50,
        bottom: 2
      },
      {
        top: 2,
        left: 50,
        right: 3,
        bottom: 2
      }
    ]
  }
];