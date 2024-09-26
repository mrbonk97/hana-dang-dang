import { OpinionCard } from "./_components/opinion-card";
import { StockPriceHistoryCard } from "./_components/stock-price-history-card";
import { Bannner } from "@/components/banner";
import {
  getStockInfoApi,
  getStockMinutePriceApi,
  getStockOpinionApi,
  getStockPriceApi,
  getStockPriceDailyApi,
  getStockRecentPriceApi,
} from "@/lib/stock-api2";
import { UpperInfoSection } from "./_components/upper-info-section";
import { ChartCard } from "./_components/chart-card";
import { HokaOrderCard } from "./_components/hoka-order-card";
import { getTradeTime } from "@/lib/utils";

type Props = {
  params: { id: string };
};

const covertTime = (ymd: string, hms: string) => {
  const year = parseInt(ymd.slice(0, 4));
  const month = parseInt(ymd.slice(4, 6)) - 1;
  const day = parseInt(ymd.slice(6, 8));
  const hour = parseInt(hms.slice(0, 2)) + 9;
  const minute = parseInt(hms.slice(2, 4));
  const second = parseInt(hms.slice(4, 6));

  return new Date(year, month, day, hour, minute, second);
};

const StockDetailPage = async ({ params }: Props) => {
  const info = await getStockInfoApi(params.id);
  const { output } = await getStockPriceApi(params.id);
  const opinion = await getStockOpinionApi(params.id);
  const recentPrice = await getStockRecentPriceApi(params.id);

  const data1 = await getStockMinutePriceApi(params.id, getTradeTime(3));
  const data2 = await getStockMinutePriceApi(params.id, getTradeTime(2));
  const data3 = await getStockMinutePriceApi(params.id, getTradeTime(1));
  const data4 = await getStockMinutePriceApi(params.id, getTradeTime(0));
  const dailyData = await getStockPriceDailyApi(params.id);

  const data: {
    x: Date;
    y: [number, number, number, number];
  }[] = [];
  data1.output2.reverse().map((item) => {
    data.push({
      x: covertTime(item.stck_bsop_date, item.stck_cntg_hour),
      y: [
        parseFloat(item.stck_oprc),
        parseFloat(item.stck_hgpr),
        parseFloat(item.stck_lwpr),
        parseFloat(item.stck_prpr),
      ],
    });
  });

  data2.output2.reverse().map((item) => {
    data.push({
      x: covertTime(item.stck_bsop_date, item.stck_cntg_hour),
      y: [
        parseFloat(item.stck_oprc),
        parseFloat(item.stck_hgpr),
        parseFloat(item.stck_lwpr),
        parseFloat(item.stck_prpr),
      ],
    });
  });

  data3.output2.reverse().map((item) => {
    data.push({
      x: covertTime(item.stck_bsop_date, item.stck_cntg_hour),
      y: [
        parseFloat(item.stck_oprc),
        parseFloat(item.stck_hgpr),
        parseFloat(item.stck_lwpr),
        parseFloat(item.stck_prpr),
      ],
    });
  });

  data4.output2.reverse().map((item) => {
    data.push({
      x: covertTime(item.stck_bsop_date, item.stck_cntg_hour),
      y: [
        parseFloat(item.stck_oprc),
        parseFloat(item.stck_hgpr),
        parseFloat(item.stck_lwpr),
        parseFloat(item.stck_prpr),
      ],
    });
  });

  return (
    <main className="pt-14 pl-[24rem] h-full flex flex-col justify-between bg-secondary min-h-[900px] min-w-[1800px]">
      <UpperInfoSection
        title={info.output.prdt_abrv_name}
        curPrice={data4.output1.stck_prpr}
        prevPrice={data4.output1.prdy_vrss}
        prevPerc={data4.output1.prdy_ctrt}
        totalValue={output.hts_avls}
        todayHigh={output.stck_hgpr}
        todayLow={output.stck_lwpr}
        yearHigh={output.w52_hgpr}
        yearLow={output.w52_lwpr}
        PER={output.stck_lwpr}
        PBR={output.stck_lwpr}
        stac={output.stac_month}
        danger={output.mrkt_warn_cls_code}
      />
      <section className="p-5 h-[calc(100%-8rem)] flex gap-5">
        <div className="h-full w-1/2 flex justify-between flex-col gap-5">
          <ChartCard
            minuteData={data}
            dailyData={dailyData.daily_price}
            code={params.id}
          />
          <div className="h-52 flex-shrink-0 flex justify-between gap-5">
            <OpinionCard data={opinion} />
            <StockPriceHistoryCard data={recentPrice} />
          </div>
        </div>
        <HokaOrderCard code={params.id} />
      </section>
      <Bannner className="bg-background" />
    </main>
  );
};

export default StockDetailPage;
