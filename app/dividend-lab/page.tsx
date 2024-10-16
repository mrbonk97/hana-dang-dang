"use client";
import { Button } from "@/components/ui/button";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import Image from "next/image";
import Link from "next/link";
import { NotLoggedInPage } from "./_components/not-logged-in";
import { useMutation } from "@tanstack/react-query";
import {
  getAccountDividendHistoryApi,
  getAccountStockApi,
} from "@/lib/account-api";
import { Settings } from "lucide-react";
import { Chart5 } from "./_components/chart-5";
import { Chart4 } from "./_components/chart-4";
import { Chart2 } from "./_components/chart-2";
import { AccountDividend } from "./_components/account-dividend";
import { Chart1 } from "./_components/chart-1";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner/spinner";
import { useEffect } from "react";
import { Chart3 } from "./_components/chart-3";

const DividendLabPage = () => {
  const year2024 = new Date("2024-01-01");
  const router = useRouter();
  const selector = createSelectors(store).use;
  const account = selector.account();
  const user = selector.user();

  const mutate1 = useMutation({
    mutationFn: (accountNo: string) => getAccountStockApi(accountNo),
  });

  const mutate2 = useMutation({
    mutationFn: (accountNo: string) => getAccountDividendHistoryApi(accountNo),
  });

  useEffect(() => {
    if (account == null) return;
    if (user == null) return;
    if (!user.isDividendCreated) {
      router.push("/dividend-lab/onboarding");
      return;
    }

    mutate1.mutate(account.accountNo);
    mutate2.mutate(account.accountNo);
  }, [user, router, mutate1, mutate2]);

  if (account == null || user == null) return <NotLoggedInPage />;

  if (
    !user.isDividendCreated ||
    mutate2.isPending ||
    !mutate2.isSuccess ||
    mutate2.data == undefined
  ) {
    return (
      <main className="h-full flex2">
        <Spinner />
      </main>
    );
  }

  let totalDividend = 0;

  const chartData1 = [
    { month: "1월", amount: 0 },
    { month: "2월", amount: 0 },
    { month: "3월", amount: 0 },
    { month: "4월", amount: 0 },
    { month: "5월", amount: 0 },
    { month: "6월", amount: 0 },
    { month: "7월", amount: 0 },
    { month: "8월", amount: 0 },
    { month: "9월", amount: 0 },
    { month: "10월", amount: 0 },
    { month: "11월", amount: 0 },
    { month: "12월", amount: 0 },
  ];

  const chartData2 = [
    { date: "2024-01-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-02-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-03-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-04-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-05-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-06-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-07-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-08-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-09-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-10-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-11-01", amount: 0, goal: user.dividendGoal },
    { date: "2024-12-01", amount: 0, goal: user.dividendGoal },
  ];

  mutate2.data.forEach((item) => {
    const date = new Date(item.createdAt);
    if (date < year2024) return;
    totalDividend += item.amount;
    chartData1[date.getMonth() + 1].amount += item.amount;
  });

  for (let i = 0; i < 12; i++) {
    for (let j = i; j < 12; j++) {
      chartData2[j].amount += chartData1[i].amount;
    }
  }

  const tdp = Math.round((totalDividend / user.dividendGoal) * 100);

  return (
    <main className="pt-14 pl-16 min-h-[800px] font-bold">
      <section className="pt-2 px-5 flex justify-between items-end">
        <hgroup>
          <h1 className="opacity-70">대시보드</h1>
          <h1 className="text-xl opacity-80">배당연구소</h1>
        </hgroup>
        <Button className="p-0 m-0 h-9 w-9">
          <Settings />
        </Button>
      </section>
      <section className="p-5 h-[500px] flex gap-5">
        <div className="w-[650px] flex flex-col justify-between gap-5 flex-shrink-0">
          <article className="relative p-5 h-96 flex-shrink-0 bg-c1-300/60 border rounded-xl flex items-center justify-evenly overflow-hidden">
            <Image
              className="-z-10 absolute"
              src={"/images/7086844.jpg"}
              alt="bg"
              width={650}
              height={600}
            />
            <hgroup className="mb-5 text-lg space-y-1 text-primary-foreground">
              <p>축하드립니다.</p>
              <p className="text-xl">벌써 목표치에 {tdp}% 도달했어요</p>
              <div className="pt-2 text-sm opacity-70 font-medium">
                남은 기간동안 꾸준하게 배당금을 모아서 목표를 달성해보세요
              </div>
            </hgroup>
            <Chart5 goal={user.dividendGoal} totalDividend={totalDividend} />
          </article>
          <div className="h-full w-full rounded-xl bg-secondary border" />
        </div>
        <Chart4 data={chartData2} />
      </section>
      <section className="pt-0 p-5 w-full">
        <Chart2
          isPending={mutate1.isPending}
          isSuccess={mutate1.isSuccess}
          data={mutate1.data}
        />
        {/* 포트폴리오 */}
      </section>
      <section className="pt-0 p-5 w-full flex gap-5 justify-between">
        <AccountDividend
          isPending={mutate2.isPending}
          isSuccess={mutate2.isSuccess}
          data={mutate2.data}
        />
        <Chart1
          isPending={mutate2.isPending}
          isSuccess={mutate2.isSuccess}
          data={chartData1}
        />
      </section>
      <section className="pt-0 p-5 w-full flex gap-5">
        <Chart3
          isPending={mutate2.isPending}
          isSuccess={mutate2.isSuccess}
          data={mutate2.data}
        />
        <Button
          className="p-0 h-80 w-80 flex-shrink-0 justify-between flex flex-col items-center"
          variant={"outline"}
          asChild
        >
          <Link href={"/dividend-lab/diagnosis"}>
            <h4 className="pt-10 text-lg font-bold opacity-80">
              포트폴리오 조정하기
            </h4>
            <Image
              src={"/images/buisness-man.png"}
              alt="buisness-man"
              width={192}
              height={192}
            />
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default DividendLabPage;
