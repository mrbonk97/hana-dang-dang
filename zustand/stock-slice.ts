import { StateCreator } from "zustand";

interface StockState {
  curPrice: string | null;
}

interface StockAction {
  setPrice: (curPrice: string) => void;
}

export interface StockSlice extends StockState, StockAction {}

export const createStockSlice: StateCreator<StockSlice, [], [], StockSlice> = (
  set
) => ({
  curPrice: null,
  setPrice: (curPrice: string) => set({ curPrice }),
});
