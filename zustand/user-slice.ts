import { AccountType, UserType } from "@/type";
import { StateCreator } from "zustand";

interface UserState {
  user: UserType | null;
  account: AccountType | null;
  isLoggedIn: boolean;
}

interface UserAction {
  signIn: (user: UserType, account: AccountType) => void;
  signOut: () => void;
  setUser: (user: UserType) => void;
}

export interface UserSlice extends UserState, UserAction {}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  account: null,
  isLoggedIn: false,
  isLoaded: false,
  signIn: (user: UserType, account: AccountType) =>
    set({ user: user, account: account, isLoggedIn: true }),
  signOut: () => set({ user: null, isLoggedIn: false }),
  setUser: (user: UserType) => set({ user: user }),
});
