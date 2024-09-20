"use client";
import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://ops.koreainvestment.com:21000";

const CONNECT_MESSAGE = {
  header: {
    approval_key: "bc6da195-c5ea-4820-98a1-93b30b43df42",
    custtype: "P",
    tr_type: "1",
    "content-type": "utf-8",
  },
  body: {
    input: {
      tr_id: "H0STASP0",
      tr_key: "004060",
    },
  },
};

const TestPage = () => {
  const socket = useRef<WebSocket>();

  useEffect(() => {
    socket.current = new WebSocket(WS_URL);
    socket.current.onopen = () => {
      if (socket.current?.readyState === 1)
        socket.current?.send(JSON.stringify(CONNECT_MESSAGE));
    };

    socket.current.onmessage = (e) => console.log(e);

    return () => {
      if (socket.current == null) return;

      if (socket.current.readyState === 1) {
        socket.current.close();
      }
    };
  }, []);

  return <main></main>;
};

export default TestPage;
