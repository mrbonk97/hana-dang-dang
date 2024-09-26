"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "값",
  },
} satisfies ChartConfig;

interface BuyerChartProps {
  b1: number;
  b2: number;
  b3: number;
  marginValue: number;
}
export function BuyerChart({ b1, b2, b3, marginValue }: BuyerChartProps) {
  const chartData = [
    { buyer: "외국인", value: b1 },
    { buyer: "기관", value: b2 },
    { buyer: "개인", value: b3 },
  ];

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel hideIndicator />}
        />
        <Bar dataKey="value" barSize={80} label={{ position: "bottom" }}>
          {chartData.map((item) => (
            <Cell
              key={item.buyer}
              fill={
                item.value > 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"
              }
            />
          ))}
        </Bar>
        <YAxis
          type="number"
          domain={[`dataMin - ${marginValue}`, `dataMax + ${marginValue}`]}
        />

        <XAxis dataKey={"buyer"} />
      </BarChart>
    </ChartContainer>
  );
}
