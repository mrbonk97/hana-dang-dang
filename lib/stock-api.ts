import { AxiosResponse } from "axios";
import { api } from "./api";
import { StockCurrentPriceType, StockInfoType } from "@/type";

type T1 = {
  stockCurrentPrice: {
    msg1: string;
    msg_cd: string;
    output: StockCurrentPriceType;
  };
  stockInfo: StockInfoType;
};

export const StockInfoApi = (code: string): Promise<AxiosResponse<T1>> =>
  api.get(`/stocks/${code}`);
