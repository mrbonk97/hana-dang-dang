import { StockInfoType } from "@/type";

const BASE_URL = "http://localhost:8080/api";

type T1 = {
  createdAt: string;
  id: number;
  price: number;
  quantity: number;
  stockInfo: StockInfoType;
};

// prettier-ignore
export const getRecentTransactionApi = (accountId: string) : Promise<T1[]> =>
  fetch(`${BASE_URL}/accounts/${accountId}/recent-activity`).then((res) =>res.json());

type T2 = {
  id: number;
  purchasePrice: number;
  quantity: number;
  totalPrice: number;
  stockInfo: StockInfoType;
};
export const getAccountStockApi = (accountId: string): Promise<T2[]> =>
  fetch(`${BASE_URL}/accounts/${accountId}/stocks`).then((res) => res.json());
