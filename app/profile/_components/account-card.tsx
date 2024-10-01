"use client";
import { MoneyDialog } from "@/components/dialog/money-dialog";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAccountDetailApi } from "@/lib/user-api";
import { formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CopyIcon } from "lucide-react";

interface Props {
  accountId: string;
}

export const AccountCard = ({ accountId }: Props) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getAccountDetailApi(accountId),
  });

  if (!isSuccess || data == undefined || data == null) {
    return (
      <Card className="h-full w-80 border flex-shrink-0">
        <CardHeader>
          <CardTitle className="opacity-80">자산</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loading" className="w-full">
            <TabsList className="h-10 grid w-full grid-cols-2 gap-2">
              <TabsTrigger value="loading">계좌별 자산</TabsTrigger>
              <TabsTrigger value="hoho">상품별 자산</TabsTrigger>
            </TabsList>
            <TabsContent className="h-80 flex2" value="loading">
              <Spinner />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  let color = "";
  if (data.profit > 0) color = "text-rose-500";
  if (data.profit < 0) color = "text-blue-500";

  return (
    <Card className="h-full w-80 border flex-shrink-0">
      <CardHeader>
        <CardTitle className="opacity-80">자산</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="h-10 grid w-full grid-cols-2">
            <TabsTrigger className="h-full" value="account">
              계좌별 자산
            </TabsTrigger>
            <TabsTrigger className="h-full" value="product">
              상품별 자산
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="h-96 w-full rounded-xl flex flex-col gap-4">
          <section className="mt-2 flex items-center gap-2">
            <h4 className="font-medium opacity-70">[CMA] {accountId}</h4>
            <Button className="p-1 aspect-square" variant={"ghost"}>
              <CopyIcon size={16} />
            </Button>
          </section>

          <section className="mt-1 p-5 bg-secondary rounded-xl">
            <p className="text-center font-medium opacity-60">
              계좌 별명을 입력하세요
            </p>
            <h3 className="mt-2 text-center text-lg font-bold opacity-80">
              {formatNumber(data.totalBalance)}원
            </h3>
          </section>

          <ul className="px-1 space-y-2 font-medium opacity-70">
            <li className="flex justify-between">
              <span>출금가능금액</span>
              <span> {formatNumber(data.withDrawAmount)}원</span>
            </li>
            <li className="flex justify-between">
              <span>손익</span>
              <span className={color}>{formatNumber(data.profit)}원</span>
            </li>
            <li className="flex justify-between">
              <span>수익률</span>
              <span className={color}>{data.profitPercentage.toFixed(2)}%</span>
            </li>
          </ul>

          <div className="w-full flex justify-between gap-5">
            <Button variant={"secondary"} className="py-6 w-1/3">
              잔고
            </Button>
            <Button variant={"secondary"} className="py-6 w-1/3">
              거래내역
            </Button>
            <MoneyDialog />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
