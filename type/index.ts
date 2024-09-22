import { string } from "zod";

export type UserType = {
  id: number;
  name: string;
  username: string;
};

export type AccountType = {
  accountNo: string;
  title: string;
  balance: number;
};

export type DailyStockInfoType = {
  stckBsopDate: number;
  stck_oprc: number;
  stck_hgpr: number;
  stck_lwpr: number;
  stck_clpr: number;
  acml_vol: number;
  prdy_vrss_vol_rate: number;
  prdy_vrs: number;
  prdy_vrss_sign: number;
  prdy_ctrt: number;
  hts_frgn_ehrt: number;
  frgn_ntby_qty: number;
  flng_cls_code: number;
  acml_prtt_rate: number;
};

export type StockInfoType = {
  admn_item_yn: string;
  bfdy_clpr: string;
  clpr_chng_dt: string;
  code: string;
  cpta: string;
  dpsi_aptm_erlm_yn: string;
  dpsi_erlm_cncl_dt: string;
  etf_cu_qty: string;
  etf_dvsn_cd: string;
  etf_txtn_type_cd: string;
  etf_type_cdstring: string;
  excg_dvsn_cd: string;
  frbd_mket_lstg_abol_dt: string;
  frbd_mket_lstg_dt: string;
  idx_bztp_lcls_cd: string;
  idx_bztp_lcls_cd_name: string;
  idx_bztp_mcls_cd: string;
  idx_bztp_mcls_cd_name: string;
  idx_bztp_scls_cd: string;
  idx_bztp_scls_cd_name: string;
  issu_pric: string;
  kosdaq_mket_lstg_abol_dt: string;
  kosdaq_mket_lstg_dt: string;
  kospi200_item_yn: string;
  lstg_abol_dt: string;
  lstg_cptl_amt: string;
  lstg_stqt: string;
  mfnd_end_dt: string;
  mfnd_opng_dt: string;
  mket_id_cd: string;
  nwst_odst_dvsn_cd: string;
  oilf_fund_yn: string;
  papr: string;
  pdno: string;
  prdt_abrv_name: string;
  prdt_eng_abrv_name: string;
  prdt_eng_name: string;
  prdt_eng_name120: string;
  prdt_name: string;
  prdt_name120: string;
  prdt_type_cd: string;
  reits_kind_cd: string;
  sbst_pric: string;
  scts_mket_lstg_abol_dt: string;
  scts_mket_lstg_dt: string;
  scty_grp_id_cd: string;
  setl_mmdd: string;
  stck_kind_cd: string;
  std_idst_clsf_cd: string;
  std_idst_clsf_cd_name: string;
  std_pdno: string;
  thco_sbst_pric: string;
  thco_sbst_pric_chng_dt: string;
  thdt_clpr: string;
  tr_stop_yn: string;
};

export type IndexInfoType = {
  bstp_nmix_prdy_vrss: string;
  prdy_vrss_sign: string;
  bstp_nmix_prdy_ctrt: string;
  prdy_nmix: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  hts_kor_isnm: string;
  bstp_nmix_prpr: string;
  bstp_cls_code: string;
  prdy_vol: string;
  bstp_nmix_oprc: string;
  bstp_nmix_hgpr: string;
  bstp_nmix_lwpr: string;
  futs_prdy_oprc: string;
  futs_prdy_hgpr: string;
  futs_prdy_lwpr: string;
};

export type IndexType = {
  id: string;
  code: string;
  fullCode: string;
  stck_bsop_date: string;
  acml_tr_pbmn: string;
  acml_vol: string;
  bstp_nmix_hgpr: string;
  bstp_nmix_lwpr: string;
  bstp_nmix_oprc: string;
  bstp_nmix_prpr: string;
  mod_yn: string;
};

