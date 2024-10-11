"use client";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  BuyStockApi,
  getStockHokaApi,
  HokaType,
  OrderStockApi,
} from "@/lib/stock-api";
import { formatNumber } from "@/lib/utils";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useMutation } from "@tanstack/react-query";
import { EclipseIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  code: string;
}

export const HokaOrderCard = ({ code }: Props) => {
  const { toast } = useToast();
  const [hokaData, setHokaData] = useState<HokaType | null>(null);
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [predictPrice, setPredictPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState(-1);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(-1);
  const [buyType, setBuyType] = useState("marketType");

  const selector = createSelectors(store).use;
  const account = selector.account();
  const setPrice = selector.setPrice();

  const { mutate } = useMutation({
    mutationFn: () => getStockHokaApi(code),
    onSuccess: (e) => {
      if (e.output1 == undefined || e.output1 == null) return;
      setHokaData(e.output1);
      setHighPrice(e.output2.stck_hgpr);
      setLowPrice(e.output2.stck_lwpr);
      setPredictPrice(e.output2.antc_cnpr);
      setCurrentPrice(parseInt(e.output2.stck_prpr));
      if (buyType == "marketType") setBuyPrice(parseInt(e.output2.stck_prpr));
      setPrice(parseInt(e.output2.stck_prpr));
    },
  });

  const handleBuy = () => {
    if (account == null) return;
    if (account.accountNo == null) return;
    if (currentPrice == -1) return;
    if (
      buyType == "marketType" &&
      account.balance < currentPrice * buyQuantity
    ) {
      toast({
        variant: "destructive",
        title: "매수 주문 실패",
        description: "예수금이 부족합니다.",
      });
      return;
    }

    if (buyType == "userType" && account.balance < buyPrice * buyQuantity) {
      toast({
        variant: "destructive",
        title: "매수 주문 실패",
        description: "예수금이 부족합니다.",
      });
      return;
    }

    if (buyType == "marketType") buyMutation.mutate();
    if (buyType == "userType") orderMutation.mutate();
  };

  const buyMutation = useMutation({
    mutationFn: () =>
      BuyStockApi(account!.accountNo, code, buyQuantity, currentPrice),
    onSuccess: (e) => {
      toast({
        title: "매수 체결 알림",
        description: `${formatNumber(e.data.price)}원에 ${formatNumber(
          e.data.quantity
        )}주 체결`,
      });
    },
  });

  const orderMutation = useMutation({
    mutationFn: () =>
      OrderStockApi(account!.accountNo, code, buyQuantity, buyPrice),
    onSuccess: (e) => {
      toast({
        title: "매수 주문 알림",
        description: e.data,
      });
    },
  });

  useEffect(() => {
    const fetchHoka = setInterval(mutate, 1000);
    mutate();
    return () => {
      clearInterval(fetchHoka);
    };
  }, []);

  return (
    <>
      <HokaCard
        data={hokaData}
        lowPrice={lowPrice}
        highPrice={highPrice}
        predictPrice={predictPrice}
      />
      {account == null ? (
        <NotLoggedInOrderCard code={code} />
      ) : (
        <LoggedInOrderCard
          account={account}
          currentPrice={currentPrice}
          buyPrice={buyPrice}
          setBuyPrice={setBuyPrice}
          buyQuantity={buyQuantity}
          setBuyQuantity={setBuyQuantity}
          buyType={buyType}
          setBuyType={setBuyType}
          handleBuy={handleBuy}
          code={code}
        />
      )}
    </>
  );
};

const HokaCard = ({
  data,
  lowPrice,
  highPrice,
  predictPrice,
}: {
  data: HokaType | null;
  lowPrice: string;
  highPrice: string;
  predictPrice: string;
}) => {
  if (data == undefined || data == null)
    return (
      <Card className="h-full w-1/4 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="opacity-80">호가</CardTitle>
        </CardHeader>
        <div className="p-5 h-full flex2">
          <Spinner />
        </div>
      </Card>
    );

  return (
    <Card className="h-full w-1/4 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="opacity-80">호가</CardTitle>
      </CardHeader>
      <div className="pt-2 pb-5 px-5 h-full flex">
        <div className="h-full w-1/3">
          <MaedoBlock remain={data.askp_rsqn1} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn2} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn3} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn4} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn5} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn6} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn7} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn8} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn9} total={data.total_askp_rsqn} />
          <MaedoBlock remain={data.askp_rsqn10} total={data.total_askp_rsqn} />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
        </div>

        <div className="h-full w-1/3 border-x">
          <div className="h-[5%] border-y flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp1)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp2)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp3)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp4)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp5)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp6)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp7)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp8)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp9)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-rose-500">
            {formatNumber(data.askp10)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp1)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp2)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp3)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp4)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp5)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp6)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp7)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp8)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp9)}원
          </div>
          <div className="h-[5%] border-b flex2 font-medium text-sm text-blue-500">
            {formatNumber(data.bidp10)}원
          </div>
        </div>
        <div className="h-full w-1/3">
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%]" />
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            최고가
          </div>
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            {formatNumber(highPrice)}원
          </div>
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            최저가
          </div>
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            {formatNumber(lowPrice)}원
          </div>
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            예상체결가
          </div>
          <div className="h-[5%] flex2 pr-2 text-sm font-medium opacity-70">
            {formatNumber(predictPrice)}원
          </div>
          <div className="h-[5%]" />
          <MaesuBlock remain={data.bidp_rsqn1} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn2} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn3} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn4} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn5} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn6} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn7} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn8} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn9} total={data.total_bidp_rsqn} />
          <MaesuBlock remain={data.bidp_rsqn10} total={data.total_bidp_rsqn} />
        </div>
      </div>
    </Card>
  );
};

