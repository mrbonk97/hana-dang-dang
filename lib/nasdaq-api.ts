import axios, { AxiosPromise } from "axios";

const axios2 = axios.create({
  baseURL: "https://openapi.koreainvestment.com:9443",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjM4ZDQ4NDI1LTc3ODItNDU3ZC04ZGJmLTc4OWE3ZjNkN2Y4MyIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcyNzM1OTEyOCwiaWF0IjoxNzI3MjcyNzI4LCJqdGkiOiJQUzRWb1g1S3RQUGVCdlZXVjBoc241TUFvdU5samxscXRGTWEifQ.O6XXAb8f8024Owqob3nJ1lH2QSICXj9Lht4kw-02Ds9T6ckTubyaMmH6Mm0kV_Og3dXCG6gllWEXhktp8HmwgA",
    appkey: "PS4VoX5KtPPeBvVWV0hsn5MAouNljllqtFMa",
    appsecret:
      "tDSJE/HOO7fDgxPkr7XhsNwoiyUJ9vkPvlz4xHtM3unQ6poQaCp+bwpHaxQk/WMpzLWZtcTQygabLg6GAUT+gKNq+AV68eye8xGvOiVaEq2ZlS3ztLBdPj7wz3a4YkDT6yd9ODeS7UoqNANC3h7CixtFRgYlFXJhYjS4W0BJYZXxhdHo19Q=",
  },
});

type T2 = {
  output2: {
    xymd: string;
    clos: string;
    sign: string;
    diff: string;
    rate: string;
    open: string;
    high: string;
    low: string;
    tvol: string;
    tamt: string;
    pbid: string;
    vbid: string;
    pask: string;
    vask: string;
  }[];
};

export const getOverseaStockDailyPrice = async (
  code: string
): Promise<AxiosPromise<T2>> =>
  await axios2(
    `/uapi/overseas-price/v1/quotations/dailyprice?AUTH&EXCD=NAS&SYMB=${code}&GUBN=0&BYMD=20240926&MODP=0`,
    {
      headers: {
        tr_id: "HHDFS76240000",
      },
    }
  );

type T1 = {
  data: {
    output: {
      rsym: string; // 실시간조회종목코드
      zdiv: string; // 전일거래량
      curr: string; // 시가
      vnit: string; // 고가
      open: string; // 저가
      high: string; // 현재가
      low: string; // 전일종가
      last: string; // 시가총액
      base: string; // 전일거래대금
      pvol: string; // 상한가
      pamt: string; // 하한가
      uplp: string; // 52주최고가
      dnlp: string; // 52주최고일자
      h52p: string; // 52주최저가
      h52d: string; // 52주최저일자
      l52p: string; // PER
      l52d: string; // PBR
      perx: string; // EPS
      pbrx: string; // BPS
      epsx: string; // 상장주수
      bpsx: string; // 자본금
      shar: string; // 통화
      mcap: string; // 소수점자리수
      tomv: string; // 매매단위
      t_xprc: string; // 원환산당일가격
      t_xdif: string; // 원환산당일대비
      t_xrat: string; // 원환산당일등락
      p_xprc: string; // 원환산전일가격
      p_xdif: string; // 원환산전일대비
      p_xrat: string; // 원환산전일등락
      t_rate: string; // 당일환율
      p_rate: string; // 전일환율
      t_xsgn: string; // 원환산당일기호
      p_xsng: string; // 원환산전일기호
      e_ordyn: string; // 거래가능여부
      e_hogau: string; // 호가단위
      e_icod: string; // 업종
      e_parp: string; // 액면가
      tvol: string; // 거래량
      tamt: string; // 거래대금
      etyp_nm: string; // ETP
    };
    rt_cd: string;
    msg_cd: string;
    msg1: string;
  };
};

export const getOverseaStockPriceDetail = async (code: string): Promise<T1> =>
  await axios2.get(
    `/uapi/overseas-price/v1/quotations/price-detail?AUTH&EXCD=NAS&SYMB=${code}`,
    {
      headers: {
        tr_id: "HHDFS76200200",
      },
    }
  );

type T3 = {
  data: {
    output: {
      std_pdno: string;
      prdt_eng_name: string;
      natn_cd: string;
      natn_name: string;
      tr_mket_cd: string;
      tr_mket_name: string;
      ovrs_excg_cd: string;
      ovrs_excg_name: string;
      tr_crcy_cd: string;
      ovrs_papr: string;
      crcy_name: string;
      ovrs_stck_dvsn_cd: string;
      prdt_clsf_cd: string;
      prdt_clsf_name: string;
      sll_unit_qty: string;
      buy_unit_qty: string;
      tr_unit_amt: string;
      lstg_stck_num: string;
      lstg_dt: string;
      ovrs_stck_tr_stop_dvsn_cd: string;
      lstg_abol_item_yn: string;
      ovrs_stck_prdt_grp_no: string;
      lstg_yn: string;
      tax_levy_yn: string;
      ovrs_stck_erlm_rosn_cd: string;
      ovrs_stck_hist_rght_dvsn_cd: string;
      chng_bf_pdno: string;
      prdt_type_cd_2: string;
      ovrs_item_name: string;
      sedol_no: string;
      blbg_tckr_text: string;
      ovrs_stck_etf_risk_drtp_cd: string;
      etp_chas_erng_rt_dbnb: string;
      istt_usge_isin_cd: string;
      mint_svc_yn: string;
      mint_svc_yn_chng_dt: string;
      prdt_name: string;
      lei_cd: string;
      ovrs_stck_stop_rson_cd: string;
      lstg_abol_dt: string;
      mini_stk_tr_stat_dvsn_cd: string;
      mint_frst_svc_erlm_dt: string;
      mint_dcpt_trad_psbl_yn: string;
      mint_fnum_trad_psbl_yn: string;
      mint_cblc_cvsn_ipsb_yn: string;
      ptp_item_yn: string;
      ptp_item_trfx_exmt_yn: string;
      ptp_item_trfx_exmt_strt_dt: string;
      ptp_item_trfx_exmt_end_dt: string;
      dtm_tr_psbl_yn: string;
      sdrf_stop_ecls_yn: string;
      sdrf_stop_ecls_erlm_dt: string;
    };
  };
};

export const getOverseaStockInfo = async (code: string): Promise<T3> =>
  await axios.get(
    `https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/search-info?PRDT_TYPE_CD=512&PDNO=${code}`,
    {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjM4ZDQ4NDI1LTc3ODItNDU3ZC04ZGJmLTc4OWE3ZjNkN2Y4MyIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcyNzM1OTEyOCwiaWF0IjoxNzI3MjcyNzI4LCJqdGkiOiJQUzRWb1g1S3RQUGVCdlZXVjBoc241TUFvdU5samxscXRGTWEifQ.O6XXAb8f8024Owqob3nJ1lH2QSICXj9Lht4kw-02Ds9T6ckTubyaMmH6Mm0kV_Og3dXCG6gllWEXhktp8HmwgA",
        appkey: "PS4VoX5KtPPeBvVWV0hsn5MAouNljllqtFMa",
        appsecret:
          "tDSJE/HOO7fDgxPkr7XhsNwoiyUJ9vkPvlz4xHtM3unQ6poQaCp+bwpHaxQk/WMpzLWZtcTQygabLg6GAUT+gKNq+AV68eye8xGvOiVaEq2ZlS3ztLBdPj7wz3a4YkDT6yd9ODeS7UoqNANC3h7CixtFRgYlFXJhYjS4W0BJYZXxhdHo19Q=",
        tr_id: "CTPF1702R",
      },
    }
  );
