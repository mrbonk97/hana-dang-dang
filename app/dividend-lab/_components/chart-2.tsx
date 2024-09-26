"use client";

import { DotIcon, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
import { Button } from "@/components/ui/button";

const chartData = [
  { stock_name: "JEPI", quantity: 275, fill: "var(--color-chrome)" },
  { stock_name: "코카콜라", quantity: 200, fill: "var(--color-safari)" },
  { stock_name: "로레엘", quantity: 187, fill: "var(--color-firefox)" },
  { stock_name: "삼성전자", quantity: 173, fill: "var(--color-edge)" },
  { stock_name: "기타", quantity: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  quantity: {
    label: "수량",
  },
  chrome: {
    label: "jepi",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Chart2() {
  return (
    <Card className="flex flex-col border w-full max-w-[768px] flex-shrink-0">
      <CardHeader className="opacity-80">
        <CardTitle>포트폴리오</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex items-center justify-between gap-20">
        <ul className="font-bold">
          {chartData.map((item) => (
            <List
              key={item.stock_name}
              title={item.stock_name}
              quantity={item.quantity}
            />
          ))}
        </ul>
        <ChartContainer
          config={chartConfig}
          className="h-80 w-96 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="quantity"
              label
              nameKey="stock_name"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface ListProps {
  title: string;
  quantity: number;
}

const List = ({ title, quantity }: ListProps) => {
  return (
    <li className="flex items-center gap-1">
      <DotIcon className="text-c1-300" size={40} />
      <span className="opacity-70">{title}</span>
      <span className="ml-3 text-end opacity-60">{quantity}주</span>
    </li>
  );
};