const MaedoBlock = ({ remain, total }: { remain: string; total: string }) => {
  return (
    <div className="py-1 h-[5%] w-full flex items-center justify-end gap-1">
      <div className="text-[10px] text-rose-500 font-medium">
        {formatNumber(remain)}
      </div>
      <div
        className="h-full w-5 bg-rose-500 rounded-l-xl"
        style={{ width: `${(parseFloat(remain) / parseFloat(total)) * 200}%` }}
      />
    </div>
  );
};

const MaesuBlock = ({ remain, total }: { remain: string; total: string }) => {
  return (
    <div className="py-1 h-[5%] w-full flex items-center justify-start gap-1">
      <div
        className="h-full w-5 bg-blue-500 rounded-r-xl"
        style={{ width: `${(parseFloat(remain) / parseFloat(total)) * 200}%` }}
      />
      <div className="text-[10px] text-blue-500 font-medium">
        {formatNumber(remain)}
      </div>
    </div>
  );
};

interface LoggedInOrderCardProps {
  account: {
    balance: number;
  } | null;
  currentPrice: number;
  buyQuantity: number;
  setBuyQuantity: Dispatch<SetStateAction<number>>;
  buyPrice: number;
  setBuyPrice: Dispatch<SetStateAction<number>>;
  handleBuy: () => void;
  buyType: string;
  setBuyType: Dispatch<SetStateAction<string>>;
  code: string;
}

