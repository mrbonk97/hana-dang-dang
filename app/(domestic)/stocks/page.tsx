import { Bannner } from "@/components/banner";
import { Footer } from "@/components/nav/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIndexDataApi, getIndexListApi } from "@/lib/index-api";
import { getStockListApi, getStockListRankApi } from "@/lib/stock-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuyerChart } from "./_component/buyer-chart";
import { KospiChart } from "./_component/kospi-chart";
import { StockListTable } from "./_component/stock-list-table";
import { StockRankTable } from "./_component/stock-rank-table";

const StockPage = async () => {
  const bannerData = await getIndexListApi();
  const rankDefaultData = await getStockListRankApi("vol");
  const stockListDefaultData = await getStockListApi(0);

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
            <div className={`h-2 w-2 rounded-fullbg-green-400`} />
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
      <section className="pt-5 p-10 flex gap-10 w-[1200px]">
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
      <StockRankTable defaultData={rankDefaultData} />
      <section className="pt-5 p-10 w-[1200px]">
        <hgroup className="mb-10">
          <h1 className="text-xl font-bold opacity-80">주식 목록</h1>
          <p className="text-sm font-medium opacity-60">
            전일 종가기준 목록입니다
          </p>
        </hgroup>
        <StockListTable defaultData={stockListDefaultData} />
      </section>
      <Footer />
    </main>
  );
};

export default StockPage;
