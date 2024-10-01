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
