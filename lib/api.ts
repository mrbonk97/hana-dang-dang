"use client";
import {
  AccountType,
  IndexType,
  NewsType,
  SimpleIndexType,
  StockInfoType,
  StockCurrentPriceType,
  StockRankResponseType,
  StockRankType,
  StockWithPriceType,
  UserType,
  Index3Type,
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

export const stockListAPi = (): Promise<AxiosResponse<StockWithPriceType[]>> =>
  api.get("/stocks");

export const DailyStockApi = (
  code: string
): Promise<AxiosResponse<Index3Type[]>> => api.get(`/daily-price/${code}`);

export const KospiIndexApi = (): Promise<AxiosResponse<IndexType[]>> =>
  api.get("/indexes/0001");

export const RecentNewsApi = (): Promise<AxiosResponse<NewsType[]>> =>
  api.get("/news/recent");

export const StockRankApi = (): Promise<AxiosResponse<StockRankResponseType>> =>
  api.get("/han-tu/rank");

export const FillAccountBalanceApi = (accountNo: string, amount: number) =>
  api.put(`/account/${accountNo}/fill`, { amount });
