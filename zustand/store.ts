import { create } from "zustand";
import createSelectors from "./selectors";
import { createSignUpSlice, SignUpSlice } from "./sign-up-slice";
import { createUserSlice, UserSlice } from "./user-slice";
import { createStockSlice, StockSlice } from "./stock-slice";

interface Store extends SignUpSlice, UserSlice, StockSlice {}

export const store = create<Store>((...a) => ({
  ...createSignUpSlice(...a),
  ...createUserSlice(...a),
  ...createStockSlice(...a),
}));

export default createSelectors(store);
