import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ExchangeRank = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="opacity-80">국내 투자자별 거래 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy">
          <TabsList>
            <TabsTrigger value="buy">매수</TabsTrigger>
            <TabsTrigger value="sell">매도</TabsTrigger>
          </TabsList>
          <TabsContent value="buy" className="h-80">
            <div className="flex justify-between gap-4">
              <Content title="외국인" />
              <Content title="기관" />
              <Content title="개인" />
            </div>
          </TabsContent>
          <TabsContent value="sell" className="h-80">
            <div className="flex justify-between gap-4">
              <Content title="기관" />
              <Content title="개인" />
              <Content title="외국인" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ContentProps {
  title: string;
}

const Content = ({ title }: ContentProps) => {
  return (
    <section className="p-2 h-full w-1/3">
      <h4 className="font-bold text-lg opacity-70">{title}</h4>
      <ul className="mt-5 space-y-4">
        <List idx={1} title="SK하이닉스" />
        <List idx={2} title="현대차" />
        <List idx={3} title="아모레퍼시픽" />
        <List idx={4} title="기아" />
        <List idx={5} title="두산" />
      </ul>
    </section>
  );
};

interface ListProps {
  idx: number;
  title: string;
}

const List = ({ idx, title }: ListProps) => {
  return (
    <li className="pr-2 flex justify-between font-bold opacity-70">
      <div>
        <span className="text-c1-300">{idx}</span>
        <span className="ml-4">{title}</span>
      </div>
      <span>795억</span>
    </li>
  );
};
