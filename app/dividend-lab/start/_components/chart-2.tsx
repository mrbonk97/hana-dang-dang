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

export const description = "A pie chart with a label";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
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

export function Chart2() {
  return (
    <Card className="bg-secondary">
      <CardHeader className="opacity-80">
        <CardTitle>포트폴리오</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-20">
        <ul className="font-bold flex flex-col justify-center gap-5">
          <List />
          <List />
          <List />
          <List />
        </ul>
        <ChartContainer
          config={chartConfig}
          className="h-96 w-96 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
        <div>
          <Button className="py-6  w-full leading-relaxed">
            포트폴리오 <br />
            점검하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const List = () => {
  return (
    <li className="flex items-center">
      <DotIcon className="text-c1-300" size={64} />
      <div>
        <h4 className="mt-5 opacity-70">삼성전자 (26%)</h4>
        <div className="text-end opacity-60">321주</div>
      </div>
    </li>
  );
};
