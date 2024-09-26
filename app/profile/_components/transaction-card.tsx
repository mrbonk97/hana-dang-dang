"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  const query = useQuery({
    queryKey: ["history"],
    queryFn: () => getRecentTransactionApi(accountId),
  });

  return (
    <Card className="xl:col-span-2 border w-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>거래내역</CardTitle>
          <CardDescription>최근 10건에 대한 거래 내역입니다.</CardDescription>
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
              <TableHead className="text-right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.data?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>매수</TableCell>
                  <TableCell>{item.stockInfo.prdt_abrv_name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.price)}원
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
