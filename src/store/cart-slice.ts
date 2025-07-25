import type { CartProduct } from "@/types/cartProduct";
import { type StateCreator } from "zustand";
import { type Product } from "@/types/product";
import type { UserSlice } from "./user-slice";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initalState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  CartSlice & UserSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initalState,
  incrementQuantity: (productId: string) =>
    set((state: CartState) => {
      const foundProduct = state.products.find(
        (p: CartProduct) => p.id === productId
      );
      if (foundProduct) {
        foundProduct.quantity += 1;
      }
    }),
  decrementQuantity: (productId: string) =>
    set((state: CartState) => {
      const foundIndex = state.products.findIndex(
        (p: CartProduct) => p.id === productId
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].quantity === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].quantity -= 1;
        }
      }
    }),
  addProduct: (product: Product) =>
    set((state: CartState) => {
      state.products = state.products.filter(
        (p: CartProduct) => p.id !== product.id
      );
      state.products.push({ ...product, quantity: 1 });
    }),
  removeProduct: (productId: string) =>
    set((state: CartState) => {
      state.products = state.products.filter(
        (p: CartProduct) => p.id !== productId
      );
    }),
  getProductById: (productId: string) =>
    get().products.find((p: CartProduct) => p.id === productId),
  setTotal: (total: number) =>
    set((state: CartState) => {
      state.total = total;
    }),
  reset: () => set(() => ({ ...initalState })),
});
