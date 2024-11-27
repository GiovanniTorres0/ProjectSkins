import { PhoneModel } from '../../types';

// Importações das marcas
import { appleModels } from './apple';
//import { samsungModels } from './samsung';
//import { xiaomiModels } from './xiaomi';
// ... outras importações

// Combinar todos os modelos em um array
export const PHONE_MODELS: PhoneModel[] = [
  ...appleModels,
  //...samsungModels,
  //...xiaomiModels,
  // ... outros modelos
];

// Manter as funções helpers existentes
export const getModelById = (id: string): PhoneModel | undefined => 
  PHONE_MODELS.find(model => model.id === id);

export const getModelsByBrand = (brand: string): PhoneModel[] => 
  PHONE_MODELS.filter(model => model.brand.toLowerCase() === brand.toLowerCase());

// Estrutura de marcas para o menu
export const BRANDS = [
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
    models: appleModels
  }
  // {
  //   id: 'samsung',
  //   name: 'Samsung',
  //   icon: '⭐',
  //   models: samsungModels
  // },
  // {
  //   id: 'xiaomi',
  //   name: 'Xiaomi',
  //   icon: '📱',
  //   models: xiaomiModels
  // },
  // ... outras marcas
];