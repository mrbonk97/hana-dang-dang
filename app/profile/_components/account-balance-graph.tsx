"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
import { Separator } from "@/components/ui/separator";
import { GitCommitVertical, TrendingUp } from "lucide-react";

export const description = "A line chart with custom dots";

const chartData = [
  { month: "2024-01", balance: 48220215, percentage: 4.84 },
  { month: "2024-02", balance: 48501293, percentage: 4.84 },
  { month: "2024-03", balance: 51023124, percentage: 8.1 },
  { month: "2024-05", balance: 49212341, percentage: 3.55 },
  { month: "2024-06", balance: 55210921, percentage: 12.19 },
  { month: "2024-07", balance: 55519630, percentage: 0.56 },
];

const chartConfig = {
  balance: {
    label: "자산",
    color: "hsl(var(--chart-1))",
  },
  percentage: {
    label: "증가율",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AccountBalanceGraph() {
  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>자신 증감율</CardTitle>
        <CardDescription>자산이 얼마나 증가했는지 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-full">
          <AreaChart
            data={chartData}
            margin={{
              top: 12,
              bottom: 12,
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis
              axisLine={false}
              tick={false}
              domain={["dataMin - 50000", "auto"]}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="balance"
              type="natural"
              stroke="var(--color-balance)"
              fill="url(#fillMobile)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-balance)"
                  />
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start justify-center gap-2 text-sm">
        <div className="w-full flex2 gap-2 font-medium leading-none">
          이번 달 자신이 {(((55519630 - 55210921) / 55210921) * 100).toFixed(2)}
          % 증가했습니다. <TrendingUp className="h-4 w-4" />
        </div>
        <div className="w-full flex2 leading-none text-muted-foreground">
          최근 6개월 간의 자산 변동치를 보여드립니다.
        </div>
      </CardFooter>
    </Card>
  );
}
