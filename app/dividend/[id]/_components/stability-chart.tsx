"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StockStabilityType } from "@/lib/stock-api";

export const description = "An interactive line chart";

const chartConfig = {
  lblt_rate: {
    label: "부채 비율",
    color: "hsl(var(--chart-1))",
  },
  bram_depn: {
    label: "차입금 의존도",
    color: "hsl(var(--chart-2))",
  },
  crnt_rate: {
    label: "유동 비율",
    color: "hsl(var(--chart-3))",
  },
  quck_rate: {
    label: "당좌 비율",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface Props {
  data: StockStabilityType[];
}

{
  /* <h4 className="pl-5 pt-2 text-lg font-bold opacity-70">재무안정성</h4>
<div className="mt-5 flex gap-5 justify-between">
  <ul className="flex flex-col gap-5">
    <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
      <span className="font-medium opacity-70">부채비율</span>
      <p className="text-3xl font-bold opacity-80">
        {stability.length > 0
          ? stability[0].lblt_rate + "%"
          : "정보 없음"}
      </p>
    </li>
    <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
      <span className="font-medium opacity-70">유동비율</span>
      <p className="text-3xl font-bold opacity-80">
        {stability.length > 0
          ? stability[0].crnt_rate + "%"
          : "정보 없음"}
      </p>
    </li>
    <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
      <span className="font-medium opacity-70">차입금의존도</span>
      <p className="text-3xl font-bold opacity-80">
        {stability.length > 0
          ? stability[0].bram_depn + "%"
          : "정보 없음"}
      </p>
    </li>
    <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
      <span className="font-medium opacity-70">당좌비율</span>
      <p className="text-3xl font-bold opacity-80">
        {stability.length > 0
          ? stability[0].quck_rate + "%"
          : "정보 없음"}
      </p>
    </li>
  </ul> */
}

export function StabilityChart({ data }: Props) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("lblt_rate");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>안정성 비율</CardTitle>
          <CardDescription>기록된 안정성 비율을 보여드립니다.</CardDescription>
        </div>
        <div className="flex">
          {["lblt_rate", "bram_depn", "crnt_rate", "quck_rate"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span></span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {data[0][chart]}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"stac_yymm"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
