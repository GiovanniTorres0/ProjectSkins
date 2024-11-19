import { PhoneModel } from '../../types';
import { iphone11 } from './iphone11';
// Importe outros modelos conforme necessário

export const PHONE_MODELS: PhoneModel[] = [
  iphone11,
  // Adicione outros modelos aqui
];

export const getModelById = (id: string): PhoneModel | undefined => 
  PHONE_MODELS.find(model => model.id === id);

export const getModelsByBrand = (brand: string): PhoneModel[] => 
  PHONE_MODELS.filter(model => model.id.toLowerCase().includes(brand.toLowerCase()));