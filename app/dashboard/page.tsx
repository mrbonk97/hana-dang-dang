import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <main className="pt-14 h-full">
      <div className="mt-5 pl-20 pr-[28rem]">
        <section className="flex items-center justify-between">
          <hgroup>
            <h1 className="text-3xl font-bold opacity-80">대시보드</h1>
            <p className="font-medium opacity-60">
              나의 취향에 맞게 커스터마이징이 가능합니다.
            </p>
          </hgroup>
          <div className="flex items-center gap-2">
            <Button variant={"outline"} className="rounded-full">
              대충 달력
            </Button>
            <Button variant={"ghost"}>
              <Settings />
            </Button>
          </div>
        </section>
        <section className="mt-5 flex gap-10 justify-between">
          <Card className="w-1/3 h-60 bg-c1-300">
            <CardHeader>
              <CardTitle className="text-primary-foreground">
                업데이트
              </CardTitle>
            </CardHeader>
            <CardContent className=""></CardContent>
          </Card>
          <Card className="w-1/3 h-60">
            <CardHeader>
              <CardTitle>넷 인컴</CardTitle>
            </CardHeader>
            <CardContent className=""></CardContent>
          </Card>
          <Card className="w-1/3 h-60">
            <CardHeader>
              <CardTitle>토탈 리턴</CardTitle>
            </CardHeader>
            <CardContent className=""></CardContent>
          </Card>
        </section>
        <section className="mt-5 flex justify-between gap-10">
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>거래내역</CardTitle>
              <CardDescription className="text-right">
                <Link href={"/dashboard/transaction"}>더보기</Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-96 min-w-[450px]"></CardContent>
          </Card>
          <div className="w-1/2 flex flex-col gap-10">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>거래내역</CardTitle>
                <CardDescription className="text-right">
                  <Link href={"/dashboard/transaction"}>더보기</Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="min-w-[450px]"></CardContent>
            </Card>
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>거래내역</CardTitle>
                <CardDescription className="text-right">
                  <Link href={"/dashboard/transaction"}>더보기</Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="min-w-[450px]"></CardContent>
            </Card>
          </div>
        </section>
      </div>

      <aside className="fixed -z-10 top-0 right-0 h-full w-96 border-l"></aside>
    </main>
  );
};

export default Dashboard;
