"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { OtherInfoType } from "@/lib/stock-api";

export const description = "A radial chart with text";

const chartConfig = {
  divid: {
    label: "배당성향",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  data: OtherInfoType[];
}

export function OtherInfoGraph({ data }: Props) {
  const chartData = [
    {
      divid: "divid",
      value: parseFloat(data.length > 1 ? data[1].payout_rate : "0"),
      fill: "var(--color-divid)",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="opacity-80">배당 성향</CardTitle>
        <CardDescription>
          {data.length > 1 ? "기준" + data[1].stac_yymm : "정보 없음"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-60 flex2">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={
              data.length > 1 ? parseFloat(data[1].payout_rate) * 0.36 : 0
            }
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          배당성향
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center font-medium opacity-80">
        {data.length < 1 && "배당 성향에 대한 정보가 없습니다."}
        {data.length > 1 &&
          parseInt(data[0].payout_rate) < 30 &&
          "배당 성향이 낮습니다."}
        {data.length > 1 &&
          parseInt(data[0].payout_rate) > 30 &&
          "배당 성향이 준수합니다."}
      </CardFooter>
    </Card>
  );
}
