import { PhoneModel } from '../../types';
import appleLogo from '.../../assets/apple.png';
import samsungLogo from '.../../assets/samsung.png';
import huaweiLogo from '.../../assets/huawei.png';

export interface BrandInfo {
  id: string;
  name: string;
  logo: string;
  models: PhoneModel[];
}

export const BRANDS: BrandInfo[] = [
  {
    id: 'apple',
    name: 'Apple',
    logo: appleLogo,
    models: [] 
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: samsungLogo,
    models: []
  },
  {
    id: 'huawei',
    name: 'Huawei',
    logo: huaweiLogo,
    models: []
  }
];

// Adicione as funções de exportação aqui

export const getModelById = (id: string): PhoneModel | undefined => {
  return BRANDS.flatMap(brand => brand.models).find(model => model.id === id);
};

export const getBrandById = (id: string): BrandInfo | undefined => {
  return BRANDS.find(brand => brand.id === id);
};

export const getModelsByBrand = (brandId: string): PhoneModel[] => {
  const brand = BRANDS.find(brand => brand.id === brandId);
  return brand ? brand.models : [];
};