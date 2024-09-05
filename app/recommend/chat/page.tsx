"use client";
import { Message1 } from "@/components/message/message-1";
import { Message2 } from "@/components/message/message-2";
import { Message3 } from "@/components/message/message-3";
import { MessageTemplate } from "@/components/message/message-template";
import { useEffect, useState } from "react";

const RecommendChatPage = () => {
  const [region, setRegion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [m3, setM3] = useState(false);

  useEffect(() => {
    if (region) setTimeout(() => setM3(true), 1000);
  }, [region]);

  return (
    <main className="min-h-full pt-14 flex justify-center bg-secondary">
      <section className="p-10 min-h-full max-w-[600px] w-full space-y-5 bg-background border-x">
        <Message1 />
        <Message2 setState={setRegion} />
        {region && <MessageTemplate type="USER" message={region} />}
        {m3 && <Message3 setMessage={setAnswer1} />}
        {answer1 && <MessageTemplate type="USER" message={answer1} />}
      </section>
    </main>
  );
};

export default RecommendChatPage;
