"use client";
import { decodeStockHoka } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface Props {
  code: string;
}

const WS_URL = "ws://ops.koreainvestment.com:21000";

const getConnectionString = (trType: string, trId: string, trKey: string) => {
  const CONNECT_MESSAGE = {
    header: {
      approval_key: process.env.NEXT_PUBLIC_HANTU_APPROVAL_KEY,
      custtype: "P",
      tr_type: trType,
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

export const HantuSocket = ({ code }: Props) => {
  const socket = useRef<WebSocket>();

  useEffect(() => {
    const connect = () => {
      socket.current = new WebSocket(WS_URL);

      socket.current.onopen = () => {
        if (socket.current != null && socket.current.readyState === 1) {
          socket.current.send(getConnectionString("1", "H0STASP0", code)); // 호가
          socket.current.send(getConnectionString("1", "H0STCNT0", code)); //체결가
          console.log("소켓 연결 시도");
        }
      };

      socket.current.onmessage = (e) => {
        console.log(decodeStockHoka(e.data));
      };

      socket.current.onclose = (e) => {
        if (!e.wasClean) connect();
        if (!e.wasClean) console.log("오류: 연결 재시도");
      };
    };

    connect();

    return () => {
      if (socket.current != undefined) {
        socket.current.send(getConnectionString("2", "H0STASP0", code)); // 호가
        socket.current.send(getConnectionString("2", "H0STCNT0", code)); //체결가
        socket.current.close();
      }
    };
  }, []);

  return <div className="sr-only"></div>;
};
