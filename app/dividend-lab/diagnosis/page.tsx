"use client";
import { Button } from "@/components/ui/button";
import {
  getAccountDividendEstimate,
  getAccountMonthlyDividendEstimate,
} from "@/lib/account-api";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";
import { EstimateTable } from "./_components/estimate-table";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { EstimateChart } from "./_components/estimate-chart";
import { Slider } from "@/components/ui/slider";
import { TotalEstimateRadial } from "./_components/total-estimate-radial";
import { useRouter } from "next/navigation";

const DiagnosisPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const selector = createSelectors(store).use;
  const account = selector.account();
  const [chartData, setChartData] = useState([
    { month: "1월", es: 0, aim: 100, limit: 2000000 },
    { month: "2월", es: 0, aim: 100, limit: 2000000 },
    { month: "3월", es: 0, aim: 100, limit: 2000000 },
    { month: "4월", es: 0, aim: 100, limit: 2000000 },
    { month: "5월", es: 0, aim: 55, limit: 2000000 },
    { month: "6월", es: 0, aim: 100, limit: 2000000 },
    { month: "7월", es: 0, aim: 10, limit: 2000000 },
    { month: "8월", es: 0, aim: 20, limit: 2000000 },
    { month: "9월", es: 0, aim: 30, limit: 2000000 },
    { month: "10월", es: 0, aim: 20, limit: 2000000 },
    { month: "11월", es: 0, aim: 10, limit: 2000000 },
    { month: "12월", es: 0, aim: 30, limit: 2000000 },
  ]);

  const handleChartData = (idx: number, value: number) => {
    const _chartData = [...chartData];
    _chartData[idx].aim = value * 10000;
    setChartData(_chartData);
  };

  const handleNextButton = () => {
    if (step < 2) setStep((cur) => cur + 1);
    if (step == 2) {
      let url = "/dividend-lab/diagnosis/result/?";
      chartData.forEach((item, idx) => {
        const s = `m${idx + 1}=${item.aim}&`;
        url = url + s;
      });
      router.push(url);
    }
  };

  if (account == null)
    return (
      <main className="pt-14 pl-16 h-full flex2 flex-col gap-2 font-medium opacity-80">
        로그인이 필요한 서비스입니다.
        <Button variant={"link"} asChild>
          <Link href={"/sign-in"}>로그인</Link>
        </Button>
      </main>
    );

  const query2 = useQuery({
    queryKey: ["account", "dividend-estimate-monthly", account.accountNo],
    queryFn: () => getAccountMonthlyDividendEstimate(account.accountNo),
  });

  const query3 = useQuery({
    queryKey: ["account", "estimate-profit", account.accountNo],
    queryFn: () => getAccountDividendEstimate(account.accountNo),
  });

  let total = 0;
  if (query3.isSuccess && query3.data != undefined)
    query3.data.forEach((item) => (total += item.estimateProfit));

  useEffect(() => {
    if (query2.isSuccess) {
      const _chartData = [...chartData];
      query2.data.forEach((item) => {
        const date = new Date(item.declareDate);
        if (date.getMonth() == 0) _chartData[0].es += item.estimateProfit;
        if (date.getMonth() == 1) _chartData[1].es += item.estimateProfit;
        if (date.getMonth() == 2) _chartData[2].es += item.estimateProfit;
        if (date.getMonth() == 3) _chartData[3].es += item.estimateProfit;
        if (date.getMonth() == 4) _chartData[4].es += item.estimateProfit;
        if (date.getMonth() == 5) _chartData[5].es += item.estimateProfit;
        if (date.getMonth() == 6) _chartData[6].es += item.estimateProfit;
        if (date.getMonth() == 7) _chartData[7].es += item.estimateProfit;
        if (date.getMonth() == 8) _chartData[8].es += item.estimateProfit;
        if (date.getMonth() == 9) _chartData[9].es += item.estimateProfit;
        if (date.getMonth() == 10) _chartData[10].es += item.estimateProfit;
        if (date.getMonth() == 11) _chartData[11].es += item.estimateProfit;
        if (date.getMonth() == 12) _chartData[12].es += item.estimateProfit;
      });
      setChartData(_chartData);
    }
  }, [query2.isSuccess]);

  return (
    <main className="pt-14 pl-16 h-full min-h-[900px] min-w-[1500px] w-full relative overflow-hidden">
      <hgroup className="p-5">
        <h1 className="text-lg font-bold opacity-80">포트폴리오 진단하기</h1>
      </hgroup>

      <div
        className={`absolute h-40 flex justify-center gap-10 duration-1000 transition-all
          ${
            step < 2
              ? "left-1/2 -translate-x-1/2 top-32"
              : "left-20 translate-x-0 top-[700px]"
          }
      
        `}
      >
        <article className="flex items-center gap-5">
          <Image
            src={"/icons/professor.png"}
            alt="professor"
            width={192}
            height={192}
            className="flex-shrink-0"
          />
          <hgroup className="relative px-5 pb-4 h-40 w-[500px] flex flex-col justify-center border bg-secondary rounded-xl text-lg font-bold">
            {step == 0 && (
              <>
                <p className="text-sm font-medium opacity-60">2023년 기준</p>
                <p>
                  현재 예상되는 배당금 총 액수는{" "}
                  <strong className="text-2xl text-c1-300">
                    {formatNumber(total)}
                  </strong>
                  원 입니다.
                </p>
              </>
            )}
            {step == 1 && (
              <>
                <p className="text-sm font-medium opacity-60">2023년 기준</p>
                <p>
                  배당금이 없는 달은{" "}
                  {chartData.map((item) => {
                    if (item.es == 0)
                      return <span className="text-c1-300">{item.month} </span>;
                  })}
                  입니다.
                </p>
              </>
            )}
            {step == 2 && <p>선호에 맞게 배당금을 조정해주세요</p>}
            <div className="-z-10 absolute h-10 w-10 rotate-45 -left-5 bg-secondary border" />
          </hgroup>
        </article>
        <Button
          className="pr-2 h-40 w-40 font-bold rounded-xl  text-orange-500 text-2xl gap-1 hover:text-orange-400"
          variant={"outline"}
          onClick={handleNextButton}
        >
          다음
          <ArrowBigRight size={48} />
        </Button>
      </div>

      <article
        className={`absolute top-[21rem] duration-1000
          ${step == 0 && "left-1/2 -translate-x-1/2"}
          ${step > 0 && "-left-full"}`}
      >
        <EstimateTable data={query3.data} />
      </article>
      <article
        className={`absolute duration-1000
            ${step == 0 && "top-[21rem] left-full"}
            ${step == 1 && "top-[21rem] left-[calc(50%+1rem)] -translate-x-1/2"}
            ${step == 2 && "delay-500 left-28 top-40"}
            `}
      >
        <EstimateChart data={chartData} />
      </article>
      <article
        className={`absolute p-5 pt-0 top-40 h-[700px] w-96 duration-1000 delay-1200 border rounded-xl
            ${step < 2 ? "left-full" : "left-[1100px]"}
            `}
      >
        <TotalEstimateRadial data={chartData} goal={8000000} />
        <ul className="space-y-3">
          <List title={"1월"} idx={0} onChange={handleChartData} />
          <List title={"2월"} idx={1} onChange={handleChartData} />
          <List title={"3월"} idx={2} onChange={handleChartData} />
          <List title={"4월"} idx={3} onChange={handleChartData} />
          <List title={"5월"} idx={4} onChange={handleChartData} />
          <List title={"6월"} idx={5} onChange={handleChartData} />
          <List title={"7월"} idx={6} onChange={handleChartData} />
          <List title={"8월"} idx={7} onChange={handleChartData} />
          <List title={"9월"} idx={8} onChange={handleChartData} />
          <List title={"10월"} idx={9} onChange={handleChartData} />
          <List title={"11월"} idx={10} onChange={handleChartData} />
          <List title={"12월"} idx={11} onChange={handleChartData} />
        </ul>
      </article>
    </main>
  );
};

export default DiagnosisPage;

interface ListProps {
  title: string;
  idx: number;
  onChange: (idx: number, value: number) => void;
}

const List = ({ title, idx, onChange }: ListProps) => {
  return (
    <li className="flex items-center gap-2">
      <span className="w-10 flex-shrink-0 font-medium opacity-80 text-right">
        {title}
      </span>
      <Slider
        defaultValue={[0]}
        max={200}
        step={1}
        onValueCommit={(e) => onChange(idx, e[0])}
      />
    </li>
  );
};
