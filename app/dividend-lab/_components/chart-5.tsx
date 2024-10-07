"use client";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";

export const description = "A radial chart with text";

const chartConfig = {
  visitors: {
    label: "누적 배당금",
  },
  safari: {
    label: "Safari",
    // color: "hsl(var(--c1-300))",
    color: "#fda4af",
  },
} satisfies ChartConfig;

interface Chart5Props {
  goal: number;
  totalDividend: number;
}

export function Chart5({ goal, totalDividend }: Chart5Props) {
  const chartData = [
    {
      browser: "누적 배당금",
      visitors: totalDividend,
      fill: "var(--color-safari)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="w-48 aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={(totalDividend / goal) * 360}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          // className="first:fill-muted last:fill-background"
          className="first:c1-300 last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-2xl font-bold opacity-80"
                    >
                      {formatNumber(Math.floor(chartData[0].visitors / 10000))}
                      만원
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      누적배당금
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
