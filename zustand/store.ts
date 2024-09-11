import { create } from "zustand";
import { createSignUpSlice, SignUpSlice } from "./sign-up-slice";
import createSelectors from "./selectors";
import { createUserSlice, UserSlice } from "./user-slice";

interface Store extends SignUpSlice, UserSlice {}

export const store = create<Store>((...a) => ({
  ...createSignUpSlice(...a),
  ...createUserSlice(...a),
}));

export default createSelectors(store);
