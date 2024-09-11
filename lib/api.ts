"use client";
import {
  AccountType,
  IndexType,
  SimpleIndexType,
  SimpleStockInfo,
  UserType,
} from "@/type";
import axios, { AxiosResponse } from "axios";

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

type signInResponse = {
  data: {
    user: UserType;
    account: AccountType;
  };
};

export const signInApi = (
  username: string,
  password: string
): Promise<signInResponse> =>
  api.post("/users/sign-in", { username, password });

export const stockListAPi = () => api.get("/stocks");

export const DailyStockApi = (code: string) => api.get(`/daily-price/${code}`);

export const StockInfoApi = (
  code: string
): Promise<AxiosResponse<SimpleStockInfo>> => api.get(`/stocks/${code}`);

export const KospiIndexApi = (): Promise<AxiosResponse<IndexType[]>> =>
  api.get("/indexes/0001");

export const IndexApi = (
  code: string
): Promise<AxiosResponse<SimpleIndexType>> => api.get(`/indexes/${code}`);
