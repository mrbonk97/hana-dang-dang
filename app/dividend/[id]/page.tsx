import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStockInfoApi, getStockPriceApi } from "@/lib/stock-api";
import Image from "next/image";
import { DividendHistoryCard } from "./_components/dividend-history";
import { formatNumber } from "@/lib/utils";
import { DividendType } from "./_components/dividend-type";
import { DividendYear } from "./_components/dividend-year";
import { Footer } from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import { Aperture } from "lucide-react";
import Link from "next/link";
import { getBoardMeeting, getDividendStockInfo } from "@/lib/dividend-api";
import { BoardMeeting } from "./_components/board-meeting";

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

  let count = 0;
  let totalPercentage = 0;

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

    if (item.lockDate.substring(0, 4) == "2024") {
      totalPercentage += item.yieldPercentage;
      count++;
    }
  });

  return (
    <main className="pt-14 pl-96 min-h-full bg-secondary">
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
        <div className="flex items-center gap-10">
          <div className="text-lg font-medium">
            <div>현재가: {formatNumber(data3.stck_prpr)}원</div>
            <div className="pt-2">
              전일대비: {formatNumber(data3.prdy_vrss)}원
            </div>
          </div>
          <div className="text-lg font-medium">
            <div>PER: {data3.per}</div>
            <div className="pt-2">PBR: {data3.pbr}</div>
          </div>
          <div className="text-lg font-medium">
            <div>결산</div>
            <div className="pt-2">{data3.stac_month}월</div>
          </div>
        </div>
      </section>
      <section className="p-5 h-[780px] w-full flex gap-5">
        <DividendHistoryCard data={data1} />
        <div className="w-full flex flex-col justify-between gap-5">
          <Card className="bg-c1-300 text-primary-foreground">
            <CardHeader>
              <CardTitle>배당 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-medium">
                <span>연간 배당수익률</span>
                <span className="ml-2 text-3xl font-bold">
                  {(totalPercentage / count).toFixed(2)}%
                </span>
              </h2>
            </CardContent>
          </Card>
          <DividendType chartData={chartData} />
          <DividendYear data={data1} />
        </div>
      </section>
      <section className="pt-0 p-5 flex justify-between gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="opacity-80">AI요약</CardTitle>
            <CardDescription>배당 정보를 요약해드립니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-10">
            <Image
              src={"/icons/green-robot.png"}
              width={128}
              height={128}
              alt="robot"
            />
            <p className="max-w-xl font-medium leading-relaxed opacity-80">
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
        <Button
          className="h-auto flex-shrink-0 w-40 text-xl font-bold flex flex-col gap-5"
          asChild
        >
          <Link href={`/stocks/${params.id}`}>
            주문하기
            <Aperture size={48} />
          </Link>
        </Button>
      </section>
      <section className="pt-0 p-5 w-full">
        <BoardMeeting data={data4.output1} />
      </section>
      <Footer />
    </main>
  );
};

export default DividendPage;
