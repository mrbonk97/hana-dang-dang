"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const description = "An interactive area chart";
const chartData = [
  { date: "2024-01-01", goal: 800, cumulate: 0 },
  { date: "2024-01-08", goal: 800, cumulate: 15 },
  { date: "2024-01-15", goal: 800, cumulate: 32 },
  { date: "2024-01-22", goal: 800, cumulate: 46 },
  { date: "2024-01-29", goal: 800, cumulate: 52 },
  { date: "2024-02-05", goal: 800, cumulate: 78 },
  { date: "2024-02-12", goal: 800, cumulate: 51 },
  { date: "2024-02-19", goal: 800, cumulate: 101 },
  { date: "2024-02-26", goal: 800, cumulate: 102 },
  { date: "2024-03-04", goal: 800, cumulate: 131 },
  { date: "2024-03-11", goal: 800, cumulate: 121 },
  { date: "2024-03-18", goal: 800, cumulate: 120 },
  { date: "2024-03-25", goal: 800, cumulate: 131 },
  { date: "2024-04-01", goal: 800, cumulate: 131 },
  { date: "2024-04-08", goal: 800, cumulate: 131 },
  { date: "2024-04-15", goal: 800, cumulate: 167 },
  { date: "2024-04-22", goal: 800, cumulate: 178 },
  { date: "2024-04-29", goal: 800, cumulate: 180 },
  { date: "2024-05-06", goal: 800, cumulate: 183 },
  { date: "2024-05-13", goal: 800, cumulate: 186 },
  { date: "2024-05-20", goal: 800, cumulate: 197 },
  { date: "2024-05-27", goal: 800, cumulate: 201 },
  { date: "2024-06-03", goal: 800, cumulate: 221 },
  { date: "2024-06-10", goal: 800, cumulate: 231 },
  { date: "2024-06-17", goal: 800, cumulate: 250 },
  { date: "2024-06-24", goal: 800, cumulate: 265 },
  { date: "2024-07-01", goal: 800, cumulate: 289 },
  { date: "2024-07-08", goal: 800, cumulate: 310 },
  { date: "2024-07-15", goal: 800, cumulate: 332 },
  { date: "2024-07-22", goal: 800, cumulate: 357 },
  { date: "2024-07-29", goal: 800, cumulate: 387 },
  { date: "2024-08-05", goal: 800, cumulate: 405 },
  { date: "2024-08-12", goal: 800, cumulate: 421 },
  { date: "2024-08-19", goal: 800, cumulate: 465 },
  { date: "2024-08-26", goal: 800, cumulate: 490 },
  { date: "2024-09-02", goal: 800, cumulate: 510 },
  { date: "2024-09-09", goal: 800, cumulate: 520 },
  { date: "2024-09-16", goal: 800, cumulate: 542 },
  { date: "2024-09-23", goal: 800, cumulate: 572 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  goal: {
    label: "목표치",
    color: "hsl(var(--chart-1))",
  },
  cumulate: {
    label: "누적 배당금",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart4() {
  const [timeRange, setTimeRange] = React.useState("365d");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 365;
    if (timeRange === "365d") {
      daysToSubtract = 365;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
  return (
    <Card className="h-full w-full border bg-secondary">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>누적 수익률</CardTitle>
          <CardDescription>총 수익 금액을 확인해보세요</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              최근 1년
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              최근 6개월
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              최근 한달
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillgoal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-goal)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-goal)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillcumulate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cumulate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cumulate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="cumulate"
              type="natural"
              fill="url(#fillcumulate)"
              stroke="var(--color-cumulate)"
              // stackId="a"
            />
            <Area
              dataKey="goal"
              type="natural"
              fill="url(#fillgoal)"
              stroke="var(--color-goal)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
