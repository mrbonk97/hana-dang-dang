import { Index2Type } from "@/type";
import { api } from "./api";
import { AxiosResponse } from "axios";

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