export type Index2Type = {
  acml_tr_pbmn: string;
  acml_vol: string;
  bstp_cls_code: string;
  bstp_nmix_prdy_ctrt: string;
  bstp_nmix_prdy_vrss: string;
  bstp_nmix_prpr: string;
  hts_kor_isnm: string;
  prdy_vrss_sign: string;
};

export type Index3Type = {
  acml_tr_pbmn: string;
  acml_vol: string;
  code: string;
  fid_cond_mkrt_div_code: string;
  flng_cls_code: string;
  id: string;
  mod_yn: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prtt_rate: string;
  revl_issu_reas: string;
  stck_bsop_date: string;
  stck_clpr: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_oprc: string;
};

export type SimpleIndexType = {
  stckBsopDate: string[];
  bstp_nmix_prpr: number[];
};

export type NewsType = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StockRankResponseType = {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output: StockRankType[];
};

export type StockRankType = {
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
};

export type StockWithPriceType = {
  code: string;
  prdtAbrvName: string;
  idxBztpMclsCdName: string;
  stckClpr: number;
  prdyVrss: number;
  acmlVol: number;
  prdyVrssSign: number;
};

export type StockCurrentPriceType = {
  iscd_stat_cls_code: string;
  marg_rate: string;
  rprs_mrkt_kor_name: string;
  bstp_kor_isnm: string;
  temp_stop_yn: string;
  oprc_rang_cont_yn: string;
  clpr_rang_cont_yn: string;
  crdt_able_yn: string;
  grmn_rate_cls_code: string;
  elw_pblc_yn: string;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  acml_tr_pbmn: string;
  acml_vol: string;
  prdy_vrss_vol_rate: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_mxpr: string;
  stck_llam: string;
  stck_sdpr: string;
  wghn_avrg_stck_prc: string;
  hts_frgn_ehrt: string;
  frgn_ntby_qty: string;
  pgtr_ntby_qty: string;
  pvt_scnd_dmrs_prc: string;
  pvt_frst_dmrs_prc: string;
  pvt_pont_val: string;
  pvt_frst_dmsp_prc: string;
  pvt_scnd_dmsp_prc: string;
  dmrs_val: string;
  dmsp_val: string;
  cpfn: string;
  rstc_wdth_prc: string;
  stck_fcam: string;
  stck_sspr: string;
  aspr_unit: string;
  hts_deal_qty_unit_val: string;
  lstn_stcn: string;
  hts_avls: string;
  per: string;
  pbr: string;
  vol_tnrt: string;
  eps: string;
  bps: string;
  d250_hgpr: string;
  d250_hgpr_date: string;
  d250_hgpr_vrss_prpr_rate: string;
  d250_lwpr: string;
  d250_lwpr_date: string;
  d250_lwpr_vrss_prpr_rate: string;
  stck_dryy_hgpr: string;
  dryy_hgpr_vrss_prpr_rate: string;
  dryy_hgpr_date: string;
  stck_dryy_lwpr: string;
  dryy_lwpr_vrss_prpr_rate: string;
  dryy_lwpr_date: string;
  w52_hgpr: string;
  w52_hgpr_vrss_prpr_ctrt: string;
  w52_hgpr_date: string;
  w52_lwpr: string;
  w52_lwpr_vrss_prpr_ctrt: string;
  w52_lwpr_date: string;
  whol_loan_rmnd_rate: string;
  ssts_yn: string;
  stck_shrn_iscd: string;
  fcam_cnnm: string;
  cpfn_cnnm: string;
  frgn_hldn_qty: string;
  vi_cls_code: string;
  ovtm_vi_cls_code: string;
  last_ssts_cntg_qty: string;
  invt_caful_yn: string;
  mrkt_warn_cls_code: string;
  short_over_yn: string;
  sltr_yn: string;
};

export type HogaType = {
  sell: {
    price: number;
    remain: number;
  }[];
  buy: {
    price: number;
    remain: number;
  }[];
  totalSellRemain: number;
  totalBuyRemain: number;
};
