import { Bannner } from "@/components/banner";
import { Footer } from "@/components/nav/footer";
import { StockListTable } from "@/app/(domestic)/stocks/_component/data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIndexDataApi, getIndexListApi } from "@/lib/index-api";
import { getStockListRankApi } from "@/lib/stock-api";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuyerChart } from "./_component/buyer-chart";
import { KospiChart } from "./_component/kospi-chart";

const StockPage = async () => {
  const stockRank = await getStockListRankApi();
  const bannerData = await getIndexListApi();

  const kospi = await getIndexDataApi("0001");
  const kosdaq = await getIndexDataApi("1001");
  const kospi200 = await getIndexDataApi("2001");
  const gobaedang = await getIndexDataApi("0163");

  return (
    <main className="pt-14 pl-[24rem]">
      <Bannner data={bannerData} />
      <section className="pt-5 p-10 w-[1200px]">
        <hgroup className="flex items-center gap-4">
          <h1 className="mb-1 text-xl font-bold opacity-80">국내 증시</h1>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="mb-0.5 font-medium opacity-60">장 열림</span>
          </div>
        </hgroup>
        <div className="mt-5 h-48 flex justify-between gap-10">
          <KospiChart data={kospi} />
          <KospiChart data={kosdaq} />
          <KospiChart data={kospi200} />
          <KospiChart data={gobaedang} />
        </div>
      </section>
      <section className="pt-5 p-10 w-[1200px]">
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
            <p className="mt-0.5 text-xs opacity-90">배당을 꾸준히 주는 주식</p>
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
        <StockListTable data={stockRank} />
      </section>
      <section className="pt-5 p-10 w-[1200px]">
        <Card className="border">
          <CardHeader>
            <CardTitle>투자자 매매동향</CardTitle>
            <CardDescription> 2024.09.26. (전일)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="flex justify-between">
                <TabsTrigger className="w-full" value="daily">
                  일간
                </TabsTrigger>
                <TabsTrigger className="w-full" value="weekly">
                  주간
                </TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <div className="w-[500px]">
                  <BuyerChart
                    b1={-10893}
                    b2={4342}
                    b3={5367}
                    marginValue={2000}
                  />
                </div>
              </TabsContent>
              <TabsContent value="weekly">
                <div className="w-[500px]">
                  <BuyerChart
                    b1={-29017}
                    b2={6386}
                    b3={20392}
                    marginValue={5000}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
};

export default StockPage;
