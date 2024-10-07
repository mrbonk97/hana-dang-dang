"use client";
import { Bar, BarChart, Line, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  es: {
    label: "예상치",
    color: "hsl(var(--chart-1))",
  },
  aim: {
    label: "목표금액",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  data: { month: string; es: number; aim: number }[];
}

export function EstimateChart({ data }: Props) {
  return (
    <Card className="p-5 border">
      <CardHeader>
        <CardTitle className="opacity-80">월별 예상 배당금</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-[840px] h-96">
        <BarChart accessibilityLayer data={data}>
          <XAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            dataKey="month"
          />
          <Line dataKey="limit" />
          <Bar
            dataKey="aim"
            stackId="a"
            fill="var(--color-aim)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="es"
            stackId="a"
            fill="var(--color-es)"
            radius={[4, 4, 0, 0]}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => (
                  <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {value}
                      <span className="font-normal text-muted-foreground">
                        원
                      </span>
                    </div>
                  </div>
                )}
              />
            }
            cursor={false}
            defaultIndex={1}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
