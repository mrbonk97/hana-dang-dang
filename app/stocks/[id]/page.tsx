import { Heart } from "lucide-react";
import { TopInfoSection } from "./_components/top-info-section";
import { StockChart2 } from "./_components/stock-chart2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const StockDetailPage = async ({ params, searchParams }: Props) => {
  return (
    <main className="py-14 pl-[25rem] h-full bg-secondary">
      <TopInfoSection code={params.id} />
      <div className="p-5 w-full flex gap-5">
        <section className="w-full max-w-2xl space-y-5">
          <StockChart2 id={params.id} />
        </section>
        <Card className="min-w-80 border-none shadow-none">
          <CardHeader>
            <CardTitle>호가</CardTitle>
          </CardHeader>
          <CardContent>대충 호가를 보여주는 그래프</CardContent>
        </Card>
        <Card className="min-w-96 border-none shadow-none">
          <CardHeader>
            <CardTitle>주문하기</CardTitle>
          </CardHeader>
          <CardContent>대충 호가를 보여주는 그래프</CardContent>
        </Card>
      </div>
    </main>
  );
};

export default StockDetailPage;
