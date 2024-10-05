import { MARKET_CALENDAR } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: undefined | number | string) => {
  if (value == undefined) return "0";
  if (typeof value == "string")
    return new Intl.NumberFormat().format(parseInt(value));
  return new Intl.NumberFormat().format(value);
};

export const isMarketOpen = (): boolean => {
  const today = new Date();

  MARKET_CALENDAR.some((item) => {
    const month = item.bass_dt.getFullYear();
    const day = item.bass_dt.getMonth();

    if (today.getMonth() == month && today.getDay() == day) {
      if (item.opnd_yn == false) return false;
      else if (today.getHours() >= 16 && today.getHours() < 9) return false;
      return true;
    }
  });

  return false;
};
