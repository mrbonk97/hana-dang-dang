import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAccountDetailApi = (accountId: string) =>
  fetch(`${BASE_URL}/accounts/${accountId}`).then((res) => res.json());

export const registerDividendLabApi = (
  userId: number,
  goal: string,
  riskType: string,
  preference: string,
  area: string
) =>
  axios.put(`${BASE_URL}/users/${userId}/dividend-register`, {
    dividendGoal: parseInt(goal),
    dividendRiskType: riskType,
    dividendPreference: preference,
    dividendArea: area,
  });
