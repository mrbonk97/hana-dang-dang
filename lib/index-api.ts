// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "http://34.172.159.135:8080/api";

export type IndexListType = {
  bstp_cls_code: string;
  hts_kor_isnm: string;
  bstp_nmix_prpr: string;
  bstp_nmix_prdy_vrss: string;
  prdy_vrss_sign: string;
  bstp_nmix_prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
};

export const getIndexListApi = async (): Promise<IndexListType[]> =>
  await fetch(`${BASE_URL}/indexes`)
    .then((res) => res.json())
    .then((res) => res.output2);

// prettier-ignore
export const getIndexDataApi = async (code: string): Promise<IndexDetailLongType> =>
  await fetch(`${BASE_URL}/indexes/${code}`).then((res) => res.json());

export type IndexDetailLongType = {
  output1: {
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
  output2: {
    stck_bsop_date: string;
    bstp_nmix_prpr: string;
    bstp_nmix_oprc: string;
    bstp_nmix_hgpr: string;
    bstp_nmix_lwpr: string;
    acml_vol: string;
    acml_tr_pbmn: string;
    mod_yn: string;
  }[];
};

// prettier-ignore
export const getIndexDetailLongApi = async (code: string): Promise<IndexDetailLongType> =>
  await fetch(`${BASE_URL}/indexes/long/${code}`).then((res) => res.json());
