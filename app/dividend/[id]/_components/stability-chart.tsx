"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { StockStabilityType } from "@/lib/stock-api";

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

export function StabilityChart({ data }: Props) {
  return (
    <Card className="bg-secondary/20 w-full h-auto">
      <CardHeader>
        <CardTitle className="font-bold opacity-70">부채비율</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px] w-full">
          <LineChart
            accessibilityLayer
            data={data.reverse()}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="stac_yymm"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.slice(2, 4) + "-" + value.slice(4, 6)
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="lblt_rate"
              type="monotone"
              stroke="var(--color-lblt_rate)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bram_depn"
              type="monotone"
              stroke="var(--color-bram_depn)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="crnt_rate"
              type="monotone"
              stroke="var(--color-crnt_rate)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="quck_rate"
              type="monotone"
              stroke="var(--color-quck_rate)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
