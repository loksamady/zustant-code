import { create, type StateCreator } from "zustand";
import type { CartSlice } from "./cart-slice";

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserAction = {
  setAdress: (address: string) => void;
};
export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
  UserSlice & CartSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  userName: "",
  fullName: "",
  age: 0,
  address: "",
  setAdress: (address) => set(() => ({ address })),
});

export const useCountStore = create<{
  nested: { count: number; increment: () => void; decrement: () => void };
}>((set) => ({
  nested: {
    count: 0,
    increment: () =>
      set((state) => ({
        nested: { ...state.nested, count: state.nested.count + 1 },
      })),
    decrement: () =>
      set((state) => ({
        nested: { ...state.nested, count: state.nested.count - 1 },
      })),
  },
}));
