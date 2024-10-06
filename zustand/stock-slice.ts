import { StateCreator } from "zustand";

interface StockState {
  curPrice: number | null;
}

interface StockAction {
  setPrice: (curPrice: number) => void;
}

export interface StockSlice extends StockState, StockAction {}

export const createStockSlice: StateCreator<StockSlice, [], [], StockSlice> = (
  set
) => ({
  curPrice: null,
  setPrice: (curPrice: number) => set({ curPrice }),
});
