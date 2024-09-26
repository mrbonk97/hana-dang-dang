"use client";

import * as React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { useQuery } from "@tanstack/react-query";
import { getAccountStockApi } from "@/lib/account-api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const description = "A donut chart with text";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
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

interface Props {
  accountId: string;
}
export function AccountStockCard({ accountId }: Props) {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["account", "stock", accountId],
    queryFn: () => getAccountStockApi(accountId),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="border w-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>보유종목</CardTitle>
          <CardDescription>보유하고 계신 종목 비율입니다.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            전체 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="flex gap-10">
        <ChartContainer
          config={chartConfig}
          className="p-0 m-0 h-96 w-96 flex-shrink-0 aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="w-full px-5">
          <li className="grid grid-cols-5 font-bold opacity-80 pb-2">
            <div className="col-span-1">종목명</div>
            <div className="col-span-1 text-right">수량</div>
            <div className="col-span-1 text-right">단위가격</div>
            <div className="col-span-1 text-right">총 가격</div>
            <div className="col-span-1 text-right">비율</div>
          </li>
          {data?.map((item) => {
            return (
              <li className="grid grid-cols-5 font-medium opacity-70">
                <div className="col-span-1">
                  {item.stockInfo.prdt_abrv_name}
                </div>
                <div className="col-span-1 text-right">{item.quantity}</div>
                <div className="col-span-1 text-right">
                  {item.stockInfo.bfdy_clpr}
                </div>
                <div className="col-span-1 text-right">
                  {item.quantity * parseInt(item.stockInfo.bfdy_clpr)}
                </div>
                <div className="col-span-1 text-right">100%</div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
