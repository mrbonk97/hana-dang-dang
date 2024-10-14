"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getRecentTransactionApi } from "@/lib/account-api";
import { formatNumber } from "@/lib/utils";

interface Props {
  accountId: string;
}

export const TransactionCard = ({ accountId }: Props) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["history"],
    queryFn: () => getRecentTransactionApi(accountId),
  });

  if (!isSuccess || data == undefined || data == null)
    return (
      <Card className="w-full h-full border">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>거래내역</CardTitle>
            <CardDescription>최근 7건에 대한 거래 내역입니다.</CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              전체 보기
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>거래일자</TableHead>
                <TableHead>거래유형</TableHead>
                <TableHead>종목명</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">가격</TableHead>
                <TableHead className="text-right">정산금액</TableHead>
                <TableHead className="text-right">거래금액</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-500" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-1000" />
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full h-full border">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>거래내역</CardTitle>
          <CardDescription>최근 7건에 대한 거래 내역입니다.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            전체 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>거래일자</TableHead>
              <TableHead>거래유형</TableHead>
              <TableHead>종목명</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">가격</TableHead>
              <TableHead className="text-right">거래금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 7).map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>{item.transactionType}</TableCell>
                  <TableCell>
                    {item.stockInfo == undefined
                      ? "-"
                      : item.stockInfo.prdt_abrv_name}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quantity ? item.quantity : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.price)}원
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.amount)}원
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
