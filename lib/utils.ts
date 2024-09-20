import { HogaType } from "@/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addDash = (value: string) => {
  value = value.replace(/\D/g, "");
  return value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 15);
};

export const formatNumber = (value: undefined | number) => {
  if (value == undefined) return "0";
  return new Intl.NumberFormat().format(value);
};

export const HokaConnectMessage = (trId: string, trKey: string) => {
  return {
    header: {
      approval_key: process.env.NEXT_PUBLIC_HANTU_APPROVAL_KEY,
      custtype: "P",
      tr_type: "1",
      "content-type": "utf-8",
    },
    body: {
      input: {
        tr_id: trId,
        tr_key: trKey,
      },
    },
  };
};

export const decodeStockHoka = (data: string): HogaType => {
  const recvvalue = data.split("^"); // 수신데이터를 split '^'

  if (recvvalue[12] == undefined) {
    const replaceData = Array.from({ length: 10 }, () => ({
      price: 0,
      remain: 0,
    }));
    return {
      sell: replaceData,
      buy: replaceData,
      totalBuyRemain: 0,
      totalSellRemain: 0,
    };
  }

  const data2 = {
    sell: [
      {
        price: parseInt(recvvalue[12]),
        remain: parseInt(recvvalue[32]),
      },
      {
        price: parseInt(recvvalue[11]),
        remain: parseInt(recvvalue[31]),
      },
      {
        price: parseInt(recvvalue[10]),
        remain: parseInt(recvvalue[30]),
      },
      {
        price: parseInt(recvvalue[9]),
        remain: parseInt(recvvalue[29]),
      },
      {
        price: parseInt(recvvalue[8]),
        remain: parseInt(recvvalue[28]),
      },
      {
        price: parseInt(recvvalue[7]),
        remain: parseInt(recvvalue[27]),
      },
      {
        price: parseInt(recvvalue[6]),
        remain: parseInt(recvvalue[26]),
      },
      {
        price: parseInt(recvvalue[5]),
        remain: parseInt(recvvalue[25]),
      },
      {
        price: parseInt(recvvalue[4]),
        remain: parseInt(recvvalue[24]),
      },
      {
        price: parseInt(recvvalue[3]),
        remain: parseInt(recvvalue[23]),
      },
    ],
    buy: [
      {
        price: parseInt(recvvalue[13]),
        remain: parseInt(recvvalue[33]),
      },
      {
        price: parseInt(recvvalue[14]),
        remain: parseInt(recvvalue[34]),
      },
      {
        price: parseInt(recvvalue[15]),
        remain: parseInt(recvvalue[35]),
      },
      {
        price: parseInt(recvvalue[16]),
        remain: parseInt(recvvalue[36]),
      },
      {
        price: parseInt(recvvalue[17]),
        remain: parseInt(recvvalue[37]),
      },
      {
        price: parseInt(recvvalue[18]),
        remain: parseInt(recvvalue[38]),
      },
      {
        price: parseInt(recvvalue[19]),
        remain: parseInt(recvvalue[39]),
      },
      {
        price: parseInt(recvvalue[20]),
        remain: parseInt(recvvalue[40]),
      },
      {
        price: parseInt(recvvalue[21]),
        remain: parseInt(recvvalue[41]),
      },
      {
        price: parseInt(recvvalue[22]),
        remain: parseInt(recvvalue[42]),
      },
    ],
    totalSellRemain: parseInt(recvvalue[43]),
    totalBuyRemain: parseInt(recvvalue[44]),
  };

  return data2;
};

export const decodeStockPrice = (data: string) => {
  const recvvalue = data.split("^"); // 수신데이터를 split '^'

  const data2 = {
    stck_prpr: recvvalue[2],
    stck_vrss: recvvalue[4],
    prdy_ctrt: recvvalue[5],
    stck_hgpr: recvvalue[8],
    stck_lwpr: recvvalue[9],
  };

  return data2;
};
