// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "https://api.hana-dividend.site/api";

export type RecentTransactionType = {
  id: number;
  amount: number;
  createdAt: string;
  dividendType: string | null;
  price: number;
  quantity: number | null;
  stockInfo: {
    prdt_abrv_name: "현대엘리베이";
  } | null;
  transactionType: string;
  updatedAt: string;
};

// prettier-ignore
export const getRecentTransactionApi = (accountId: string): Promise<RecentTransactionType[]> =>
  fetch(`${BASE_URL}/accounts/${accountId}/recent-activity`).then((res) =>res.json());

export type AccountStockType = {
  code: string;
  title: string;
  quantity: number;
  purchasePrice: number;
  purchaseTotalPrice: number;
  currentPrice: number;
  currentTotalPrice: number;
  profit: number;
  profitPercentage: number;
};

// prettier-ignore
export const getAccountStockApi = (accountId: string) : Promise<AccountStockType[]> =>
  fetch(`${BASE_URL}/accounts/${accountId}/stocks`).then((res) => res.json());

// prettier-ignore
export const FillAccountBalanceApi = (accountNo: string, amount: number) =>
  fetch(`${BASE_URL}/accounts/${accountNo}/fill?amount=${amount}`);

export type AccountDividendHistoryType = {
  id: number;
  transactionType: string;
  dividendType: string;
  amount: number;
  quantity: number | null;
  price: number;
  createdAt: string;
  updatedAt: string;
  stockInfo: {
    pdno: string;
    code: string;
    prdt_name: string;
    prdt_abrv_name: string;
    prdt_eng_abrv_name: string;
    std_idst_clsf_cd: string | null;
    std_idst_clsf_cd_name: string | null;
    idx_bztp_lcls_cd_name: string | null;
    idx_bztp_mcls_cd_name: string | null;
    idx_bztp_scls_cd_name: string | null;
  };
};

// prettier-ignore
export const getAccountDividendHistoryApi = async (accountNo: string) : Promise<AccountDividendHistoryType[]> =>
  await fetch(`${BASE_URL}/accounts/${accountNo}/dividend`).then((res) =>res.json());

export type DividendEstimateType = {
  id: number;
  code: string;
  title: string;
  quantity: number;
  purchasePrice: number;
  totalPrice: number;
  estimateProfit: number;
  amount: number;
  percentage: number;
};

// prettier-ignore
export const getAccountDividendEstimate = async (accountNo: string): Promise<DividendEstimateType[]> =>
  await fetch(`${BASE_URL}/accounts/${accountNo}/dividend-estimate`).then((res) => res.json());

export type AccountMonthlyDividendEstimateType = {
  id: number;
  code: string;
  title: string;
  quantity: number;
  purchasePrice: number;
  totalPrice: number;
  estimateProfit: number;
  amount: number;
  percentage: number;
  payDate: string;
};

// prettier-ignore
export const getAccountMonthlyDividendEstimate = async (accountNo: string): Promise<AccountMonthlyDividendEstimateType[]> =>
  await fetch(`${BASE_URL}/accounts/${accountNo}/dividend-estimate-monthly`).then((res) => res.json());
