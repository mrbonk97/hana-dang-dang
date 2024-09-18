"use client";
import { Bannner } from "@/components/banner";
import { BuyerChart } from "@/components/chart/buyer-chart";
import { KospiChart } from "@/components/chart/kospi-chart";
import { ThemeChart } from "@/components/chart/theme-chart";
import { Footer } from "@/components/nav/footer";
import { DataTableDemo } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stockListAPi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StockPage = () => {
  const query = useQuery({
    queryKey: ["stocks"],
    queryFn: stockListAPi,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="pt-14 pl-[24rem]">
        <Bannner />
      </div>
      <main className="pl-[24rem] min-h-[100vh] max-w-[1500px]">
        <section className="p-10 pt-5">
          <hgroup className="flex items-center gap-4">
            <h1 className="mb-1 text-xl font-bold opacity-80">국내 증시</h1>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="mb-0.5 font-medium opacity-60">장 열림</span>
            </div>
          </hgroup>
          <div className="mt-5 flex justify-between gap-5">
            <KospiChart title="코스피" code="0001" />
            <KospiChart title="코스피" code="0001" />
            <KospiChart title="코스피" code="0001" />
            <KospiChart title="코스피" code="0001" />
          </div>
        </section>
        <section className="px-10">
          <hgroup>
            <h1 className="text-xl font-bold opacity-80">주식 목록</h1>
            <p className="text-sm font-medium opacity-60">
              실시간 주가를 확인하실 수 있습니다.
            </p>
          </hgroup>
          <div className="relative mt-5 flex items-center gap-5">
            <Button className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80">
              <h4 className="text-sm">국내 전체</h4>
              <p className="mt-0.5 text-xs opacity-90">
                원하는 주식을 직접 골라보세요
              </p>
            </Button>
            <Button className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80">
              <h4 className="text-sm">저평가 성장주</h4>
              <p className="mt-0.5 text-xs opacity-90">
                앞으로 성장할 저평가된 주식
              </p>
            </Button>
            <Button className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80">
              <h4 className="text-sm">아직 저렴한 가치주</h4>
              <p className="mt-0.5 text-xs opacity-90">
                회사의 순자산 대비 저평가된 주식
              </p>
            </Button>
            <Button className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80">
              <h4 className="text-sm">꾸준한 배당주</h4>
              <p className="mt-0.5 text-xs opacity-90">
                배당을 꾸준히 주는 주식
              </p>
            </Button>
            <div className="z-20 -ml-20 h-24 w-56 flex2 bg-gradient-to-r from-transparent from-10% to-40% to-background">
              <Button
                variant={"outline"}
                className="ml-5 p-0 h-10 w-10 flex2 border rounded-full"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <DataTableDemo
            data={query.data?.data == undefined ? [] : query.data.data}
          />
        </section>
        <section className="pt-5 p-10 flex gap-5">
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-5 w-full bg-transparent flex justify-between items-center">
              <hgroup className="text-primary">
                <h1 className="text-xl font-bold opacity-80">
                  투자자 매매동향
                  <AlertCircle className="mb-0.5 ml-2 inline opacity-60 cursor-pointer" />
                </h1>
                <p className="text-sm font-medium opacity-60">
                  2024.09.13. (전일)
                </p>
              </hgroup>
              <div className="p-1 rounded-md bg-secondary">
                <TabsTrigger value="daily">일간</TabsTrigger>
                <TabsTrigger value="weekly">주간</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="daily" className="pb-20 w-full">
              <BuyerChart />
              <div>
                <div>
                  <h4 className="font-bold opacity-70">외국인</h4>
                  <ul>
                    <li>Lg전자</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="w-full">
              <BuyerChart />
            </TabsContent>
          </Tabs>
        </section>
        <section className="pt-5 p-10 flex gap-5">
          <ThemeChart />
          <Link href={"/stocks/recommend"}>
            <Card className="border flex-shrink-0 w-[17.5rem] h-full hover:bg-secondary duration-300">
              <CardHeader className="opacity-70">
                <CardTitle>주식 추천받기</CardTitle>
                <CardDescription>고객님의 성향에 맞는 주식</CardDescription>
              </CardHeader>
              <CardContent className="py-16 px-0 flex justify-center items-center">
                <Image
                  src="/icons/like.png"
                  alt={"주식추천"}
                  width={128}
                  height={128}
                  className="ml-10"
                />
              </CardContent>
            </Card>
          </Link>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default StockPage;
