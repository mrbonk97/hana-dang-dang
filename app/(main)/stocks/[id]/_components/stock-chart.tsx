"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { DailyStockInfoType } from "@/type";
import { DailyStockApi } from "@/lib/api";

interface StockChartProps {
  id: string;
}

export const StockChart = ({ id }: StockChartProps) => {
  const query = useQuery({
    queryKey: ["daily-price", id],
    queryFn: () => DailyStockApi(id),
  });

  const cf = {
    stck_bsop_date: {
      label: "date",
      color: "#2563eb",
    },

    stck_oprc: {
      label: "stck_oprc",
      color: "#60a5fa",
    },
  };

  if (!query.isSuccess) return null;

  console.log(query.data);
  console.log("띠용쓰");

  return (
    <ChartContainer config={cf} className="h-96 w-full bg-blue-100">
      <BarChart accessibilityLayer data={query.data!.data}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <Bar dataKey="stck_oprc" />
      </BarChart>
    </ChartContainer>
  );
};

{
  /* <ChartTooltip content={<ChartTooltipContent />} />
<XAxis dataKey="stckBsopDate" />
<YAxis />
<CartesianGrid vertical={false} /> */
}
