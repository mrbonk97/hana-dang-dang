import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type DividendHistoryType = {
  id: number;
  title: string;
  code: string;
  lockDate: string;
  payDate: string;
  dividendType: string;
  amount: number;
  yieldPercentage: number;
  dividendPercentage: number;
};

// prettier-ignore
export const getDividendStockInfo = async (code: string) : Promise<DividendHistoryType[]> =>
  await fetch(`${BASE_URL}/dividend/stocks/${code}`).then((res) =>res.json());

export const getDividendRank = async () =>
  await fetch(`${BASE_URL}/dividend`).then((res) => res.json());

type DividendCalendarType = {
  divi_kind: string;
  divi_pay_dt: string;
  divi_rate: string;
  face_val: string;
  high_divi_gb: string;
  isin_name: string;
  odd_pay_dt: string;
  per_sto_divi_amt: string;
  record_date: string;
  sht_cd: string;
  stk_div_pay_dt: string;
  stk_divi_rate: string;
  stk_kind: string;
};

// prettier-ignore
export const getDividendCalendar = async (date: string): Promise<DividendCalendarType[]> =>
  await fetch(`${BASE_URL}/dividend/calendar/${date}`)
    .then((res) => res.json())
    .then((res) => res.output1);

// prettier-ignore
export const getBoardMeeting = async (code: string) =>
  await fetch(`${BASE_URL}/dividend/stocks/${code}/meeting`).then((res) => res.json());

export const getRecommendStockApi = async (data: any) =>
  await axios.post(`${BASE_URL}/dividend/recommend`, data);

type SearchStockType = {
  code: string;
  prdtAbrvName: string;
  stckClpr: number;
  prdyVrss: number;
};

// prettier-ignore
export const searchStockApi = async (keyword: string): Promise<SearchStockType[]> =>
  await fetch(`${BASE_URL}/stocks/search?keyword=${keyword}`).then((res) => res.json());
