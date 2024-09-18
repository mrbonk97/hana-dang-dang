import { MoneyDialog } from "@/components/dialog/money-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyIcon } from "lucide-react";

export const AccountCard = () => {
  return (
    <Card className="border max-w-96">
      <CardHeader>
        <CardTitle>자산</CardTitle>
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
          <TabsContent value="account">
            <div className="h-60 w-full rounded-xl">
              <div className="flex items-center gap-2">
                <h4 className="font-medium opacity-70">[CMA] 204-01-163531</h4>
                <Button className="p-1 aspect-square" variant={"ghost"}>
                  <CopyIcon size={16} />
                </Button>
              </div>
              <div className="mt-1 p-5 bg-secondary rounded-xl">
                <p className="text-center font-medium opacity-60">
                  계좌 별명을 입력하세요
                </p>
                <h3 className="mt-2 text-center text-lg font-bold opacity-80">
                  28,637,333원
                </h3>
              </div>
              <ul className="px-1 mt-2 space-y-2 font-medium opacity-70">
                <li className="flex justify-between">
                  <span>출금가능금액</span>
                  <span>8원</span>
                </li>
                <li className="flex justify-between">
                  <span>손익</span>
                  <span>-88,009원</span>
                </li>
                <li className="flex justify-between">
                  <span>수익률</span>
                  <span>-0.30%</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 w-full flex justify-between gap-5">
              <Button variant={"secondary"} className="py-6 w-1/3">
                잔고
              </Button>
              <Button variant={"secondary"} className="py-6 w-1/3">
                거래내역
              </Button>
              <MoneyDialog />
            </div>
          </TabsContent>
          <TabsContent value="product"></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
