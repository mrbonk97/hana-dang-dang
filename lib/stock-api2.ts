import { BasicResponseType, Index3Type, StockType1 } from "@/type";

const BASE_URL = "http://localhost:8080/api";

type T1 = {
  output: {
    pdno: string;
    prdt_type_cd: string;
    mket_id_cd: string;
    scty_grp_id_cd: string;
    excg_dvsn_cd: string;
    setl_mmdd: string;
    lstg_stqt: string;
    lstg_cptl_amt: string;
    cpta: string;
    papr: string;
    issu_pric: string;
    kospi200_item_yn: string;
    scts_mket_lstg_dt: string;
    scts_mket_lstg_abol_dt: string;
    kosdaq_mket_lstg_dt: string;
    kosdaq_mket_lstg_abol_dt: string;
    frbd_mket_lstg_dt: string;
    frbd_mket_lstg_abol_dt: string;
    reits_kind_cd: string;
    etf_dvsn_cd: string;
    oilf_fund_yn: string;
    idx_bztp_lcls_cd: string;
    idx_bztp_mcls_cd: string;
    idx_bztp_scls_cd: string;
    stck_kind_cd: string;
    mfnd_opng_dt: string;
    mfnd_end_dt: string;
    dpsi_erlm_cncl_dt: string;
    etf_cu_qty: string;
    prdt_name: string;
    prdt_name120: string;
    prdt_abrv_name: string;
    std_pdno: string;
    prdt_eng_name: string;
    prdt_eng_name120: string;
    prdt_eng_abrv_name: string;
    dpsi_aptm_erlm_yn: string;
    etf_txtn_type_cd: string;
    etf_type_cd: string;
    lstg_abol_dt: string;
    nwst_odst_dvsn_cd: string;
    sbst_pric: string;
    thco_sbst_pric: string;
    thco_sbst_pric_chng_dt: string;
    tr_stop_yn: string;
    admn_item_yn: string;
    thdt_clpr: string;
    bfdy_clpr: string;
    clpr_chng_dt: string;
    std_idst_clsf_cd: string;
    std_idst_clsf_cd_name: string;
    idx_bztp_lcls_cd_name: string;
    idx_bztp_mcls_cd_name: string;
    idx_bztp_scls_cd_name: string;
    ocr_no: string;
    crfd_item_yn: string;
    elec_scty_yn: string;
    issu_istt_cd: string;
    etf_chas_erng_rt_dbnb: string;
    etf_etn_ivst_heed_item_yn: string;
    stln_int_rt_dvsn_cd: string;
    frnr_psnl_lmt_rt: string;
    lstg_rqsr_issu_istt_cd: string;
    lstg_rqsr_item_cd: string;
    trst_istt_issu_istt_cd: string;
  };
} & BasicResponseType;

//prettier-ignore
export const getStockInfoApi = async (code: string): Promise<T1> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/info`).then((res) =>res.json());

type T2 = {
  output: {
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
    stac_month: string;
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
};

//prettier-ignore
export const getStockPriceApi = async (code: string): Promise<T2> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/price`).then((res) =>res.json());

//prettier-ignore
export const getStockPriceDailyApi = async (code: string): Promise<any> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/daily`).then((res) =>res.json());

export type StockOpinionType = {
  output: {
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
  }[];
};

//prettier-ignore
export const getStockOpinionApi = async (code: string): Promise<StockOpinionType> =>
  await fetch(`http://localhost:8080/api/stocks/${code}/opinion`).then((res) =>res.json());

export type StockRecentPriceType = {
  output: {
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
  }[];
};

//prettier-ignore
export const getStockRecentPriceApi = (code: string): Promise<StockRecentPriceType> =>
  fetch(`${BASE_URL}/stocks/${code}/recent-price`).then((res) => res.json());

export type StockHokaType = {
  output1: {
    aspr_acpt_hour: string;
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
    total_askp_rsqn: string;
    total_bidp_rsqn: string;
    total_askp_rsqn_icdc: string;
    total_bidp_rsqn_icdc: string;
    ovtm_total_askp_icdc: string;
    ovtm_total_bidp_icdc: string;
    ovtm_total_askp_rsqn: string;
    ovtm_total_bidp_rsqn: string;
    ntby_aspr_rsqn: string;
  };

  output2: {
    antc_mkop_cls_code: string;
    stck_prpr: string;
    stck_oprc: string;
    stck_hgpr: string;
    stck_lwpr: string;
    stck_sdpr: string;
    antc_cnpr: string;
    antc_cntg_vrss_sign: string;
    antc_cntg_vrss: string;
    antc_cntg_prdy_ctrt: string;
    antc_vol: string;
    stck_shrn_iscd: string;
    vi_cls_code: string;
  };
};

export const getStockHokaApi = (code: string): Promise<StockHokaType> =>
  fetch(`${BASE_URL}/stocks/${code}/hoka`).then((res) => res.json());

export type StockListRankType = {
  output: StockType1[];
};

export const getStockListRankApi = (): Promise<StockListRankType> =>
  fetch(`${BASE_URL}/stocks/rank`).then((res) => res.json());

type T3 = {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
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

export const getStockMinutePriceApi = (
  code: string,
  time: string
): Promise<T3> =>
  fetch(`${BASE_URL}/stocks/${code}/minute?time=${time}`).then((res) =>
    res.json()
  );
