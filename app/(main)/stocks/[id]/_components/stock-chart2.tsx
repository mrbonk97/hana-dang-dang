"use client";

import { useQuery } from "@tanstack/react-query";
import { DailyStockInfoType } from "@/type";
import { DailyStockApi } from "@/lib/api";
import dynamic from "next/dynamic";
import { Noto_Sans_KR } from "next/font/google";
import { timeStamp } from "console";
import { formatNumber } from "@/lib/utils";

interface StockChartProps {
  id: string;
}

const inter = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const StockChart2 = ({ id }: StockChartProps) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const query = useQuery({
    queryKey: ["daily-price", id],
    queryFn: () => DailyStockApi(id),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (!query.isSuccess) return null;

  const d: { x: Date; y: string[] }[] = [];
  query.data.data.map((item) => {
    const obj = {
      x: new Date(
        `${item.stck_bsop_date.substring(0, 4)}-${item.stck_bsop_date.substring(
          4,
          6
        )}-${item.stck_bsop_date.substring(6, 8)}`
      ),
      y: [item.stck_oprc, item.stck_hgpr, item.stck_lwpr, item.stck_clpr],
    };
    d.push(obj);
  });

  return (
    <div className="mixed-chart">
      {typeof window !== "undefined" && (
        <Chart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              tickAmount: 10,
              labels: {
                hideOverlappingLabels: true,
                rotate: 0,
                formatter: (value, timestamp) => {
                  const date = new Date(value);
                  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
                  const day = String(date.getDate()).padStart(2, "0");
                  const formattedDate = `${month}-${day}`;
                  return formattedDate;
                },
                style: {
                  colors: "#71717a",
                  fontFamily: inter.style.fontFamily,
                  fontWeight: 700,
                },
              },
            },
            yaxis: {
              labels: {
                formatter: (value, timeStamp) => {
                  return formatNumber(value) + "원";
                },
                style: {
                  colors: "#71717a",
                  fontFamily: inter.style.fontFamily,
                  fontWeight: 700,
                },
              },
            },
          }}
          series={[
            {
              data: d,
            },
          ]}
          type="candlestick"
          width="100%"
        />
      )}
    </div>
  );
};
