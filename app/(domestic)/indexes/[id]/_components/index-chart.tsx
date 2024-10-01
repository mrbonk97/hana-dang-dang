"use client";
import { XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  index_value: {
    label: "지수",
    color: "hsl(var(--chart-1))",
  },
  cur_value: {
    label: "현재가",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IndexChartProps {
  data: {
    stck_bsop_date: string;
    bstp_nmix_prpr: string;
    bstp_nmix_oprc: string;
    bstp_nmix_hgpr: string;
    bstp_nmix_lwpr: string;
    acml_vol: string;
    acml_tr_pbmn: string;
    mod_yn: string;
  }[];
  curValue: string;
}

export const IndexChart = ({ data, curValue }: IndexChartProps) => {
  data = data.map((item) => {
    return {
      ...item,
      index_value: parseFloat(item.bstp_nmix_prpr),
      cur_value: parseFloat(curValue),
    };
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
          domain={[`auto`, `auto`]}
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
          dataKey="index_value"
          type="linear"
          stroke="#e11d48"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="cur_value"
          type="linear"
          stroke="rgba(225,29,72,0.3)"
          strokeWidth={1}
          dot={false}
          strokeDasharray="5 5"
          opacity={50}
        />
      </LineChart>
    </ChartContainer>
  );
};
