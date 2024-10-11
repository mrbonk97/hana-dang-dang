"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecommendStockApi, RecommendStockType } from "@/lib/dividend-api";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Cog } from "lucide-react";
import Link from "next/link";
import { BuyStockDialog } from "./_components/buy-stock-dialog";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { NotLoggedInCard } from "@/components/not-logged-in-card";
import { useEffect } from "react";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DiagnosisResultPage = ({ searchParams }: Props) => {
  const selector = createSelectors(store).use;
  const account = selector.account();

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: () => {
      if (!searchParams) throw new Error("파라미터가 없음");
      if (!Array.isArray(searchParams)) throw new Error("파라미터가 없음");
      return getRecommendStockApi(searchParams);
    },
    onSuccess: (e) => {
      console.log(e, "성공");
    },
  });

  useEffect(() => {
    if (account != null) {
      mutate();
    }
  }, [account]);

  if (account == null) return <NotLoggedInCard />;

  if (isPending || !isSuccess || data == undefined)
    return (
      <main className="pt-14 pb-28 px-16 h-full flex2 flex-col gap-20">
        <h1 className="text-lg font-bold opacity-70">
          적합한 종목을 계산 중입니다<span className="dots"></span>
        </h1>
        <Cog
          className="animate-spin text-c1-300"
          style={{ animationDuration: "4000ms" }}
          size={128}
        />
      </main>
    );

  return (
    <main className="pt-24 pl-28 pr-[3rem] min-h-full flex2">
      <div className="flex gap-10 justify-between flex-wrap">
        {data.map((item) => {
          return (
            <List
              key={`stock-${item.code}`}
              data={item}
              accountBalance={account.balance}
              accountNo={account.accountNo}
            />
          );
        })}
      </div>
    </main>
  );
};

export default DiagnosisResultPage;

interface ListProps {
  data: RecommendStockType;
  accountBalance: number;
  accountNo: string;
}

const List = ({ data, accountBalance, accountNo }: ListProps) => {
  let imgCode = data.code;
  if (imgCode.length == 6) imgCode = imgCode.slice(0, -1) + "0";
  return (
    <article className="w-96 rounded-xl border hover:bg-secondary duration-300 group">
      <CardHeader>
        <CardTitle className="text-3xl flex items-end justify-between font-bold opacity-80">
          <span>{data.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5 px-10 flex flex-col items-center">
        <div className="w-full flex items-end justify-between gap-2">
          <Avatar className="h-28 w-28 rounded-xl">
            <AvatarImage
              src={`/kospi-icons/${imgCode}.png`}
              className="rounded-xl"
            />
            <AvatarFallback className="rounded-xl">
              {data.title.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-4xl font-bold opacity-80">
            {formatNumber(data.quantity)}
            <span className="text-xl opacity-80"> 주</span>
          </div>
        </div>
        <ul className="mt-5 w-full text-lg font-medium space-y-2 opacity-70">
          <li className="flex justify-between gap-5">
            <div>연간 배당금</div>
            <div>{formatNumber(data.yearlyProfit)}원</div>
          </li>
          <li className="flex justify-between gap-5">
            <div>배당률</div>
            <div>{formatNumber(data.yearlyProfitPercentage)}%</div>
          </li>
          <li className="flex justify-between gap-5">배당월</li>
        </ul>

        <div className="mt-4 h-24 t-4 w-full flex flex-wrap gap-2">
          {data.coverMonth.map((item) => (
            <Badge
              key={`${data.code}-cover-m-${item.month}`}
              className="h-8 w-16 flex2"
            >
              {item.month}월
            </Badge>
          ))}
        </div>
        <div className="mt-5 w-full flex justify-between gap-5">
          <Button
            variant={"secondary"}
            className="py-6 w-1/2 group-hover:bg-background hover:bg-background"
            asChild
          >
            <Link href={`/stocks/${data.code}`}>보러가기</Link>
          </Button>
          <BuyStockDialog
            accountBalance={accountBalance}
            accountNo={accountNo}
            title={data.title}
            imgUrl={imgCode}
            quantity={data.quantity}
            code={data.code}
          >
            <Button variant={"destructive"} className="py-6 w-full">
              주문하기
            </Button>
          </BuyStockDialog>
        </div>
      </CardContent>
    </article>
  );
};
