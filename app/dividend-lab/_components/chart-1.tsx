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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/spinner/spinner";

const chartConfig = {
  amount: {
    label: "배당금",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface Props {
  isPending: boolean;
  isSuccess: boolean;
  data: {
    month: string;
    amount: number;
  }[];
}

export function Chart1({ isPending, isSuccess, data }: Props) {
  if (isPending || !isSuccess || data == undefined) {
    return (
      <Card className="border w-full">
        <CardHeader>
          <CardTitle className="opacity-80">월별 배당내역</CardTitle>
          <CardDescription className="opacity-80">
            올해 벌어들인 월별 배당금입니다.(단위: 원)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96 w-full flex2">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border w-full">
      <CardHeader>
        <CardTitle className="opacity-80">월별 배당내역</CardTitle>
        <CardDescription className="opacity-80">
          올해 벌어들인 월별 배당금입니다.(단위: 원)
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="h-96 w-full">
        <BarChart accessibilityLayer data={data}>
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
