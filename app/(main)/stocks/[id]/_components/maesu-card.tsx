"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BuyCard = () => {
  const [amount, setAmount] = useState(0);
  return (
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
                value={amount}
                onChange={(e) => {
                  if (e.target.value == "") setAmount(0);
                  else setAmount(parseInt(e.target.value));
                }}
              />
              <span className="absolute top-3.5 right-16 text-sm opacity-80 font-medium">
                주
              </span>
              <Button
                className="top-2 left-2 px-3 absolute rounded-none border-r"
                variant={"ghost"}
                onClick={() => {
                  if (amount <= 0) return;
                  setAmount((cur) => cur - 1);
                }}
              >
                <MinusIcon className="text-c1-300" size={16} />
              </Button>
              <Button
                className="top-2 right-2 px-3 absolute rounded-none border-l"
                variant={"ghost"}
                onClick={() => {
                  setAmount((cur) => cur + 1);
                }}
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
                value={"총 금액"}
                readOnly
                className="focus-visible:ring-0"
              />
              <div className="mt-5 w-full flex gap-2">
                <Button className="py-8 bg-zinc-600 hover:bg-zinc-500 text-xs">
                  CMA
                  <br /> 전액매도
                </Button>
                <Button variant={"destructive"} className="py-8 w-full">
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
                value={"총 금액"}
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
  );
};

// <Card className="w-1/4">
// <CardHeader>
//   <CardTitle>주문하기</CardTitle>
// </CardHeader>
// <CardContent>
//   <div className="flex gap-2">
//     <Input value={"시장가"} readOnly />
//     <Button variant={"outline"} className="py-6">
//       단일가
//     </Button>
//   </div>
//   <div className="relative">
//     <Input
//       className="pl-16 font-bold opacity-80"
//       value={amount}
//       onChange={(e) => {
//         if (e.target.value == "") setAmount(0);
//         else setAmount(parseInt(e.target.value));
//       }}
//     />
//     <span className="absolute top-3.5 right-16 text-sm opacity-80 font-medium">
//       주
//     </span>
//     <Button
//       className="top-2 left-2 px-3 absolute rounded-none border-r"
//       variant={"ghost"}
//       onClick={() => {
//         if (amount <= 0) return;
//         setAmount((cur) => cur - 1);
//       }}
//     >
//       <MinusIcon className="text-c1-300" size={16} />
//     </Button>
//     <Button
//       className="top-2 right-2 px-3 absolute rounded-none border-l"
//       variant={"ghost"}
//       onClick={() => {
//         setAmount((cur) => cur + 1);
//       }}
//     >
//       <PlusIcon className="text-c1-300" size={16} />
//     </Button>
//   </div>
//   <div className="relative">
//     <Button
//       disabled
//       className="top-2 left-2 px-3 absolute rounded-none border-r"
//       variant={"ghost"}
//     >
//       <MinusIcon className="text-c1-300" size={16} />
//     </Button>
//     <Input disabled className="pl-16 font-bold opacity-80" />
//     <span className="absolute top-3.5 right-16 text-sm opacity-60 font-medium">
//       원
//     </span>
//     <Button
//       disabled
//       className="top-2 right-2 px-3 absolute rounded-none border-l"
//       variant={"ghost"}
//     >
//       <PlusIcon className="text-c1-300" size={16} />
//     </Button>
//   </div>
//   <div className="flex justify-between gap-2">
//     <Button className="w-full py-6">10%</Button>
//     <Button className="w-full py-6">25%</Button>
//     <Button className="w-full py-6">50%</Button>
//     <Button className="w-full py-6">최대</Button>
//   </div>
//   <div>
//     <Separator className="w-full my-5" />
//   </div>
//   <div>
//     <Input value={"총 금액"} readOnly className="focus-visible:ring-0" />
//     <div className="mt-5 w-full flex gap-2">
//       <Button className="py-8 bg-zinc-600 hover:bg-zinc-500 text-xs">
//         CMA
//         <br /> 전액매도
//       </Button>
//       <Button variant={"destructive"} className="py-8 w-full">
//         매수 주문
//       </Button>
//     </div>
//   </div>
// </CardContent>
// </Card>
