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
import { useQuery } from "@tanstack/react-query";
import { getAccountStockApi } from "@/lib/account-api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

  return (
    <Card className="border w-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="opacity-80">보유종목</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            전체 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="flex gap-10">
        <Table>
          <TableCaption>보유하고 계신 종목 입니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>종목명</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">현재 가격</TableHead>
              <TableHead className="text-right">구매 가격</TableHead>
              <TableHead className="text-right">총 가격</TableHead>
              <TableHead className="text-right">수익 금액</TableHead>
              <TableHead className="text-right">수익률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => {
              const profit =
                parseInt(item.stockInfo.bfdy_clpr) - item.purchasePrice;
              const profitPercentage =
                ((parseInt(item.stockInfo.bfdy_clpr) - item.purchasePrice) /
                  item.purchasePrice) *
                100;

              return (
                <TableRow key={item.id} className="opacity-70 font-medium">
                  <TableCell>{item.stockInfo.prdt_abrv_name}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.quantity)}주
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.stockInfo.bfdy_clpr)}원
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.purchasePrice)}원
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(
                      item.quantity * parseInt(item.stockInfo.bfdy_clpr)
                    )}
                    원
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      profit > 0 ? "text-rose-500" : "text-blue-500"
                    }`}
                  >
                    {formatNumber(profit)}원
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      profit > 0 ? "text-rose-500" : "text-blue-500"
                    }`}
                  >
                    {profitPercentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