const LoggedInOrderCard = ({
  account,
  currentPrice,
  buyQuantity,
  setBuyQuantity,
  buyPrice,
  setBuyPrice,
  buyType,
  setBuyType,
  handleBuy,
  code,
}: LoggedInOrderCardProps) => {
  return (
    <article className="h-full w-1/4 flex flex-col gap-5 justify-between">
      <Tabs defaultValue="buy" className="h-full">
        <TabsList className="h-14 grid grid-cols-2">
          <TabsTrigger value="buy" className="py-2">
            매수주문
          </TabsTrigger>
          <TabsTrigger value="sell" className="py-2">
            매도주문
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy" className="h-[calc(100%-64px)]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="opacity-80">매수주문</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* 상단 */}
              <div className="flex gap-2">
                <Select
                  onValueChange={(e) => {
                    setBuyType(e);
                    if (e == "marketType") setBuyPrice(currentPrice);
                  }}
                >
                  <SelectTrigger className="h-[50px] font-medium opacity-80">
                    <SelectValue placeholder="구매 방식을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="h-[50px] font-medium opacity-80"
                      value="marketType"
                    >
                      시장가
                    </SelectItem>
                    <SelectItem
                      className="h-[50px] font-medium opacity-80"
                      value="userType"
                    >
                      지정가
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant={"outline"} className="py-6">
                  단일가
                </Button>
              </div>

              {/* 중단 */}
              <div className="relative">
                <Input
                  className="pl-16 font-bold opacity-80"
                  value={buyQuantity}
                  type="number"
                  onChange={(e) => setBuyQuantity(parseInt(e.target.value))}
                />
                <span className="absolute top-3.5 right-16 text-sm opacity-80 font-medium">
                  주
                </span>
                <Button
                  className="top-2 left-2 px-3 absolute rounded-none border-r"
                  variant={"ghost"}
                  onClick={() => setBuyQuantity((cur) => Math.max(0, cur - 1))}
                >
                  <MinusIcon className="text-c1-300" size={16} />
                </Button>
                <Button
                  className="top-2 right-2 px-3 absolute rounded-none border-l"
                  variant={"ghost"}
                  onClick={() => setBuyQuantity((cur) => cur + 1)}
                >
                  <PlusIcon className="text-c1-300" size={16} />
                </Button>
              </div>
              <div className="relative">
                <Button
                  disabled={buyType == "marketType"}
                  className="z-10 top-2 left-2 px-3 absolute rounded-none border-r"
                  variant={"ghost"}
                  onClick={() => setBuyPrice((cur) => Math.max(0, cur - 100))}
                >
                  <MinusIcon className="text-c1-300" size={16} />
                </Button>
                <Input
                  type="number"
                  disabled={buyType == "marketType"}
                  className="pl-16 font-bold opacity-80"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseInt(e.target.value))}
                />
                <span className="absolute top-3.5 right-16 text-sm opacity-60 font-medium">
                  원
                </span>
                <Button
                  disabled={buyType == "marketType"}
                  className="top-2 right-2 px-3 absolute rounded-none border-l"
                  variant={"ghost"}
                  onClick={() => setBuyPrice((cur) => cur + 100)}
                >
                  <PlusIcon className="text-c1-300" size={16} />
                </Button>
              </div>

              {/* 3단 */}
              <div className="flex justify-between gap-2">
                <Button
                  className="w-full py-6"
                  onClick={() => {
                    if (account == undefined || account == null) return;
                    setBuyQuantity(
                      Math.floor(account.balance / currentPrice / 10)
                    );
                  }}
                >
                  10%
                </Button>
                <Button
                  className="w-full py-6"
                  onClick={() => {
                    if (account == undefined || account == null) return;
                    setBuyQuantity(
                      Math.floor(account.balance / currentPrice / 4)
                    );
                  }}
                >
                  25%
                </Button>
                <Button
                  className="w-full py-6"
                  onClick={() => {
                    if (account == undefined || account == null) return;
                    setBuyQuantity(
                      Math.floor(account.balance / currentPrice / 2)
                    );
                  }}
                >
                  50%
                </Button>
                <Button
                  className="w-full py-6"
                  onClick={() => {
                    if (account == undefined || account == null) return;
                    setBuyQuantity(Math.floor(account.balance / currentPrice));
                  }}
                >
                  최대
                </Button>
              </div>
              <div>
                <Separator className="my-5 w-full" />
              </div>
              <Input
                placeholder="총 금액"
                readOnly
                value={formatNumber(buyQuantity * currentPrice) + "원"}
                className="focus-visible:ring-0 font-bold opacity-80 text-right"
              />
              <div className="pt-1 w-full flex gap-2">
                <Button className="py-8 bg-zinc-600 hover:bg-zinc-500 text-xs">
                  CMA
                  <br /> 전액매도
                </Button>
                <Button
                  variant={"destructive"}
                  className="py-8 w-full"
                  onClick={handleBuy}
                  disabled={buyQuantity == 0 || buyPrice == 0}
                >
                  매수 주문
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sell" className="h-[calc(100%-64px)]">
          <Card>
            <CardHeader>
              <CardTitle>매도주문</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button className="h-20 text-2xl font-bold" asChild>
        <Link href={`/dividend/${code}`}>
          <span className="ml-2">배당 정보</span>
          <EclipseIcon className="ml-5" size={32} />
        </Link>
      </Button>
    </article>
  );
};

const NotLoggedInOrderCard = ({ code }: { code: string }) => {
  return (
    <article className="h-full w-1/4 flex flex-col gap-5 justify-between">
      <Tabs defaultValue="buy" className="h-full">
        <TabsList className="h-14 grid grid-cols-2">
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
            <CardContent>
              <p className="mt-40 text-center font-medium opacity-70">
                로그인 이후에 주문이 가능합니다.
              </p>
              <div className="mt-5 flex2">
                <Button variant={"link"} asChild>
                  <Link
                    href={"/sign-in"}
                    className="opacity-70"
                    onClick={() => {
                      if (window != undefined)
                        sessionStorage.setItem(
                          "return_url",
                          window.location.href
                        );
                    }}
                  >
                    로그인
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="h-[calc(100%-64px)]" value="sell">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="opacity-80">매수주문</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-40 text-center font-medium opacity-70">
                로그인 이후에 주문이 가능합니다.
              </p>
              <div className="mt-5 flex2">
                <Button variant={"link"} asChild>
                  <Link
                    href={"/sign-in"}
                    className="opacity-70"
                    onClick={() => {
                      if (window != undefined)
                        sessionStorage.setItem(
                          "return_url",
                          window.location.href
                        );
                    }}
                  >
                    로그인
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button className="h-20 text-2xl font-bold" asChild>
        <Link href={`/dividend/${code}`}>
          <span className="ml-2">배당 정보</span>
          <EclipseIcon className="ml-5" size={32} />
        </Link>
      </Button>
    </article>
  );
};
