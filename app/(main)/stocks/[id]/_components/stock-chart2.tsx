"use client";

import { useQuery } from "@tanstack/react-query";
import { DailyStockInfoType } from "@/type";
import { DailyStockApi } from "@/lib/api";
import dynamic from "next/dynamic";

interface StockChartProps {
  id: string;
}

export const StockChart2 = ({ id }: StockChartProps) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const query = useQuery({
    queryKey: ["daily-price", id],
    queryFn: () => DailyStockApi(id),
  });

  if (!query.isSuccess) return null;

  console.log(query.data.data);

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

  const o = {
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    stroke: {
      width: [3, 1],
    },
    xaxis: {
      type: "datetime",
    },
  };

  query.data.data.map;

  const series = [
    {
      name: "candle",
      type: "candlestick",
      data: d,
    },
  ];

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
          }}
          series={series}
          type="candlestick"
          width="100%"
        />
      )}
    </div>
  );
};
