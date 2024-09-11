import { StateCreator } from "zustand";

interface SignUpState {
  name: string;
  mobileNo: string;
}

interface SignUpAction {
  setName: (name: string) => void;
  setMobileNo: (mobileNo: string) => void;
}

export interface SignUpSlice extends SignUpState, SignUpAction {}

export const createSignUpSlice: StateCreator<
  SignUpSlice,
  [],
  [],
  SignUpSlice
> = (set) => ({
  name: "",
  mobileNo: "",
  setName: (name: string) => set({ name: name }),
  setMobileNo: (mobileNo: string) => set({ mobileNo: mobileNo }),
});
