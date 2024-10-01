import { StateCreator } from "zustand";

type UserType = {
  id: number;
  name: string;
  mobileNo: string;
  username: string;
  password: string;
  isDividendCreated: boolean;
  dividendGoal: number;
  dividendRiskType: string;
  dividendPreference: string;
  dividendArea: string;
};

type AccountType = {
  accountNo: string;
  title: string;
  balance: number;
  withDrawAmount: number;
  stockCurrentBalance: number;
  stockInitBalance: number;
  totalBalance: number;
  profit: number;
  profitPercentage: number;
};

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
