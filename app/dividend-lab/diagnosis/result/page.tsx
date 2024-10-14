"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Cog } from "lucide-react";
import Link from "next/link";
import { BuyStockDialog } from "./_components/buy-stock-dialog";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { NotLoggedInCard } from "@/components/not-logged-in-card";
import { useEffect } from "react";
import { getStockPriceListApi, StockPriceListType } from "@/lib/stock-api";

interface Props {
  searchParams: { [key: string]: string };
}

const DiagnosisResultPage = ({ searchParams }: Props) => {
  const stockList = [
    {
      code: searchParams.c0,
      quantity: searchParams.q0,
    },
    {
      code: searchParams.c1,
      quantity: searchParams.q1,
    },
    {
      code: searchParams.c2,
      quantity: searchParams.q2,
    },
    {
      code: searchParams.c3,
      quantity: searchParams.q3,
    },
    {
      code: searchParams.c4,
      quantity: searchParams.q4,
    },
  ];

  const selector = createSelectors(store).use;
  const account = selector.account();

  type DataType = {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
  };

  const mutate = useMutation({
    mutationFn: (data: DataType) => getStockPriceListApi(data),
  });

  useEffect(() => {
    if (!account) return;
    if (stockList.length == 0) return;

    mutate.mutate({
      c1: stockList[0].code,
      c2: stockList[1].code,
      c3: stockList[2].code,
      c4: stockList[3].code,
      c5: stockList[4].code,
    });
  }, [account, stockList, mutate]);

  if (account == null) return <NotLoggedInCard />;

  console.log(mutate.data);

  if (mutate.isPending || !mutate.isSuccess || mutate.data == undefined)
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
        {mutate.data.length > 0 && (
          <List
            data={mutate.data[0]}
            accountBalance={account.balance}
            accountNo={account.accountNo}
            quantity={parseInt(stockList[0].quantity)}
          />
        )}
        {mutate.data.length > 1 && (
          <List
            data={mutate.data[1]}
            accountBalance={account.balance}
            accountNo={account.accountNo}
            quantity={parseInt(stockList[1].quantity)}
          />
        )}
        {mutate.data.length > 2 && (
          <List
            data={mutate.data[2]}
            accountBalance={account.balance}
            accountNo={account.accountNo}
            quantity={parseInt(stockList[2].quantity)}
          />
        )}
        {mutate.data.length > 3 && (
          <List
            data={mutate.data[3]}
            accountBalance={account.balance}
            accountNo={account.accountNo}
            quantity={parseInt(stockList[3].quantity)}
          />
        )}
        {mutate.data.length > 4 && (
          <List
            data={mutate.data[4]}
            accountBalance={account.balance}
            accountNo={account.accountNo}
            quantity={parseInt(stockList[4].quantity)}
          />
        )}
      </div>
    </main>
  );
};

export default DiagnosisResultPage;

interface ListProps {
  data: StockPriceListType;
  accountBalance: number;
  accountNo: string;
  quantity: number;
}

const List = ({ data, accountBalance, accountNo, quantity }: ListProps) => {
  let imgCode = data.code;
  if (imgCode.length == 6) imgCode = imgCode.slice(0, -1) + "0";
  return (
    <article className="w-80 rounded-xl border hover:bg-secondary duration-300 group">
      <CardHeader>
        <CardTitle className="text-3xl flex items-end justify-between font-bold opacity-80">
          <span>{data.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-5 px-10 flex flex-col items-center">
        <div className="w-full flex items-end justify-between gap-2">
          <Avatar className="h-24 w-24 rounded-xl">
            <AvatarImage
              src={`/kospi-icons/${imgCode}.png`}
              className="rounded-xl"
            />
            <AvatarFallback className="rounded-xl">
              {data.title.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-4xl font-bold opacity-80">
            {formatNumber(quantity)}
            <span className="text-xl opacity-80"> 주</span>
          </div>
        </div>
        <div className="mt-10 w-full">
          <div className="text-2xl font-bold opacity-80">
            현재가: {formatNumber(data.stck_clpr)}원
          </div>
          <div
            className={`mt-1 font-bold opacity-80 ${
              data.prdy_vrss[0] == "-" ? "text-blue-500" : "text-rose-500"
            }`}
          >
            전일대비: {formatNumber(data.prdy_vrss)}원
          </div>
          <div className={`mt-1 font-bold opacity-60`}>
            거래량: {formatNumber(data.acml_vol)}주
          </div>
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
            quantity={quantity}
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
