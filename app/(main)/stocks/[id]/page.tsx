"use client";
import { TopInfoSection } from "./_components/top-info-section";
import { StockChart2 } from "./_components/stock-chart2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuyCard } from "./_components/maesu-card";
import { Bannner } from "@/components/banner";
import { HokaCard } from "./_components/hoka-card";
import { useEffect, useRef } from "react";
import { getHantuSocket } from "@/lib/hantu-socket";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  params: { id: string };
};

const StockDetailPage = ({ params }: Props) => {
  // prettier-ignore
  const sellPriceRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const sellRemainRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const sellRemainValueRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const buyPriceRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const buyRemainRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const buyRemainValueRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
  // prettier-ignore
  const currentPriceRef = useRef<HTMLDivElement>(null);
  // prettier-ignore
  const previousPriceRef = useRef<HTMLDivElement>(null);
  // prettier-ignore
  const highPriceRef = useRef<HTMLDivElement>(null);
  // prettier-ignore
  const lowPriceRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  getHantuSocket({
    socket: socketRef,
    code: params.id,
    sellPriceRefs: sellPriceRefs,
    sellRemainRefs: sellRemainRefs,
    sellRemainValueRefs: sellRemainValueRefs,
    buyPriceRefs: buyPriceRefs,
    buyRemainRefs: buyRemainRefs,
    buyRemainValueRefs: buyRemainValueRefs,
    currentPriceRef: currentPriceRef,
    previousPriceRef: previousPriceRef,
    highPriceRef: highPriceRef,
    lowPriceRef: lowPriceRef,
  });

  useEffect(() => {
    return () => {
      if (socketRef.current != null) {
        const CLOSE_PRICE_SOCKET = {
          header: {
            approval_key: process.env.NEXT_PUBLIC_HANTU_APPROVAL_KEY,
            custtype: "P",
            tr_type: "2",
            "content-type": "utf-8",
          },
          body: {
            input: {
              tr_id: "H0STCNT0",
              tr_key: params.id,
            },
          },
        };

        const CLOSE_HOKA_SOCKET = {
          header: {
            approval_key: process.env.NEXT_PUBLIC_HANTU_APPROVAL_KEY,
            custtype: "P",
            tr_type: "2",
            "content-type": "utf-8",
          },
          body: {
            input: {
              tr_id: "H0STASP0",
              tr_key: params.id,
            },
          },
        };

        socketRef.current.send(JSON.stringify(CLOSE_PRICE_SOCKET));
        socketRef.current.send(JSON.stringify(CLOSE_HOKA_SOCKET));
        socketRef.current.close();
        console.log("소켓 닫음");
      }
    };
  }, []);
  return (
    <div className="pt-14 pl-[24rem] min-h-[800px] h-full bg-secondary">
      <TopInfoSection
        id={params.id}
        currentPriceRef={currentPriceRef}
        previousPriceRef={previousPriceRef}
        highPriceRef={highPriceRef}
        lowPriceRef={lowPriceRef}
      />
      <main className="h-[calc(100%-4rem)] flex flex-col justify-between min-w-[1400px] max-w-[1500px]">
        <section className="p-5 h-full w-full flex gap-5 justify-between">
          <div className="w-1/2 flex flex-col gap-5 justify-between">
            <Card className="h-full w-full">
              <CardHeader className="py-3 flex flex-row items-center justify-between gap-5">
                <CardTitle className="opacity-80">차트</CardTitle>
                <div className="flex">
                  <ToggleGroup
                    className="opacity-70"
                    type="single"
                    defaultValue="a"
                  >
                    <ToggleGroupItem value="a">일</ToggleGroupItem>
                    <ToggleGroupItem value="b">주</ToggleGroupItem>
                    <ToggleGroupItem value="c">월</ToggleGroupItem>
                    <ToggleGroupItem value="d">년</ToggleGroupItem>
                  </ToggleGroup>

                  <Toggle className="opacity-70">보조지표</Toggle>
                </div>
              </CardHeader>
              <CardContent>
                <StockChart2 id={params.id} />
              </CardContent>
            </Card>
            <div className="h-full w-full flex gap-5">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>차트</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>차트</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
          <HokaCard
            sellPriceRefs={sellPriceRefs}
            sellRemainRefs={sellRemainRefs}
            sellRemainValueRefs={sellRemainValueRefs}
            buyPriceRefs={buyPriceRefs}
            buyRemainRefs={buyRemainRefs}
            buyRemainValueRefs={buyRemainValueRefs}
          />
          <BuyCard />
        </section>
        <Bannner />
      </main>
    </div>
  );
};

export default StockDetailPage;
