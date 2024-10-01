"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndexDetailLongType } from "@/lib/index-api";

const chartConfig = {
  bstp_nmix_prpr: {
    label: "지수",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IndexChartProps {
  data: IndexDetailLongType;
}

export const KospiChart = ({ data }: IndexChartProps) => {
  const isUp = data.output1.bstp_nmix_prdy_vrss[0] == "-" ? false : true;
  const color =
    data.output1.bstp_nmix_prdy_vrss[0] == "-"
      ? "text-blue-500"
      : "text-rose-500";

  return (
    <Card className="h-full w-full bg-secondary">
      <CardHeader>
        <CardTitle>
          <Link
            className="font-bold opacity-70 flex justify-between"
            href={`/indexes/${data.output1.bstp_cls_code}`}
          >
            <span>{data.output1.hts_kor_isnm}</span>
            <div>
              <div className="text-right">{data.output1.bstp_nmix_prpr}</div>
              <div className={`text-xs text-right ${color}`}>
                {data.output1.bstp_nmix_prdy_vrss}(
                {formatNumber(
                  Math.abs(parseFloat(data.output1.bstp_nmix_prdy_ctrt))
                )}
                %)
              </div>
            </div>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 h-32">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data.output2.reverse()}
            margin={{
              left: -24,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              type="number"
              tick={false}
              domain={[`dataMin - 10`, `dataMax + 10`]}
            />
            <XAxis
              tick={false}
              dataKey="stck_bsop_date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="bstp_nmix_prpr"
              type="natural"
              stroke={isUp ? "#e11d48" : "#3b82f6"}
              fillOpacity={0.4}
              fill={isUp ? "#f43f5e" : "#93c5fd"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
