import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "./user-slice";
import { type Store } from "@/types/store";
import { createCartSlice } from "./cart-slice";

export const userStore = create<Store>()(
  immer((...a) => ({
    ...createUserSlice(...a),
    ...createCartSlice(...a),
  }))
);
