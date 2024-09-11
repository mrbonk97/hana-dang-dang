import { MenuSection } from "./_component/menu-section";
import { IndexSection } from "./_component/index-section";
import { NewsSection } from "./_component/news-section";
import { StockSection } from "./_component/stock-section";
import { KospiChart } from "@/components/chart/kospi-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const MainPage = () => {
  return (
    <main className="min-h-full h-full pt-14 pl-[25rem] bg-secondary flex justify-between">
      <section className="p-4 h-full min-w-[672px] max-w-2xl flex flex-col justify-between gap-4">
        <div className="h-2/3">
          <KospiChart title="코스피" code="0001" />
        </div>
        <div className="h-1/3 flex justify-between gap-4">
          <KospiChart title="코스닥" code="1001" />
          <KospiChart title="코스피200" code="2001" />
        </div>
      </section>
      <section className="p-4 pl-0 h-full w-full">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle className="opacity-80">주요 뉴스</CardTitle>
            <CardDescription className="text-right opacity-70">
              <Link href={"/news"}>더보기</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full flex justify-between gap-4">
              <div className="h-full w-full bg-secondary rounded-xl"></div>
              <div className="h-full w-full bg-secondary rounded-xl"></div>
            </div>
            <ul className="mt-10 space-y-4">
              <li className="h-20 w-full rounded-xl bg-secondary"></li>
              <li className="h-20 w-full rounded-xl bg-secondary"></li>
              <li className="h-20 w-full rounded-xl bg-secondary"></li>
              <li className="h-20 w-full rounded-xl bg-secondary"></li>
              <li className="h-20 w-full rounded-xl bg-secondary"></li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default MainPage;

{
  /* <MenuSection mode={mode} setMode={setMode} />
<IndexSection mode={mode} />
<NewsSection mode={mode} /> */
}
