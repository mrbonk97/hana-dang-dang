"use client";
import { Button } from "@/components/ui/button";
import {
  getAccountDividendEstimate,
  getAccountMonthlyDividendEstimate,
} from "@/lib/account-api";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";
import { EstimateTable } from "./_components/estimate-table";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { EstimateChart } from "./_components/estimate-chart";
import { Slider } from "@/components/ui/slider";
import { TotalEstimateRadial } from "./_components/total-estimate-radial";
import { useRouter } from "next/navigation";
import { NotLoggedInCard } from "@/components/not-logged-in-card";
import { AddStockDialog } from "@/components/dialog/add-stock-dialog";

const DiagnosisPage = () => {
  const [stockList, setStockList] = useState([]);

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const selector = createSelectors(store).use;
  const account = selector.account();
  const user = selector.user();
  const [chartData, setChartData] = useState([
    { month: "1월", es: 0, aim: 0, limit: 2000000 },
    { month: "2월", es: 0, aim: 0, limit: 2000000 },
    { month: "3월", es: 0, aim: 0, limit: 2000000 },
    { month: "4월", es: 0, aim: 0, limit: 2000000 },
    { month: "5월", es: 0, aim: 0, limit: 2000000 },
    { month: "6월", es: 0, aim: 0, limit: 2000000 },
    { month: "7월", es: 0, aim: 0, limit: 2000000 },
    { month: "8월", es: 0, aim: 0, limit: 2000000 },
    { month: "9월", es: 0, aim: 0, limit: 2000000 },
    { month: "10월", es: 0, aim: 0, limit: 2000000 },
    { month: "11월", es: 0, aim: 0, limit: 2000000 },
    { month: "12월", es: 0, aim: 0, limit: 2000000 },
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

  const mutation1 = useMutation({
    mutationFn: (accountNo: string) =>
      getAccountMonthlyDividendEstimate(accountNo),
    onSuccess: (e) => {
      const _chartData = [...chartData];
      let _total = 0;
      e.forEach((item) => {
        _total += item.estimateProfit;
        const date = new Date(item.lockDate);
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
      setTotal(_total);
    },
  });

  const mutation2 = useMutation({
    mutationFn: (accountNo: string) => getAccountDividendEstimate(accountNo),
    onSuccess: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (account == null) return;
    mutation1.mutate(account.accountNo);
    mutation2.mutate(account.accountNo);
  }, [account]);

  if (account == null || user == null) return <NotLoggedInCard />;

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
                      return (
                        <span
                          className="text-c1-300"
                          key={`no-div-${item.month}`}
                        >
                          {item.month}{" "}
                        </span>
                      );
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
        <EstimateTable
          isPending={mutation2.isPending}
          isSuccess={mutation2.isSuccess}
          data={mutation2.data}
        />
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
        <TotalEstimateRadial data={chartData} goal={user.dividendGoal} />
        <AddStockDialog>
          <Button className="py-6 w-full">추가하기</Button>
        </AddStockDialog>
        <ul className="mt-5 space-y-3 h-[440px] w-full overflow-y-auto">
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
          <li className="h-32 w-full rounded-xl bg-secondary">삼성</li>
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
