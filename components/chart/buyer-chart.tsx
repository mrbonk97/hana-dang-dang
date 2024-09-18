"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";

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

export const description = "A bar chart with negative values";

const chartData = [
  { month: "외국인", visitors: -10893 },
  { month: "기관", visitors: 4342 },
  { month: "개인", visitors: 5367 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function BuyerChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel hideIndicator />}
        />
        <Bar dataKey="visitors" barSize={20}>
          <LabelList position="top" dataKey="month" fillOpacity={1} />
          {chartData.map((item) => (
            <Cell
              key={item.month}
              fill={
                item.visitors > 0
                  ? "hsl(var(--chart-1))"
                  : "hsl(var(--chart-2))"
              }
            />
          ))}
        </Bar>

        <XAxis />
      </BarChart>
    </ChartContainer>
  );
}
