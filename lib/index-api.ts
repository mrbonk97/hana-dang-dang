import { Index2Type } from "@/type";
import { api } from "./api";
import { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080/api";

type T1 = {
  stockCurrentPrice: {
    msg1: string;
    msg_cd: string;
    output1: any;
  };
  output2: Index2Type[];
};

export const getIndexListApi = (): Promise<AxiosResponse<T1>> =>
  api.get("/indexes");

export type IndexValueType = {
  stck_bsop_date: string;
  bstp_nmix_prpr: string;
  bstp_nmix_oprc: string;
  bstp_nmix_hgpr: string;
  bstp_nmix_lwpr: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  mod_yn: string;
};

type T2 = {
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
  output2: IndexValueType[];
};

export const getIndexDataApi = (code: string): Promise<T2> =>
  fetch(`${BASE_URL}/indexes/${code}`).then((res) => res.json());

export const getIndexDetailLongApi = (code: string) =>
  api.get(`/indexes/long/${code}`);
