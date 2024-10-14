import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//prettier-ignore
export const getStockInfoApi = async (code: string) =>
  await fetch(`${BASE_URL}/stocks/${code}/info`).then((res) =>res.json());

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
  await fetch(`${BASE_URL}/stocks/${code}/price`)
    .then((res) => res.json())
    .then((res) => res.output);

export type StockPriceListType = {
  id: 1134035;
  code: "005930";
  fid_cond_mkrt_div_code: "J";
  stck_clpr: "61300";
  stck_oprc: "61000";
  stck_hgpr: "61400";
  stck_lwpr: "60900";
  acml_vol: "7060190";
  acml_tr_pbmn: "431170639100";
  flng_cls_code: "00";
  prtt_rate: "0.00";
  mod_yn: "N";
  prdy_vrss_sign: "3";
  prdy_vrss: "0";
  revl_issu_reas: null;
  title: "삼성전자";
  stck_bsop_date: "20241004";
};

export const getStockPriceListApi = async (data: {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
}): Promise<StockPriceListType[]> =>
  await fetch(
    `${BASE_URL}/stocks/list-price?c1=${data.c1}&c2=${data.c2}&c3=${data.c3}&c4=${data.c4}&c5=${data.c5}`
  ).then((res) => res.json());

//prettier-ignore
export const getStockPriceDailyApi = async (code: string) =>
  await fetch(`${BASE_URL}/stocks/${code}/daily`).then((res) =>res.json());

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
  await fetch(`${BASE_URL}/stocks/${code}/opinion`)
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

export type HokaType = {
  askp1: string;
  askp2: string;
  askp3: string;
  askp4: string;
  askp5: string;
  askp6: string;
  askp7: string;
  askp8: string;
  askp9: string;
  askp10: string;
  askp_rsqn1: string;
  askp_rsqn2: string;
  askp_rsqn3: string;
  askp_rsqn4: string;
  askp_rsqn5: string;
  askp_rsqn6: string;
  askp_rsqn7: string;
  askp_rsqn8: string;
  askp_rsqn9: string;
  askp_rsqn10: string;
  askp_rsqn_icdc1: string;
  askp_rsqn_icdc2: string;
  askp_rsqn_icdc3: string;
  askp_rsqn_icdc4: string;
  askp_rsqn_icdc5: string;
  askp_rsqn_icdc6: string;
  askp_rsqn_icdc7: string;
  askp_rsqn_icdc8: string;
  askp_rsqn_icdc9: string;
  askp_rsqn_icdc10: string;
  aspr_acpt_hour: string;
  bidp1: string;
  bidp2: string;
  bidp3: string;
  bidp4: string;
  bidp5: string;
  bidp6: string;
  bidp7: string;
  bidp8: string;
  bidp9: string;
  bidp10: string;
  bidp_rsqn1: string;
  bidp_rsqn2: string;
  bidp_rsqn3: string;
  bidp_rsqn4: string;
  bidp_rsqn5: string;
  bidp_rsqn6: string;
  bidp_rsqn7: string;
  bidp_rsqn8: string;
  bidp_rsqn9: string;
  bidp_rsqn10: string;
  bidp_rsqn_icdc1: string;
  bidp_rsqn_icdc2: string;
  bidp_rsqn_icdc3: string;
  bidp_rsqn_icdc4: string;
  bidp_rsqn_icdc5: string;
  bidp_rsqn_icdc6: string;
  bidp_rsqn_icdc7: string;
  bidp_rsqn_icdc8: string;
  bidp_rsqn_icdc9: string;
  bidp_rsqn_icdc10: string;
  new_mkop_cls_code: string;
  ntby_aspr_rsqn: string;
  ovtm_total_askp_icdc: string;
  ovtm_total_askp_rsqn: string;
  ovtm_total_bidp_icdc: string;
  ovtm_total_bidp_rsqn: string;
  total_askp_rsqn: string;
  total_askp_rsqn_icdc: string;
  total_bidp_rsqn: string;
  total_bidp_rsqn_icdc: string;
};

type StockHokaApiType = {
  output1: HokaType;
  output2: {
    antc_cnpr: string;
    antc_cntg_prdy_ctrt: string;
    antc_cntg_vrss: string;
    antc_cntg_vrss_sign: string;
    antc_mkop_cls_code: string;
    antc_vol: string;
    stck_hgpr: string;
    stck_lwpr: string;
    stck_oprc: string;
    stck_prpr: string;
    stck_sdpr: string;
    stck_shrn_iscd: string;
    vi_cls_code: string;
  };
};

//prettier-ignore
export const getStockHokaApi = (code: string) : Promise<StockHokaApiType> =>
  fetch(`${BASE_URL}/stocks/${code}/hoka`).then((res) => res.json());

