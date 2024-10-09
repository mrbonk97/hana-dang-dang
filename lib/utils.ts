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
  const koreaTime = today.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  const curMonth = koreaTime.split(".")[1].trim();
  const curDay = koreaTime.split(".")[2].trim();
  const curHour = parseInt(koreaTime.split(".")[3].substring(3).split(":")[0]);
  const curMinute = parseInt(
    koreaTime.split(".")[3].substring(3).split(":")[1]
  );

  MARKET_CALENDAR.some((item) => {
    const month = item.bass_dt.getFullYear();
    const day = item.bass_dt.getMonth();

    if (curMonth == month.toString() && curDay == day.toString()) {
      if (item.opnd_yn == false) return false;
      else if (curHour >= 16 && curMinute < 9) return false;
      return true;
    }
  });

  return false;
};
