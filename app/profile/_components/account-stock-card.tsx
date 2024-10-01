"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const { data, isSuccess } = useQuery({
    queryKey: ["account", "stock", accountId],
    queryFn: () => getAccountStockApi(accountId),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (!isSuccess || data == undefined || data == null) {
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
        <CardContent className="pt-5">
          <Table>
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
          </Table>
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-500" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-1000" />
        </CardContent>
      </Card>
    );
  }

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
      <CardContent className="pt-5">
        <Table>
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
                  {formatNumber(item.price)}원
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
                  {(item.profitPercentage * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
