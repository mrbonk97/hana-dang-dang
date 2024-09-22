import { MutableRefObject, RefObject, useEffect } from "react";
import { decodeStockHoka, decodeStockPrice, formatNumber } from "./utils";

const WS_URL = "ws://ops.koreainvestment.com:21000";

const getConnectionString = (trId: string, trKey: string) => {
  const CONNECT_MESSAGE = {
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

  return JSON.stringify(CONNECT_MESSAGE);
};

interface Props {
  socket: MutableRefObject<WebSocket | null>;
  code: string;
  sellPriceRefs: RefObject<HTMLDivElement>[];
  sellRemainRefs: RefObject<HTMLDivElement>[];
  sellRemainValueRefs: RefObject<HTMLDivElement>[];
  buyPriceRefs: RefObject<HTMLDivElement>[];
  buyRemainRefs: RefObject<HTMLDivElement>[];
  buyRemainValueRefs: RefObject<HTMLDivElement>[];
  currentPriceRef: RefObject<HTMLDivElement>;
  previousPriceRef: RefObject<HTMLDivElement>;
  highPriceRef: RefObject<HTMLDivElement>;
  lowPriceRef: RefObject<HTMLDivElement>;
}

export const getHantuSocket = ({
  socket,
  code,
  sellPriceRefs,
  sellRemainRefs,
  sellRemainValueRefs,
  buyPriceRefs,
  buyRemainRefs,
  buyRemainValueRefs,
  currentPriceRef,
  previousPriceRef,
  highPriceRef,
  lowPriceRef,
}: Props) => {
  useEffect(() => {
    const startSocket = () => {
      socket.current = new WebSocket(WS_URL);

      socket.current.onopen = () => {
        if (socket.current != null && socket.current.readyState === 1) {
          socket.current.send(getConnectionString("H0STASP0", code)); // 호가
          socket.current.send(getConnectionString("H0STCNT0", code)); //체결가
          console.log("소켓 연결 시도");
        }
      };

      socket.current.onmessage = (e) => {
        console.log(e);
        if (e.data.startsWith("0|H0STCNT0")) {
          const data = decodeStockPrice(e.data);

          if (highPriceRef.current != undefined)
            highPriceRef.current.innerText =
              formatNumber(parseInt(data.stck_hgpr)) + "원";

          if (lowPriceRef.current != undefined)
            lowPriceRef.current.innerText =
              formatNumber(parseInt(data.stck_lwpr)) + "원";

          if (currentPriceRef.current != undefined)
            currentPriceRef.current.innerText =
              formatNumber(parseInt(data.stck_prpr)) + "원";

          if (previousPriceRef.current != undefined) {
            //prettier-ignore
            previousPriceRef.current.innerText = `${formatNumber(parseInt(data.stck_vrss))}원(${Math.abs(parseFloat(data.prdy_ctrt))}%)`
            previousPriceRef.current.style.color =
              data.stck_vrss[0] == "-" ? "#3b82f6" : "#f43f5e";
          }
        }

        if (e.data.startsWith("0|H0STASP0")) {
          const data = decodeStockHoka(e.data);

          // 매도 호가
          data.sell.map((item, idx) => {
            if (sellPriceRefs[idx].current != undefined)
              sellPriceRefs[idx].current.innerText =
                formatNumber(item.price) + "원";
            if (sellRemainValueRefs[idx].current != undefined)
              sellRemainValueRefs[idx].current.innerText = formatNumber(
                item.remain
              );
            if (sellRemainRefs[idx].current != undefined)
              sellRemainRefs[idx].current.style.width = `${
                (item.remain / data.totalSellRemain) * 100
              }%`;
          });

          // 매수 호가
          data.buy.map((item, idx) => {
            if (buyPriceRefs[idx].current != undefined)
              buyPriceRefs[idx].current.innerText =
                formatNumber(item.price) + "원";
            if (buyRemainValueRefs[idx].current != undefined)
              buyRemainValueRefs[idx].current.innerText = formatNumber(
                item.remain
              );
            if (buyRemainRefs[idx].current != undefined)
              buyRemainRefs[idx].current.style.width = `${
                (item.remain / data.totalBuyRemain) * 100
              }%`;
          });
        }
      };
    };

    startSocket();
  }, []);
};
