"use client";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountDividendHistoryType } from "@/lib/account-api";

const chartConfig = {
  amount: {
    label: "배당금",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface Props {
  data: AccountDividendHistoryType[];
}

export function Chart1({ data }: Props) {
  const year = new Date("2024-01-01");
  const chartData = [
    { month: "1월", amount: 0 },
    { month: "2월", amount: 0 },
    { month: "3월", amount: 0 },
    { month: "4월", amount: 0 },
    { month: "5월", amount: 0 },
    { month: "6월", amount: 0 },
    { month: "7월", amount: 0 },
    { month: "8월", amount: 0 },
    { month: "9월", amount: 0 },
    { month: "10월", amount: 0 },
    { month: "11월", amount: 0 },
    { month: "12월", amount: 0 },
  ];

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    if (date < year) return;
    chartData[date.getMonth() + 1].amount += item.amount;
  });

  return (
    <Card className="border w-full">
      <CardHeader>
        <CardTitle className="opacity-80">월별 배당내역</CardTitle>
        <CardDescription className="opacity-80">
          올해 벌어들인 월별 배당금입니다.(단위: 원)
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="h-96 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          <XAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            dataKey="month"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
