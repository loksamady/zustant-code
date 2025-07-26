import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

import { createUserSlice } from "./user-slice";
import { type Store } from "@/types/store";
import { createCartSlice } from "./cart-slice";

export const userStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createCartSlice(...a),
      })),
      {
        name: "zustand-cart-storage", // unique name for localStorage key
        // You can specify which parts of the state to persist
        partialize: (state) => ({
          // Cart data
          products: state.products,
          total: state.total,
          // User data
          userName: state.userName,
          fullName: state.fullName,
          age: state.age,
          address: state.address,
        }),
        // Optional: Add version for migration support
        version: 1,
        // Optional: Custom storage (default is localStorage)
        // storage: createJSONStorage(() => sessionStorage),
        // Optional: Skip hydration on SSR
        skipHydration: false,
      }
    ),
    {
      name: "Zustand Cart Store", // name shown in devtools
    }
  )
);
