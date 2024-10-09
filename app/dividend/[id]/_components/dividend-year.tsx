"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
import { DividendHistoryType } from "@/lib/dividend-api";
import { GitCommitVertical } from "lucide-react";

const chartConfig = {
  dividend: {
    label: "배당금",
    // color: "hsl(var(--chart-5))",
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

interface DividendYearProps {
  data: DividendHistoryType[];
}

export const DividendYear = ({ data }: DividendYearProps) => {
  const chartData2 = [
    { year: 2020, dividend: 0 },
    { year: 2021, dividend: 0 },
    { year: 2022, dividend: 0 },
    { year: 2023, dividend: 0 },
    { year: 2024, dividend: 0 },
  ];

  data.forEach((item) => {
    if (item.lockDate.substring(0, 4) == "2020")
      chartData2[0].dividend += item.amount;
    if (item.lockDate.substring(0, 4) == "2021")
      chartData2[1].dividend += item.amount;
    if (item.lockDate.substring(0, 4) == "2022")
      chartData2[2].dividend += item.amount;
    if (item.lockDate.substring(0, 4) == "2023")
      chartData2[3].dividend += item.amount;
    if (item.lockDate.substring(0, 4) == "2024")
      chartData2[4].dividend += item.amount;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>연간 배당률 추이</CardTitle>
        <CardDescription>2020.01.01 ~ 2024.10.05</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <LineChart
            accessibilityLayer
            data={chartData2}
            margin={{
              top: 20,
              left: 36,
              right: 36,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="dividend"
              type="natural"
              stroke="var(--color-dividend)"
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
                    stroke="var(--color-dividend)"
                  />
                );
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
