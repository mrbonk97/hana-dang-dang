import { api } from "./api";

export const getAccountDetailApi = (accountId: string) =>
  api.get(`/accounts/${accountId}`);
