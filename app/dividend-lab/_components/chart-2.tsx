"use client";
import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import { AccountStockType } from "@/lib/account-api";
import { Spinner } from "@/components/spinner/spinner";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
];

interface Props {
  isPending: boolean;
  isSuccess: boolean;
  data: AccountStockType[] | undefined;
}

export function Chart2({ isPending, isSuccess, data }: Props) {
  if (isPending || !isSuccess || data == undefined)
    return (
      <Card className="w-full border">
        <CardHeader className="opacity-80">
          <CardTitle>포트폴리오</CardTitle>
        </CardHeader>
        <CardContent className="h-[450px] flex2">
          <Spinner />
        </CardContent>
      </Card>
    );

  console.log(data);

  const extra: AccountStockType = {
    code: "000000",
    title: "기타",
    quantity: 0,
    purchasePrice: 0,
    purchaseTotalPrice: 0,
    currentPrice: 0,
    currentTotalPrice: 0,
    profit: 0,
    profitPercentage: 0,
  };

  const update1 = [];
  data.forEach((item, idx) => {
    if (idx < 6) update1.push(item);
    else extra.currentTotalPrice += item.currentTotalPrice;
  });

  update1.push(extra);

  const update2 = update1.map((item, idx) => ({
    ...item,
    fill: colors[idx],
  }));

  return (
    <Card className="flex flex-col border w-full">
      <CardHeader className="opacity-80">
        <CardTitle>포트폴리오</CardTitle>
      </CardHeader>

      <CardContent className="h-full flex items-center justify-between">
        <Table className="w-full">
          <TableCaption>보유하고 계신 종목 입니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>종목명</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">구매 가격</TableHead>
              <TableHead className="text-right">현재 가격</TableHead>
              <TableHead className="text-right">총 가치</TableHead>
              <TableHead className="text-right">수익</TableHead>
              <TableHead className="text-right">수익률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.code} className="opacity-70 font-medium">
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.quantity)}주
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.purchasePrice)}원
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.currentPrice)}원
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.currentTotalPrice)}원
                </TableCell>
                <TableCell
                  className={`text-right font-medium
                        ${item.profit > 0 ? "text-rose-600" : "text-blue-600"}`}
                >
                  {formatNumber(item.profit)}원
                </TableCell>
                <TableCell
                  className={`text-right font-medium
                    ${item.profit > 0 ? "text-rose-600" : "text-blue-600"}`}
                >
                  {item.profitPercentage.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ChartContainer
          config={{}}
          className=" h-[500px] [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="title" hideLabel />}
            />
            <Pie
              data={update2}
              dataKey="currentTotalPrice"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1}
            >
              <LabelList
                dataKey="title"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
