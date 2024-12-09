export type LayoutType = 'full' | 'split-horizontal' | 'split-vertical';

export interface Area {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Layout {
  id: LayoutType;
  name: string;
  areas: Area[];
}