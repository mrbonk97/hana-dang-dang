"use client";
import { CircleChart } from "@/components/chart/circlular/circle-chart";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

const DiagnosisPage = () => {
  const [isloaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  if (!isloaded) return <LoadingPage />;

  return (
    <main className="py-20 px-[20%] min-h-full flex items-center flex-col gap-10">
      <Card className="w-full bg-c1-300 text-primary-foreground">
        <CardHeader>
          <CardTitle className="opacity-70">총 자산</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold">10,000,000원</h2>
        </CardContent>
      </Card>
      <div className="w-full flex gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>자산 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <CircleChart />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>자산 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-lg font-medium opacity-80">
              <li>삼성전자 34%</li>
              <li>애플 32%</li>
              <li>abc 32%</li>
              <li>몰라 32%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full h-80 overflow-hidden">
        <CardHeader>
          <CardTitle>가치 뭐시기</CardTitle>
        </CardHeader>
        <CardContent>
          <CircleChart />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>성향분석</CardTitle>
          <CardContent>대충 공격적인 성향입니다.</CardContent>
        </CardHeader>
      </Card>
      <Button className="py-10 w-full" asChild>
        <Link href={"/mix/preference"}>섞으러 가기</Link>
      </Button>
    </main>
  );
};

export default DiagnosisPage;

const LoadingPage = () => (
  <main className="pt-14 h-full flex2 flex-col gap-10">
    <Spinner />
    <span className="font-medium opacity-80">
      고객님의 계좌를 확인하고 있습니다.
    </span>
  </main>
);
