import { UpperInfoSection } from "@/app/(domestic)/stocks/[id]/_components/upper-info-section";
import {
  getOverseaStockDailyPrice,
  getOverseaStockInfo,
  getOverseaStockPriceDetail,
} from "@/lib/nasdaq-api";
import { InfoSection } from "./_components/info-section";
import { NasdaqChart } from "./_components/nasdaq-chart";
import { OpinionCard } from "@/app/(domestic)/stocks/[id]/_components/opinion-card";
import { StockPriceHistoryCard } from "@/app/(domestic)/stocks/[id]/_components/stock-price-history-card";
import { HokaOrderCard } from "@/app/(domestic)/stocks/[id]/_components/hoka-order-card";
import { NasdaqPriceHistory } from "./_components/nasdaq-price-history";
import { Bannner } from "@/components/banner";
import { NasdaqOrderCard } from "./_components/nasdaq-order-card";

type Props = {
  params: { id: string };
};

const covertTime = (time: string) => {
  const year = parseInt(time.substring(0, 4));
  const month = parseInt(time.substring(4, 6)) - 1;
  const day = parseInt(time.substring(6, 8));

  return new Date(year, month, day);
};

const StockDetailPage = async ({ params }: Props) => {
  const dailyPrice = await getOverseaStockDailyPrice(params.id);
  const { data: priceInfo } = await getOverseaStockPriceDetail(params.id);
  const data = await getOverseaStockInfo(params.id);

  const chartData: {
    x: Date;
    y: [number, number, number, number];
  }[] = [];

  dailyPrice.data.output2.map((item) => {
    chartData.push({
      x: covertTime(item.xymd),
      y: [
        parseFloat(item.open),
        parseFloat(item.high),
        parseFloat(item.low),
        parseFloat(item.clos),
      ],
    });
  });

  return (
    <main className="pt-14 pl-[24rem] h-full flex flex-col bg-secondary min-h-[850px] min-w-[1800px]">
      <InfoSection
        title={data.data.output.prdt_name}
        curPrice={priceInfo.output.last}
        prevPrice={priceInfo.output.base}
        todayHigh={priceInfo.output.high}
        todayLow={priceInfo.output.low}
        yearHigh={priceInfo.output.h52p}
        yearLow={priceInfo.output.l52p}
        PER={priceInfo.output.perx}
        PBR={priceInfo.output.pbrx}
      />
      <section className="p-5 h-[calc(100%-8rem)] flex gap-5">
        <div className="h-full w-1/2 flex justify-between flex-col gap-5">
          <NasdaqChart data={chartData} />
          <NasdaqPriceHistory data={dailyPrice.data.output2} />
        </div>
        <NasdaqOrderCard code={params.id} />
      </section>
      <Bannner className="bg-background" />
    </main>
  );
};

export default StockDetailPage;
