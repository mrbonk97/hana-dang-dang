import { TopInfoSection } from "./_components/top-info-section";
import { StockChart2 } from "./_components/stock-chart2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuyCard } from "./_components/maesu-card";
import { Bannner } from "@/components/banner";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const StockDetailPage = ({ params, searchParams }: Props) => {
  return (
    <div className="pt-14 pl-[24rem] min-h-[800px] h-full bg-secondary">
      <TopInfoSection code={params.id} />
      <main className="h-[calc(100%-4rem)] flex flex-col justify-between min-w-[1400px] max-w-[1500px]">
        <section className="p-5 h-full w-full flex gap-5 justify-between">
          <div className="w-1/2 flex flex-col gap-5 justify-between">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>차트</CardTitle>
              </CardHeader>
              <CardContent>
                <StockChart2 id={params.id} />
              </CardContent>
            </Card>
            <div className="h-full w-full flex gap-5">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>차트</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>차트</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
          <Card className="w-1/4">
            <CardHeader>
              <CardTitle>호가</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <BuyCard />
        </section>
        <Bannner />
      </main>
    </div>
  );
};

export default StockDetailPage;
