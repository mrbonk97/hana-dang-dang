import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "http://34.172.159.135:8080/api";

export const signInApi = (username: string, password: string) =>
  axios.post(`${BASE_URL}/users/sign-in`, { username, password });

export const signUpApi = (
  name: string,
  mobileNo: string,
  username: string,
  password: string
) => axios.post(`${BASE_URL}/users`, { name, mobileNo, username, password });

type AccountDetailType = {
  accountNo: string;
  balance: number;
  profit: number;
  profitPercentage: number;
  stockCurrentBalance: number;
  stockInitBalance: number;
  title: string;
  totalBalance: number;
  withDrawAmount: number;
};

// prettier-ignore
export const getAccountDetailApi = (accountId: string): Promise<AccountDetailType> =>
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

export const sendSmsVerifyApi = async (mobileNo: string) =>
  await axios.post(`${BASE_URL}/sms/verify`, { mobile_no: mobileNo });

export const setGoalApi = async (userId: number, goal: number | string) =>
  await axios.put(`${BASE_URL}/users/${userId}/set-goal`, { goal: goal });
