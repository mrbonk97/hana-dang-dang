"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { OtherInfoType } from "@/lib/stock-api";

export const description = "A bar chart with a label";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  data: OtherInfoType[];
}

export function OtherBarGraph({ data }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="opacity-80">배당 성향</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="bg-rose-200">
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 60,
              bottom: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="stac_yymm"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="payout_rate"
              fill="var(--color-desktop)"
              radius={8}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
