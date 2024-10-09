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
import { Aperture } from "lucide-react";
import Link from "next/link";
import { getBoardMeeting, getDividendStockInfo } from "@/lib/dividend-api";
import { BoardMeeting } from "./_components/board-meeting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StabilityChart } from "./_components/stability-chart";
import { OtherInfoGraph } from "./_components/other-info-graph";

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
    <main className="pt-14 pl-96 min-h-full h-full flex flex-col bg-secondary">
      <section className="px-5 h-20 w-full border-b flex items-center justify-between bg-background">
        <div className="flex items-center gap-5">
          <Image
            src={`/kospi-icons/${imgUrl}.png`}
            width={64}
            height={64}
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
      <Tabs defaultValue="t1" className="h-full w-full">
        <TabsList className="px-5 h-14 grid w-full grid-cols-4 rounded-none border-b bg-background">
          <TabsTrigger
            value="t1"
            className="py-2 data-[state=active]:bg-secondary"
          >
            배당
          </TabsTrigger>
          <TabsTrigger
            value="t2"
            className="py-2 data-[state=active]:bg-secondary"
          >
            안정성
          </TabsTrigger>
          <TabsTrigger
            value="t3"
            className="py-2 data-[state=active]:bg-secondary"
          >
            성장성
          </TabsTrigger>
          <TabsTrigger
            value="t4"
            className="py-2 data-[state=active]:bg-secondary"
          >
            기타
          </TabsTrigger>
        </TabsList>
        <TabsContent value="t1" className="mt-0 p-0 mb-0 bg-secondary">
          <article className="p-5 h-full w-full flex justify-between gap-5">
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
          </article>
          <article className="pt-0 p-5 w-full flex justify-between gap-5">
            <OtherInfoGraph data={otherInfo} />
            <BoardMeeting data={data4.output1} />
          </article>
          <article className="pt-0 p-5 flex gap-5">
            <Card className="h-auto max-w-4xl">
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
                  사이에서 변동했습니다. 2020년 이전에는 354원의 배당금이
                  분기별로 지급되었고, 특별 배당이 1,578원 지급된 사례도
                  있었습니다. 12개월 추적 배당 수익률은 2020년 **1.65%**에서
                  2021년 **4.29%**까지 증가했으며, 2022년과 2023년에는 점차
                  안정적으로 2%대를 유지하고 있습니다.
                </p>
              </CardContent>
            </Card>
            <Button className="h-auto w-40 text-lg">
              <Link
                href={`/stocks/${params.id}`}
                className="flex flex-col gap-5"
              >
                <Aperture size={72} />
                <span>주문하기</span>
              </Link>
            </Button>
          </article>
        </TabsContent>
        <TabsContent
          value="t2"
          className="mt-0 p-7 pb-10 h-[calc(100%-3.5rem)] w-full bg-secondary"
        >
          <article className="p-5 rounded-xl bg-background h-full w-full">
            <h4 className="pl-4 my-2 h-8 text-lg font-bold opacity-70">
              재무안정성
            </h4>
            <div className="mt-5 flex gap-5 justify-between">
              <ul className="flex flex-col gap-5">
                <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                  <span className="font-medium opacity-70">부채비율</span>
                  <p className="text-3xl font-bold opacity-80">
                    {stability.length > 0
                      ? stability[0].lblt_rate + "%"
                      : "정보 없음"}
                  </p>
                </li>
                <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                  <span className="font-medium opacity-70">유동비율</span>
                  <p className="text-3xl font-bold opacity-80">
                    {stability.length > 0
                      ? stability[0].crnt_rate + "%"
                      : "정보 없음"}
                  </p>
                </li>
                <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                  <span className="font-medium opacity-70">차입금의존도</span>
                  <p className="text-3xl font-bold opacity-80">
                    {stability.length > 0
                      ? stability[0].bram_depn + "%"
                      : "정보 없음"}
                  </p>
                </li>
                <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                  <span className="font-medium opacity-70">당좌비율</span>
                  <p className="text-3xl font-bold opacity-80">
                    {stability.length > 0
                      ? stability[0].quck_rate + "%"
                      : "정보 없음"}
                  </p>
                </li>
              </ul>
              <StabilityChart data={stability} />
            </div>
          </article>
        </TabsContent>
        <TabsContent
          value="t3"
          className="mt-0 p-7 pb-10 h-[calc(100%-3.5rem)] bg-secondary"
        >
          <article className="p-5 rounded-xl bg-background h-full w-full">
            <h4 className="pl-4 my-2 h-8 text-lg font-bold opacity-70">가치</h4>
            <ul className="flex flex-col gap-5">
              <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                <span className="font-medium opacity-70">PER</span>
                <p className="text-3xl font-bold opacity-80">{data3.per}</p>
              </li>
              <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                <span className="font-medium opacity-70">PBR</span>
                <p className="text-3xl font-bold opacity-80">{data3.pbr}</p>
              </li>
              <li className="p-2 px-10 pb-5 h-32 w-80 flex flex-col justify-center gap-2 rounded-xl bg-secondary">
                <span className="font-medium opacity-70">결산</span>
                <p className="text-3xl font-bold opacity-80">
                  {data3.stac_month}월
                </p>
              </li>
            </ul>
          </article>
        </TabsContent>
        <TabsContent
          value="t4"
          className="mt-0 h-[calc(100%-3.5rem)] bg-rose-200 w-full"
        ></TabsContent>
      </Tabs>
    </main>
  );
};

export default DividendPage;
