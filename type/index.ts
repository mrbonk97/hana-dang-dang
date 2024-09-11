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

export type SimpleStockInfo = {
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

export type IndexType = {
  id: number;
  code: string;
  fullCode: string;
  stckBsopDate: string;
  acml_tr_pbmn: number;
  acml_vol: string;
  bstp_nmix_hgpr: number;
  bstp_nmix_lwpr: number;
  bstp_nmix_oprc: number;
  bstp_nmix_prpr: number;
  mod_yn: string;
};

export type SimpleIndexType = {
  stckBsopDate: string[];
  bstp_nmix_prpr: number[];
};
