import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addDash = (value: string) => {
  value = value.replace(/\D/g, "");
  return value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 15);
};
