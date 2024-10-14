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
import {
  getRecentTransactionApi,
  RecentTransactionType,
} from "@/lib/account-api";

interface Props {
  accountId: string;
}

export const BuyStateCard = ({ accountId }: Props) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["history"],
    queryFn: () => getRecentTransactionApi(accountId),
  });

  if (!isSuccess || data == undefined || data == null)
    return (
      <Card className="w-full h-full border">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>체결/미체결</CardTitle>
            <CardDescription>현재 등록된 체결 내역입니다.</CardDescription>
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
                <TableHead>종목명</TableHead>
                <TableHead>매매구분</TableHead>
                <TableHead className="text-right">주문단가</TableHead>
                <TableHead className="text-right">체결수량</TableHead>
                <TableHead className="text-right">미체결수량</TableHead>
                <TableHead className="text-right">처리상태</TableHead>
                <TableHead>주문번호</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-500" />
          <div className="mt-2 h-10 w-full rounded bg-c1-100 animate-pulse delay-1000" />
        </CardContent>
      </Card>
    );

  const tableData: RecentTransactionType[] = [];
  const today = new Date();
  data.forEach((item) => {
    const _buyDate = new Date(item.createdAt);
    if (
      item.stockInfo != null &&
      _buyDate.getMonth() == today.getMonth() &&
      _buyDate.getDay() == today.getDate()
    )
      return tableData.push(item);
  });

  return (
    <Card className="w-full h-full border">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>체결/미체결</CardTitle>
          <CardDescription>현재 등록된 체결 내역입니다.</CardDescription>
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
              <TableHead>종목명</TableHead>
              <TableHead>매매구분</TableHead>
              <TableHead className="text-right">주문단가</TableHead>
              <TableHead className="text-right">체결수량</TableHead>
              <TableHead className="text-right">미체결수량</TableHead>
              <TableHead className="text-right">처리상태</TableHead>
              <TableHead className="text-right">주문번호</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.stockInfo?.prdt_abrv_name}</TableCell>
                  <TableCell>증권매수</TableCell>
                  <TableCell className="text-right">{item.price}원</TableCell>
                  <TableCell className="text-right">
                    {item.quantity}주
                  </TableCell>
                  <TableCell className="text-right">0주</TableCell>
                  <TableCell className="text-right">완료</TableCell>
                  <TableCell className="text-right">125123</TableCell>
                </TableRow>
              );
            })}
            {tableData.length == 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="pt-10 text-center font-medium opacity-70"
                >
                  매매내역 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
