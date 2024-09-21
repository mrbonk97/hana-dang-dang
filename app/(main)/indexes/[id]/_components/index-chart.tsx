"use client";
import { XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IndexType } from "@/type";

const chartConfig = {
  bstp_nmix_prpr: {
    label: "지수",
    color: "hsl(var(--chart-1))",
  },
  cur: {
    label: "현재가",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IndexChartProps {
  data: IndexType[];
}

export const IndexChart = ({ data }: IndexChartProps) => {
  const aaa = data.length > 0 ? data[data.length - 1].bstp_nmix_prpr : 0;
  data = data.map((item) => {
    return { ...item, cur: aaa };
  });

  return (
    <ChartContainer className="h-full aspect-auto" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 12,
        }}
      >
        <CartesianGrid horizontal={true} vertical={true} />
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          domain={[`dataMin - 20`, `dataMax + 20`]}
        />
        <XAxis
          dataKey="stck_bsop_date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="bstp_nmix_prpr"
          type="linear"
          stroke="#e11d48"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="cur"
          type="linear"
          stroke="rgba(225,29,72,0.3)"
          strokeWidth={1}
          dot={false}
          strokeDasharray="5 5"
          opacity={50}
        />
        <CartesianGrid vertical={false} />
      </LineChart>
    </ChartContainer>
  );
};
