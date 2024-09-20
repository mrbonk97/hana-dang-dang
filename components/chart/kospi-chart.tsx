"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getIndexDetailApi } from "@/lib/index-api";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  bstp_nmix_prpr: {
    label: "지수",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IndexChartProps {
  title: string;
  code: string;
}

export const KospiChart = ({ title, code }: IndexChartProps) => {
  const query = useQuery({
    queryKey: ["index", code],
    queryFn: () => getIndexDetailApi(code),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const buho2 = query.data?.data.output1.bstp_nmix_prdy_vrss > 0 ? true : false;
  const buho =
    query.data?.data.output1.bstp_nmix_prdy_vrss > 0
      ? "text-rose-500"
      : "text-blue-500";

  const data = query.isSuccess
    ? query.data?.data.output2.slice().reverse()
    : [];

  return (
    <Card className="h-full w-full bg-secondary">
      <CardHeader>
        <CardTitle className="font-bold opacity-70 flex justify-between">
          <span>{title}</span>
          <span className={buho}>
            {query.data?.data.output1.bstp_nmix_prpr}(
            {query.data?.data.output1.bstp_nmix_prdy_vrss})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 h-32">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
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
              stroke={buho2 ? "#e11d48" : "#3b82f6"}
              fillOpacity={0.4}
              fill={buho2 ? "#f43f5e" : "#93c5fd"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
