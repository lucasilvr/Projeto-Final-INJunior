export interface Pajama {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  season: string;
  type: string;
  gender: string;
  favorite: boolean;
  onSale: boolean;
  salePercent?: number;
  sales: PajamaSale[];
  sizes: PajamaSize[];
}

export interface PajamaSize {
  id: string;
  size: string;
  stockQuantity: number;
  pajamaId: string;
}

export interface PajamaSale {
  saleId: string;
  pajamaId: string;
  price: number;
  quantity: number;
}
