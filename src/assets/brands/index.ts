// Importando as imagens PNG
import appleLogo from './apple.png';
import samsungLogo from './samsung.png';
import huaweiLogo from './huawei.png';

export const brandLogos = {
  apple: appleLogo,
  samsung: samsungLogo,
  huawei: huaweiLogo,
} as const;

export type BrandLogoKey = keyof typeof brandLogos;