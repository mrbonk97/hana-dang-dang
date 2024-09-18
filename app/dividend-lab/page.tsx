import { Leftnav } from "@/components/nav/left-nav";
import { Topnav } from "@/components/nav/top-nav";
import { Chart1 } from "./_components/chart-1";
import { Chart2 } from "./_components/chart-2";
import { Button } from "@/components/ui/button";
import { Chart3 } from "./_components/chart-3";
import { Chart4 } from "./_components/chart-4";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StartPage = () => {
  return (
    <>
      <Leftnav />
      <Topnav />
      <main className="pt-14 pl-20 h-full min-h-[100vh]">
        <section className="p-10 h-full flex justify-between gap-5">
          <div className="p-5 h-full w-[600px] flex flex-col items-center bg-background border rounded-xl">
            <h1 className="mt-5 text-lg font-bold opacity-70">
              안녕하세요, 김현석님
            </h1>
            <h2 className="mt-1 text-2xl font-bold opacity-80">
              현재까지 배당내역을 보여드리겠습니다.
            </h2>
            <Separator className="my-5 w-full" />
            <Chart1 />
            <Button className="mt-5 py-6 w-60">자세히 보기</Button>
            <Separator className="my-5 w-full" />
          </div>
        </section>
      </main>
    </>
  );
};

export default StartPage;

{
  /* <section className="py-5 px-20 h-full w-[650px] min-w-[650px] flex flex-col items-center max-w-xl border-r">
<h1 className="pt-16 text-center text-3xl font-bold opacity-80">
  안녕하세요, 김현석님
</h1>
<h2 className="pt-2 pb-10 text-center text-xl font-bold opacity-70">
  현재까지 배당내역을 보여드리겠습니다.
</h2>
<Chart1 />
<Button className="mt-5 py-6 px-10 bg-c1-300">자세히 살펴보기</Button>
<div className="mt-20 flex justify-between gap-5 bg-slate-200">
  <div className="h-40 w-40 rounded-xl bg-rose-200" />
  <div className="h-40 w-40 rounded-xl bg-rose-200" />
  <div className="h-40 w-40 rounded-xl bg-rose-200" />
</div>
</section>

<section className="py-5 px-10 h-full w-full space-y-10 overflow-y-auto">
<Chart4 />
<Chart2 />
</section> */
}
