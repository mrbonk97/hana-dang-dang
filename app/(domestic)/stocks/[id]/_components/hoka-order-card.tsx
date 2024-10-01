"use client";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BuyStockApi, getStockHokaApi } from "@/lib/stock-api";
import { formatNumber } from "@/lib/utils";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  code: string;
}

export const HokaOrderCard = ({ code }: Props) => {
  const { toast } = useToast();
  const [buyAmount, setBuyAmount] = useState(0);
  const selector = createSelectors(store);
  const account = selector.use.account();
  const isLoggedIn = selector.use.isLoggedIn();
  const setPrice = selector.use.setPrice();

  const { data, isSuccess, isRefetching } = useQuery({
    queryKey: ["hoka", code],
    queryFn: () => getStockHokaApi(code),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const buyMutation = useMutation({
    mutationFn: () => {
      if (account == null) throw "로그인 필요";
      if (data?.output2.stck_prpr == undefined) throw "금액 없음";

      return BuyStockApi(
        account.accountNo,
        code,
        buyAmount,
        parseInt(data.output2.stck_prpr)
      );
    },
    onSuccess: (res) => {
      toast({
        title: "주식 매수 체결 알림",
        description: `${res.data.price}원에 ${res.data.quantity}주 매수 완료`,
      });
    },
  });

  const handleBuyButton = (perc: number) => {
    if (account == null) return;
    if (data == undefined || data == null) return;

    const maxAmount = account?.balance / parseInt(data.output2.stck_prpr);
    let amount = 0;
    if (perc == 100) amount = Math.floor(maxAmount);
    if (perc == 50) amount = Math.floor(maxAmount / 2);
    if (perc == 25) amount = Math.floor(maxAmount / 4);
    if (perc == 10) amount = Math.floor(maxAmount / 10);
    setBuyAmount(amount);
  };

  useEffect(() => {
    if (data == undefined || data == null || data.output2 == undefined) return;
    setPrice(data.output2.stck_prpr);
  }, [isRefetching, isSuccess]);

  if (
    !isSuccess ||
    data == undefined ||
    data.output1 == undefined ||
    data.output1.askp1 == undefined
  )
    return (
      <>
        <Card className="h-full w-1/4">
          <CardHeader>
            <CardTitle className="opacity-80">호가</CardTitle>
          </CardHeader>
          <CardContent className={`h-full flex2`}>
            <Spinner />
          </CardContent>
        </Card>
        <NotLoggedInOrderCard />
      </>
    );

  return (
    <>
      <Card className="h-full w-1/4">
        <CardHeader>
          <CardTitle className="opacity-80">호가</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <ul className="font-medium opacity-80 space-y-1 text-blue-500">
            <li className="font-bold flex justify-between pb-1">
              <span>잔량</span>
              <span>매도 가격</span>
            </li>
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn10} price={data.output1.askp10} type="SELL" width={parseInt(data.output1.askp_rsqn10) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn9} price={data.output1.askp9} type="SELL" width={parseInt(data.output1.askp_rsqn9) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn8} price={data.output1.askp8} type="SELL" width={parseInt(data.output1.askp_rsqn8) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn7} price={data.output1.askp7} type="SELL" width={parseInt(data.output1.askp_rsqn7) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn6} price={data.output1.askp6} type="SELL" width={parseInt(data.output1.askp_rsqn6) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn5} price={data.output1.askp5} type="SELL" width={parseInt(data.output1.askp_rsqn5) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn4} price={data.output1.askp4} type="SELL" width={parseInt(data.output1.askp_rsqn4) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn3} price={data.output1.askp3} type="SELL" width={parseInt(data.output1.askp_rsqn3) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn2} price={data.output1.askp2} type="SELL" width={parseInt(data.output1.askp_rsqn2) / parseInt(data.output1.total_askp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.askp_rsqn1} price={data.output1.askp1} type="SELL" width={parseInt(data.output1.askp_rsqn1) / parseInt(data.output1.total_askp_rsqn) * 300} />
          </ul>
          <Separator className="my-5" />
          <ul className="font-medium opacity-80 space-y-1 text-rose-500">
            <li className="font-bold flex justify-between pb-1">
              <span>매수 가격</span>
              <span>잔량</span>
            </li>
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn1} price={data.output1.bidp1} type="BUY" width={parseInt(data.output1.bidp_rsqn1) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn2} price={data.output1.bidp2} type="BUY" width={parseInt(data.output1.bidp_rsqn2) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn3} price={data.output1.bidp3} type="BUY" width={parseInt(data.output1.bidp_rsqn3) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn4} price={data.output1.bidp4} type="BUY" width={parseInt(data.output1.bidp_rsqn4) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn5} price={data.output1.bidp5} type="BUY" width={parseInt(data.output1.bidp_rsqn5) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn6} price={data.output1.bidp6} type="BUY" width={parseInt(data.output1.bidp_rsqn6) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn7} price={data.output1.bidp7} type="BUY" width={parseInt(data.output1.bidp_rsqn7) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn8} price={data.output1.bidp8} type="BUY" width={parseInt(data.output1.bidp_rsqn8) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn9} price={data.output1.bidp9} type="BUY" width={parseInt(data.output1.bidp_rsqn9) / parseInt(data.output1.total_bidp_rsqn) * 300} />
            {/* prettier-ignore */}
            <List remain={data.output1.bidp_rsqn10} price={data.output1.bidp10} type="BUY" width={parseInt(data.output1.bidp_rsqn10) / parseInt(data.output1.total_bidp_rsqn) * 300} />
          </ul>
        </CardContent>
      </Card>
      {!isLoggedIn && <NotLoggedInOrderCard />}
      {isLoggedIn && (
        <Tabs defaultValue="account" className="w-1/4">
          <TabsList className="grid w-full grid-cols-2 h-14">
            <TabsTrigger value="account" className="py-2">
              매수주문
            </TabsTrigger>
            <TabsTrigger value="password" className="py-2">
              매도주문
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>매수주문</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input value={"시장가"} readOnly />
                  <Button variant={"outline"} className="py-6">
                    단일가
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    className="pl-16 font-bold opacity-80"
                    value={buyAmount}
                  />
                  <span className="absolute top-3.5 right-16 text-sm opacity-80 font-medium">
                    주
                  </span>
                  <Button
                    className="top-2 left-2 px-3 absolute rounded-none border-r"
                    variant={"ghost"}
                    onClick={() => setBuyAmount((cur) => Math.max(0, cur - 1))}
                  >
                    <MinusIcon className="text-c1-300" size={16} />
                  </Button>
                  <Button
                    className="top-2 right-2 px-3 absolute rounded-none border-l"
                    variant={"ghost"}
                    onClick={() => setBuyAmount((cur) => cur + 1)}
                  >
                    <PlusIcon className="text-c1-300" size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    disabled
                    className="top-2 left-2 px-3 absolute rounded-none border-r"
                    variant={"ghost"}
                  >
                    <MinusIcon className="text-c1-300" size={16} />
                  </Button>
                  <Input
                    disabled
                    className="pl-16 font-bold opacity-80"
                    value={formatNumber(data.output2.stck_prpr)}
                  />
                  <span className="absolute top-3.5 right-16 text-sm opacity-60 font-medium">
                    원
                  </span>
                  <Button
                    disabled
                    className="top-2 right-2 px-3 absolute rounded-none border-l"
                    variant={"ghost"}
                  >
                    <PlusIcon className="text-c1-300" size={16} />
                  </Button>
                </div>
                <div className="flex justify-between gap-2">
                  <Button
                    className="w-full py-6"
                    onClick={() => handleBuyButton(10)}
                  >
                    10%
                  </Button>
                  <Button
                    className="w-full py-6"
                    onClick={() => handleBuyButton(25)}
                  >
                    25%
                  </Button>
                  <Button
                    className="w-full py-6"
                    onClick={() => handleBuyButton(50)}
                  >
                    50%
                  </Button>
                  <Button
                    className="w-full py-6"
                    onClick={() => handleBuyButton(100)}
                  >
                    최대
                  </Button>
                </div>
                <div>
                  <Separator className="w-full my-5" />
                </div>
                <div>
                  <Input
                    placeholder="총 금액"
                    readOnly
                    className="focus-visible:ring-0 font-bold opacity-80 text-right"
                    value={
                      formatNumber(
                        buyAmount * parseInt(data.output2.stck_prpr)
                      ) + "원"
                    }
                  />
                  <div className="mt-5 w-full flex gap-2">
                    <Button className="py-8 bg-zinc-600 hover:bg-zinc-500 text-xs">
                      CMA
                      <br /> 전액매도
                    </Button>
                    <Button
                      variant={"destructive"}
                      className="py-8 w-full"
                      onClick={() => buyMutation.mutate()}
                    >
                      매수 주문
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>매도주문</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input value={"시장가"} readOnly />
                  <Button variant={"outline"} className="py-6">
                    단일가
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    className="top-2 left-2 px-3 absolute rounded-none border-r"
                    variant={"ghost"}
                  >
                    <MinusIcon className="text-c1-300" size={16} />
                  </Button>
                  <Input className="pl-16 font-bold opacity-80" />
                  <span className="absolute top-3.5 right-16 text-sm opacity-80 font-medium">
                    주
                  </span>
                  <Button
                    className="top-2 right-2 px-3 absolute rounded-none border-l"
                    variant={"ghost"}
                  >
                    <PlusIcon className="text-c1-300" size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    disabled
                    className="top-2 left-2 px-3 absolute rounded-none border-r"
                    variant={"ghost"}
                  >
                    <MinusIcon className="text-c1-300" size={16} />
                  </Button>
                  <Input disabled className="pl-16 font-bold opacity-80" />
                  <span className="absolute top-3.5 right-16 text-sm opacity-60 font-medium">
                    원
                  </span>
                  <Button
                    disabled
                    className="top-2 right-2 px-3 absolute rounded-none border-l"
                    variant={"ghost"}
                  >
                    <PlusIcon className="text-c1-300" size={16} />
                  </Button>
                </div>
                <div className="flex justify-between gap-2">
                  <Button className="w-full py-6">10%</Button>
                  <Button className="w-full py-6">25%</Button>
                  <Button className="w-full py-6">50%</Button>
                  <Button className="w-full py-6">최대</Button>
                </div>
                <div>
                  <Separator className="w-full my-5" />
                </div>
                <div>
                  <Input
                    placeholder="총 금액"
                    readOnly
                    className="focus-visible:ring-0"
                  />
                  <Button className="mt-5 py-8 w-full bg-blue-400 hover:bg-blue-300">
                    매도 주문
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

interface ListProps {
  type: "BUY" | "SELL";
  remain: string;
  price: string;
  width: number;
}
const List = ({ type, remain, price, width }: ListProps) => {
  const color1 = type == "BUY" ? "bg-rose-200" : "bg-blue-200";

  return (
    <li
      className={`w-full flex ${
        type == "BUY" && "flex-row-reverse"
      } justify-between gap-2`}
    >
      <div
        style={{ width: `${width}%` }}
        className={`relative rounded ${color1} ${
          type == "BUY" ? "rounded-l-lg" : "rounded-r-lg"
        }`}
      >
        <span className={`absolute ${type == "BUY" ? "right-2" : "left-2"}`}>
          {formatNumber(parseInt(remain))}
        </span>
      </div>
      <div className={` flex-shrink-0`}>{formatNumber(parseInt(price))}원</div>
    </li>
  );
};

const NotLoggedInOrderCard = () => {
  return (
    <Tabs defaultValue="buy" className="h-full w-1/4">
      <TabsList className="grid w-full grid-cols-2 h-14">
        <TabsTrigger value="buy" className="py-2">
          매수주문
        </TabsTrigger>
        <TabsTrigger value="sell" className="py-2">
          매도주문
        </TabsTrigger>
      </TabsList>
      <TabsContent className="h-[calc(100%-64px)]" value="buy">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="opacity-80">매수주문</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="mt-40 text-center font-medium opacity-70">
              로그인 이후에 주문이 가능합니다.
            </p>
            <p className="mt-5 text-center font-medium opacity-70">
              <Button variant={"link"} asChild>
                <Link href={"/sign-in"}>로그인</Link>
              </Button>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent className="h-[calc(100%-64px)]" value="sell">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="opacity-80">매도주문</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="mt-40 text-center font-medium opacity-70">
              로그인 이후에 주문이 가능합니다.
            </p>
            <p className="mt-5 text-center font-medium opacity-70">
              <Button variant={"link"} asChild>
                <Link href={"/sign-in"}>로그인</Link>
              </Button>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
