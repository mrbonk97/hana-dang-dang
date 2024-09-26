"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import Link from "next/link";

export const description = "A horizontal bar chart";

const chartData = [
  { month: "비철금속", desktop: 13.92 },
  { month: "복합유틸리티", desktop: 4.4 },
  { month: "조선", desktop: 4.07 },
  { month: "은행", desktop: 3.56 },
  { month: "증권", desktop: 2.92 },
  { month: "자동차부품", desktop: 2.59 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ThemeChart() {
  return (
    <Card className="border duration-300">
      <CardHeader className="opacity-70">
        <CardTitle>업종별 시세</CardTitle>
        <CardDescription className="text-right">
          <Link href={"/stocks/theme"}>더보기</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10 flex gap-5">
        <ul className="h-full flex flex-col justify-between gap-1 text-sm">
          <li className="font-bold mb-2 opacity-80">업종명</li>
          <li>비철금속</li>
          <li>복합유틸리티</li>
          <li>조선</li>
          <li>은행</li>
          <li>증권</li>
          <li>자동차부품</li>
        </ul>
        <ul className="h-full flex flex-col justify-between gap-1 text-sm text-rose-500">
          <li className="font-bold mb-2 text-primary opacity-80">등락률</li>
          <li>+13.92%</li>
          <li>+4.40%</li>
          <li>+4.07%</li>
          <li>+3.56%</li>
          <li>+2.92%</li>
          <li>+2.59%</li>
        </ul>
        <ul className="h-auto flex flex-col justify-between gap-1 w-60 text-sm">
          <li className="font-bold mb-2 opacity-80">등락그래프</li>
          <li className="h-[10%] w-full rounded-xl bg-rose-400" />
          <li
            className="h-[10%] w-full rounded-xl bg-rose-400/90"
            style={{ width: (4.4 / 13.92) * 100 + "%" }}
          />
          <li
            className="h-[10%] w-full rounded-xl bg-rose-400/80"
            style={{ width: (4.07 / 13.92) * 100 + "%" }}
          />
          <li
            className="h-[10%] w-full rounded-xl bg-rose-400/70"
            style={{ width: (3.56 / 13.92) * 100 + "%" }}
          />
          <li
            className="h-[10%] w-full rounded-xl bg-rose-400/60"
            style={{ width: (2.92 / 13.92) * 100 + "%" }}
          />
          <li
            className="h-[10%] w-full rounded-xl bg-rose-400/50"
            style={{ width: (2.59 / 13.92) * 100 + "%" }}
          />
        </ul>
      </CardContent>
    </Card>
  );
}
