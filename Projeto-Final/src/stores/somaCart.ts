import { create } from "zustand";

interface CartMath {
  soma: number;
  somarValor: (valor: number) => void;
  subtrairValor: (valor: number) => void;
  adicionarValor: (valor: number) => void;
}

const useCartMath = create<CartMath>((set) => ({
  soma: 0,
  adicionarValor: (valor) => set((s) => ({ soma: s.soma + valor})),
  somarValor: (valor) => set((s) => ({ soma: s.soma + valor })),
  subtrairValor: (valor) => set((s) => ({ soma: s.soma - valor })),
}));

export default useCartMath;