"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
import { AccountDividendHistoryType } from "@/lib/account-api";
import { Spinner } from "@/components/spinner/spinner";

export const description = "A radar chart with a legend";
// 월간 분기별 반기
// 연간 12개월 추적분 기타
// 중간 최종 특별

const chartConfig = {
  amount: {
    label: "배당금",
    color: "hsl(var(--chart-1))",
  },
  frequence: {
    label: "빈도수",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  isPending: boolean;
  isSuccess: boolean;
  data: AccountDividendHistoryType[] | undefined;
}

export function Chart3({ isPending, isSuccess, data }: Props) {
  if (isPending || !isSuccess || data == undefined) {
    return (
      <Card className="pr-14 border">
        <CardHeader className="pb-4">
          <CardTitle className="opacity-80">배당주 유형 분포</CardTitle>
          <CardDescription>
            보유하고 계신 배당주 유형을 보여드립니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96 w-96 flex2">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  let total = 0;
  let totalF = 0;

  const chartData = [
    { month: "중간", amount: 0, frequence: 0 },
    { month: "최종", amount: 0, frequence: 0 },
    { month: "연간", amount: 0, frequence: 0 },
    { month: "반기", amount: 0, frequence: 0 },
    { month: "분기", amount: 0, frequence: 0 },
    { month: "기타", amount: 0, frequence: 0 },
  ];

  data.forEach((item) => {
    total += item.amount;
    totalF++;
    if (item.dividendType == "중간") {
      chartData[0].amount += item.amount;
      chartData[0].frequence++;
    } else if (item.dividendType == "최종") {
      chartData[1].amount += item.amount;
      chartData[1].frequence++;
    } else if (item.dividendType == "연간") {
      chartData[2].amount += item.amount;
      chartData[2].frequence++;
    } else if (item.dividendType == "반기") {
      chartData[3].amount += item.amount;
      chartData[3].frequence++;
    } else if (item.dividendType == "분기") {
      chartData[4].amount += item.amount;
      chartData[4].frequence++;
    } else {
      chartData[5].amount += item.amount;
      chartData[5].frequence++;
    }
  });

  chartData.forEach((item, idx) => {
    if (total == 0) return;

    chartData[idx].amount = (item.amount / total) * 100;
    if (chartData[idx].amount == 0) chartData[idx].amount = 10;

    chartData[idx].frequence = (chartData[idx].frequence / totalF) * 100;
    if (chartData[idx].frequence == 0) chartData[idx].frequence = 10;
  });

  return (
    <Card className="pr-14 border">
      <CardHeader className="pb-4">
        <CardTitle className="opacity-80">배당주 유형 분포</CardTitle>
        <CardDescription>
          보유하고 계신 배당주 유형을 보여드립니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-20">
        <ChartContainer config={chartConfig} className="w-96 h-96">
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(val) => {
                    if (val == undefined) return val;
                    if (val == null) return val;
                    if (typeof val != "number") return val;
                    return (
                      <div className="p-5 font-medium">
                        비율: {val == 10 ? "0" : val.toFixed(2)}%
                      </div>
                    );
                  }}
                />
              }
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="frequence"
              fill="var(--color-frequence)"
              fillOpacity={0.5}
            />
            <Radar dataKey="amount" fill="var(--color-amount)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
        <ul className="h-96 flex flex-col justify-evenly max-w-md w-full">
          <li className="pb-2 grid grid-cols-3 gap-5 items-center font-bold opacity-80 border-b">
            <div className="pl-8 col-span-1">배당유형</div>
            <div className="col-span-1 text-right">배당 횟수 비율</div>
            <div className="col-span-1 text-right">누적 배당 비율</div>
          </li>
          {chartData.map((item) => (
            <li
              key={item.amount}
              className="p-2 rounded-xl grid grid-cols-3 gap-5 items-center font-medium opacity-70 hover:bg-secondary duration-150"
            >
              <div className="col-span-1 flex gap-5 items-center">
                <div className="h-2 w-2 rounded-full bg-c1-300 col-span-1" />
                {item.month}
              </div>
              <div className="col-span-1 text-right">
                {item.frequence == 10 ? "0" : item.frequence.toFixed(1)}%
              </div>
              <div className="col-span-1 text-right">
                {item.amount == 10 ? "0" : item.amount.toFixed(1)}%
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
