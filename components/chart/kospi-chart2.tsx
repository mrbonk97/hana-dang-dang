"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { IndexApiV2 } from "@/lib/api";

export const description = "A simple area chart";

const chartConfig = {
  bstp_nmix_prpr: {
    label: "지수",
    color: "hsl(var(--chart-1))",
  },
  stckBsopDate: {
    label: "날짜",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IndexChartProps {
  title: string;
  code: string;
}

export function KospiChart2({ title, code }: IndexChartProps) {
  const query = useQuery({
    queryKey: ["index", code],
    queryFn: () => IndexApiV2(code),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(query.data?.data);

  if (!query.isSuccess) return null;

  const len = query.data.data.length;

  const today = query.data.data[len - 1].bstp_nmix_prpr;
  const previous = query.data.data[len - 2].bstp_nmix_prpr;
  const diff = today - previous;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{title} 지수</span>
          <span className={`${diff < 0 ? "text-blue-400" : "text-rose-400"}`}>
            {today}
          </span>
        </CardTitle>
        <CardDescription>최근 한달간의 코스피 변동</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={query.data.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis domain={["dataMin - 100", "auto"]} />
            <XAxis
              dataKey="stckBsopDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="bstp_nmix_prpr"
              type="natural"
              fill={`${diff > 0 ? "#f43f5e" : "#60a5fa"}`}
              fillOpacity={0.4}
              stroke={`${diff > 0 ? "#e11d48" : "#3b82f6"}`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center text-sm">
        어제보다
        {diff < 0 ? " 하락 중 " : " 상승 중 "}
        {diff < 0 ? (
          <TrendingDown className="ml-2 text-blue-300" />
        ) : (
          <TrendingUp className="ml-2 text-rose-300" />
        )}
      </CardFooter>
    </Card>
  );
}
