import { create } from 'zustand';
import type { Pijama } from '../type/Pijama';

export type CartItem = Pijama & { selectedSize?: string; quantity?: number };

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (key) => set((s) => ({ items: s.items.filter(i => `${i.id}:${i.selectedSize ?? ''}` !== key) })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;