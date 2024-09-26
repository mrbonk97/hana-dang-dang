"use client";
import { Chart1 } from "./_components/chart-1";
import { Chart2 } from "./_components/chart-2";
import { Button } from "@/components/ui/button";
import { Chart4 } from "./_components/chart-4";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { Chart3 } from "./_components/chart-3";
import { Chart5 } from "./_components/chart-5";
import Image from "next/image";
import { DatePicker } from "@/components/date-picker";
import { ArrowUpRight, Settings } from "lucide-react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const StartPage = () => {
  const selector = createSelectors(store).use;
  const user = selector.user();
  return (
    <main className="pt-14 pl-16 h-full min-h-[800px] font-bold">
      <section className="pt-2 px-5 flex justify-between items-end">
        <hgroup>
          <h1 className="opacity-70">대시보드</h1>
          <h1 className="text-xl opacity-80">배당연구소</h1>
        </hgroup>
        <div className="flex gap-2">
          <DatePicker />
          <Button className="p-0 m-0 h-9 w-9">
            <Settings />
          </Button>
        </div>
      </section>
      <section className="p-5 flex gap-5">
        <div className="w-[650px] flex flex-col justify-between gap-5 flex-shrink-0">
          <article className="relative p-5 h-60 flex-shrink-0 bg-c1-300/60 border rounded-xl flex items-center justify-evenly overflow-hidden">
            <Image
              className="-z-10 absolute"
              src={"/images/7086844.jpg"}
              alt="bg"
              width={650}
              height={600}
            />
            <hgroup className="mb-5 text-lg space-y-1 text-primary-foreground">
              <p>축하드립니다.</p>
              <p className="text-xl">벌써 목표치에 80% 도달했어요</p>
              <div className="pt-2 text-sm opacity-70 font-medium">
                남은 기간동안 꾸준하게 배당금을 모아서 목표를 달성해보세요
              </div>
            </hgroup>
            <Chart5 />
          </article>
          <div className="h-full w-full rounded-xl bg-secondary border" />
        </div>
        <Chart4 />
      </section>
      <section className="pt-0 p-5 flex gap-5">
        <Card className="h-[450px] w-1/3 border flex-shrink-0">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>배당내역</CardTitle>
              <CardDescription>최근 10건까지 표시 됩니다.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                전체 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
              <li>JEPI 배당 받은 내역 확인</li>
            </ul>
          </CardContent>
        </Card>
        <Chart2 />
        <article className="h-[450px] w-full flex flex-col justify-between gap-5">
          <Button
            className="h-80 w-full flex flex-col justify-center gap-10 flex-shrink-0 hover:bg-background"
            variant={"outline"}
          >
            <span className="text-lg font-bold opacity-80">종목추천받기</span>
            <Image
              src={"/icons/ratings.gif"}
              width={192}
              height={192}
              alt="recommend"
            />
          </Button>
          <div className="h-full w-full rounded-xl bg-secondary border" />
        </article>
      </section>
      <section className="p-5 pt-0 w-full flex justify-between gap-5">
        <Card className="border">
          <CardHeader className="opacity-80">
            <CardTitle>배당 일정</CardTitle>
            <CardDescription>
              다가오는 배당 일정을 알려드립니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <Calendar />
          </CardContent>
          <CardFooter>
            <ul className="text-xs">
              <li>1. 2024.09.24 SK하이닉스</li>
            </ul>
          </CardFooter>
        </Card>
        <Card className="w-full border">
          <CardHeader>
            <CardTitle>월별 배당금</CardTitle>
          </CardHeader>
          <CardContent className="mt-5 w-full flex2">
            <Chart1 />
          </CardContent>
          <CardFooter className="justify-center">
            이번달 배당금이 132,000원 누적되었습니다.
          </CardFooter>
        </Card>
        <Chart3 />
      </section>
      <section className="p-5 pt-0 w-full">
        <Button
          className="p-0 h-80 w-80 justify-between flex flex-col items-center"
          variant={"outline"}
        >
          <h4 className="pt-10 text-lg font-bold opacity-80">
            포트폴리오 진단하기
          </h4>
          <Image
            src={"/images/buisness-man.png"}
            alt="buisness-man"
            width={192}
            height={192}
          />
        </Button>
      </section>
    </main>
  );
};

export default StartPage;
