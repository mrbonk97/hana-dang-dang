import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//prettier-ignore
export const getStockInfoApi = async (code: string) =>
  await fetch(`http://localhost:8080/api/stocks/${code}/info`).then((res) =>res.json());

export type StockPriceType = {
  hts_avls: string;
  stck_prpr: string;
  prdy_vrss: string;
  stck_hgpr: string;
  w52_hgpr: string;
  w52_lwpr: string;
  stck_lwpr: string;
  stac_month: string;
  mrkt_warn_cls_code: string;
  per: string;
  pbr: string;
};

//prettier-ignore
export const getStockPriceApi = async (code: string): Promise<StockPriceType> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/price`)
    .then((res) => res.json())
    .then((res) => res.output);

//prettier-ignore
export const getStockPriceDailyApi = async (code: string) =>
  await fetch(`http://localhost:8080/api/stocks/${code}/daily`).then((res) =>res.json());

export type StockOpinion = {
  stck_bsop_date: string;
  invt_opnn: string;
  invt_opnn_cls_code: string;
  rgbf_invt_opnn: string;
  rgbf_invt_opnn_cls_code: string;
  mbcr_name: string;
  hts_goal_prc: string;
  stck_prdy_clpr: string;
  stck_nday_esdg: string;
  nday_dprt: string;
  stft_esdg: string;
  dprt: string;
};

//prettier-ignore
export const getStockOpinionApi = async (code: string) : Promise<StockOpinion[]> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/opinion`)
    .then((res) => res.json())
    .then((res) => res.output);

export type StockRecentPriceType = {
  stck_bsop_date: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_clpr: string;
  acml_vol: string;
  prdy_vrss_vol_rate: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  hts_frgn_ehrt: string;
  frgn_ntby_qty: string;
  flng_cls_code: string;
  acml_prtt_rate: string;
};

//prettier-ignore
export const getStockRecentPriceApi = (code: string): Promise<StockRecentPriceType[]> =>
  fetch(`${BASE_URL}/stocks/${code}/recent-price`)
    .then((res) => res.json())
    .then((res) => res.output);

//prettier-ignore
export const getStockHokaApi = (code: string) =>
  fetch(`${BASE_URL}/stocks/${code}/hoka`).then((res) => res.json());

export type StockListRankType = {
  data_rank: string;
  hts_kor_isnm: string;
  prdy_ctrt: string;
  prdy_vol: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  stck_prpr: string;
  mksc_shrn_iscd: string;
};

//prettier-ignore
export const getStockListRankApi = (): Promise<StockListRankType[]> =>
  fetch(`${BASE_URL}/stocks/rank`).then((res) => res.json()).then((res) => res.output);

type StockMinutePriceType = {
  output1: {
    prdy_vrss: string;
    prdy_vrss_sign: string;
    prdy_ctrt: string;
    stck_prdy_clpr: string;
    acml_vol: string;
    acml_tr_pbmn: string;
    hts_kor_isnm: string;
    stck_prpr: string;
  };
  output2: {
    stck_bsop_date: string;
    stck_cntg_hour: string;
    stck_prpr: string;
    stck_oprc: string;
    stck_hgpr: string;
    stck_lwpr: string;
    cntg_vol: string;
    acml_tr_pbmn: string;
  }[];
};

//prettier-ignore
export const getStockMinutePriceApi = (code: string, time: string): Promise<StockMinutePriceType> =>
  fetch(`${BASE_URL}/stocks/${code}/minute?time=${time}`).then((res) =>res.json());

//prettier-ignore
export const StockInfoApi = async (code: string) =>
  await fetch(`${BASE_URL}/stocks/${code}/info`).then((res) => res.json());

//prettier-ignore
export const StockOpinionApi = async (code: string) =>
  await fetch(`${BASE_URL}/stocks/opinion/${code}`).then((res) => res.json());

// export const StockRecentPriceApi = async (code: string): Promise<T12> =>
//   await fetch(`${BASE_URL}/stocks/recent-price/${code}`);

export const BuyStockApi = async (
  accountId: string,
  stockCode: string,
  quantity: number,
  price: number
) =>
  await axios.post(`${BASE_URL}/stocks/buy`, {
    accountId,
    stockCode,
    quantity,
    price,
  });