export type StockListRankType = {
  hts_kor_isnm: string;
  mksc_shrn_iscd: string;
  data_rank: string;
  stck_prpr: string;
  prdy_vrss_sign: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  prdy_vol: string;
  lstn_stcn: string;
  avrg_vol: string;
  n_befr_clpr_vrss_prpr_rate: string;
  vol_inrt: string;
  vol_tnrt: string;
  nday_vol_tnrt: string;
  avrg_tr_pbmn: string;
  tr_pbmn_tnrt: string;
  nday_tr_pbmn_tnrt: string;
  acml_tr_pbmn: string;

  // 등락률
  stck_shrn_iscd: string;
  //        data_rank: string;
  //        hts_kor_isnm: string;
  //        stck_prpr: string;
  //        prdy_vrss: string;
  //        prdy_vrss_sign: string;
  //        prdy_ctrt: string;
  //        acml_vol: string;
  stck_hgpr: string;
  hgpr_hour: string;
  acml_hgpr_date: string;
  stck_lwpr: string;
  lwpr_hour: string;
  acml_lwpr_date: string;
  lwpr_vrss_prpr_rate: string;
  dsgt_date_clpr_vrss_prpr_rate: string;
  cnnt_ascn_dynu: string;
  hgpr_vrss_prpr_rate: string;
  cnnt_down_dynu: string;
  oprc_vrss_prpr_sign: string;
  oprc_vrss_prpr: string;
  oprc_vrss_prpr_rate: string;
  prd_rsfl: string;
  prd_rsfl_rate: string;

  // 체결강도
  //        stck_shrn_iscd: string;
  //        data_rank: string;
  //        hts_kor_isnm: string;
  //        stck_prpr: string;
  //        prdy_vrss: string;
  //        prdy_vrss_sign: string;
  //        prdy_ctrt: string;
  //        acml_vol: string;
  tday_rltv: string;
  seln_cnqn_smtn: string;
  shnu_cnqn_smtn: string;

  // 공매도 순위
  //        mksc_shrn_iscd: string;
  //        hts_kor_isnm: string;
  //        stck_prpr: string;
  //        prdy_vrss: string;
  //        prdy_vrss_sign: string;
  //        prdy_ctrt: string;
  //        acml_vol: string;
  //        acml_tr_pbmn: string;
  ssts_cntg_qty: string;
  ssts_vol_rlim: string;
  ssts_tr_pbmn: string;
  ssts_tr_pbmn_rlim: string;
  stnd_date1: string;
  stnd_date2: string;
  avrg_prc: string;
};

//prettier-ignore
export const getStockListRankApi = (type:string): Promise<StockListRankType[]> =>
  fetch(`${BASE_URL}/stocks/rank?type=${type}`).then((res) => res.json()).then((res) => res.output);

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

type BuyStockApiResponse = {
  data: {
    price: number;
    quantity: number;
  };
};

export const BuyStockApi = async (
  accountId: string,
  stockCode: string,
  quantity: number,
  price: number
): Promise<BuyStockApiResponse> =>
  await axios.post(`${BASE_URL}/stocks/buy`, {
    accountId,
    stockCode,
    quantity,
    price,
  });

export const OrderStockApi = async (
  accountId: string,
  stockCode: string,
  quantity: number,
  price: number
) =>
  await axios.post(`${BASE_URL}/stocks/order`, {
    accountId,
    stockCode,
    quantity,
    price,
  });

export type StockListType = {
  rn: number;
  prdtAbrvName: string;
  code: string;
  stdIdstClsfCdName: string;
  stckClpr: string;
  acmlVol: string;
  acmlTrPbmn: string;
  prdyVrss: string;
};

export const getStockListApi = async (
  page: number
): Promise<StockListType[]> => {
  return await fetch(`${BASE_URL}/stocks?page=${page}`).then((res) =>
    res.json()
  );
};

export type StockStabilityType = {
  stac_yymm: string;
  lblt_rate: string;
  bram_depn: string;
  crnt_rate: string;
  quck_rate: string;
};

export const getStockStabilityApi = async (
  code: string
): Promise<StockStabilityType[]> =>
  await fetch(`${BASE_URL}/stocks/${code}/stability`)
    .then((res) => res.json())
    .then((res) => res.output)
    .then((res) => {
      const res2 = res.map((item: StockStabilityType) => {
        return {
          stac_yymm: item.stac_yymm,
          lblt_rate: parseFloat(item.lblt_rate),
          bram_depn: parseFloat(item.bram_depn),
          crnt_rate: parseFloat(item.crnt_rate),
          quck_rate: parseFloat(item.quck_rate),
        };
      });

      return res2;
    });

export type OtherInfoType = {
  stac_yymm: string;
  payout_rate: string;
};
export const getOtherInfoApi = async (code: string): Promise<OtherInfoType[]> =>
  await fetch(`${BASE_URL}/stocks/${code}/other`)
    .then((res) => res.json())
    .then((res) => res.output);
