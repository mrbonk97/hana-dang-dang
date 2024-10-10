import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getOtherInfoApi,
  getStockInfoApi,
  getStockPriceApi,
  getStockStabilityApi,
} from "@/lib/stock-api";
import Image from "next/image";
import { DividendHistoryCard } from "./_components/dividend-history";
import { formatNumber } from "@/lib/utils";
import { DividendType } from "./_components/dividend-type";
import { DividendYear } from "./_components/dividend-year";
import { Button } from "@/components/ui/button";
import { Aperture, GitCompare } from "lucide-react";
import Link from "next/link";
import { getBoardMeeting, getDividendStockInfo } from "@/lib/dividend-api";
import { BoardMeeting } from "./_components/board-meeting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StabilityChart } from "./_components/stability-chart";
import { OtherInfoGraph } from "./_components/other-info-graph";
import { Footer } from "@/components/nav/footer";
import { Bannner } from "@/components/banner";
import { getIndexListApi } from "@/lib/index-api";

interface Props {
  params: {
    id: string;
  };
}

const DividendPage = async ({ params }: Props) => {
  const imgUrl =
    params.id.charAt(5) != "0" ? params.id.substring(0, 5) + "0" : params.id;

  const data1 = await getDividendStockInfo(params.id);
  const data2 = await getStockInfoApi(params.id);
  const data3 = await getStockPriceApi(params.id);
  const data4 = await getBoardMeeting(params.id);

  const otherInfo = await getOtherInfoApi(params.id);

  const stability = await getStockStabilityApi(params.id);
  const bannerData = await getIndexListApi();

  const chartData = [
    { type: "월간", value: 0 },
    { type: "분기별", value: 0 },
    { type: "반기", value: 0 },
    { type: "연간", value: 0 },
    { type: "12개월 추적분", value: 0 },
    { type: "기타", value: 0 },
    { type: "중간", value: 0 },
    { type: "최종", value: 0 },
    { type: "특별", value: 0 },
  ];

  data1.map((item) => {
    if (item.dividendType == "월간") chartData[0].value++;
    if (item.dividendType == "분기별") chartData[1].value++;
    if (item.dividendType == "반기") chartData[2].value++;
    if (item.dividendType == "연간") chartData[3].value++;
    if (item.dividendType == "12개월 추적분") chartData[4].value++;
    if (item.dividendType == "기타") chartData[5].value++;
    if (item.dividendType == "중간") chartData[6].value++;
    if (item.dividendType == "최종") chartData[7].value++;
    if (item.dividendType == "특별") chartData[8].value++;
  });

  return (
    <main className="pt-14 pl-96 min-h-full flex flex-col bg-secondary">
      <section className="px-5 h-20 w-full border-b flex items-center justify-between bg-background flex-shrink-0">
        <div className="flex items-center gap-5">
          <Image
            src={`/kospi-icons/${imgUrl}.png`}
            width={48}
            height={48}
            alt={params.id}
            className="rounded-xl overflow-hidden"
          />
          <hgroup className="h-full flex flex-col justify-center font-bold">
            <h1 className="text-lg opacity-70">{data2.output.prdt_name}</h1>
            <h3 className="text-sm opacity-50">
              {data2.output.std_idst_clsf_cd_name}
            </h3>
          </hgroup>
        </div>
        <div className="pr-5 font-bold opacity-70">
          <div>현재가: {formatNumber(data3.stck_prpr)}원</div>
          <div className="pt-1">
            전일대비: {formatNumber(data3.prdy_vrss)}원
          </div>
        </div>
      </section>

      <section className="p-10 h-full w-full flex justify-between gap-10">
        <DividendHistoryCard data={data1} />
        <div className="h-auto w-full flex flex-col justify-between gap-5">
          <Card className="bg-c1-300 text-primary-foreground flex-shrink-0">
            <CardHeader>
              <CardTitle>배당 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-medium">
                <span>연간 배당수익률</span>
                <span className="ml-2 text-3xl font-bold">
                  {data1.length > 0
                    ? data1[0].yieldPercentage + "%"
                    : "배당 정보가 없습니다"}
                </span>
              </h2>
            </CardContent>
          </Card>
          <DividendType chartData={chartData} />
          <DividendYear data={data1} />
        </div>
      </section>

      <article className="pt-0 p-10 w-full flex justify-between gap-10">
        <OtherInfoGraph
          data={
            params.id == "086790"
              ? 28.6
              : otherInfo[0]
              ? parseInt(otherInfo[0].payout_rate)
              : 0
          }
        />
        <BoardMeeting data={data4.output1} />
      </article>

      <section className="p-10 pt-0">
        <StabilityChart data={stability} />
      </section>
      <section className="p-10 pt-0 flex gap-5">
        <Card className="h-auto w-full">
          <CardHeader>
            <CardTitle className="opacity-80">AI요약</CardTitle>
            <CardDescription>배당 정보를 요약해드립니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-10 items-center">
            <Image
              src={"/icons/green-robot.png"}
              width={128}
              height={128}
              alt="robot"
            />
            <p className="pb-5 max-w-2xl text-sm font-medium leading-relaxed opacity-80">
              요약하면, 각 기간 동안 동일하게 361원의 분기 배당금이
              지급되었으며, 연도와 분기별로 배당 수익률은 1.76%에서 2.73%
              사이에서 변동했습니다. 2020년 이전에는 354원의 배당금이 분기별로
              지급되었고, 특별 배당이 1,578원 지급된 사례도 있었습니다. 12개월
              추적 배당 수익률은 2020년 **1.65%**에서 2021년 **4.29%**까지
              증가했으며, 2022년과 2023년에는 점차 안정적으로 2%대를 유지하고
              있습니다.
            </p>
          </CardContent>
        </Card>
        <Button className="ml-5 h-auto w-40 text-lg flex-shrink-0">
          <Link href={`/stocks/${params.id}`} className="flex flex-col gap-5">
            <Aperture size={72} />
            <span>주문하기</span>
          </Link>
        </Button>
        <Button className="h-auto w-40 text-lg flex-shrink-0 bg-blue-500 hover:bg-blue-400">
          <Link
            href={`/dividend/compare?e1=${params.id}`}
            className="flex flex-col gap-5"
          >
            <GitCompare size={72} />
            <span>비교하기</span>
          </Link>
        </Button>
      </section>
      <Bannner data={bannerData} className="mt-10 bg-background" />
      <Footer className="bg-background" />
    </main>
  );
};

export default DividendPage;
