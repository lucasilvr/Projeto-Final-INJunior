export interface Pijama {
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
  sales: PijamaSale[];
  sizes: PijamaSize[];
}

export interface PijamaSize {
  id: string;
  size: string;
  stockQuantity: number;
  pijamaId: string;
}

export interface PijamaSale {
  saleId: string;
  pijamaId: string;
  price: number;
  quantity: number;
}