"use client";
import { StockListTable } from "@/components/table/stock-list-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { stockListAPi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";

const StockPage = () => {
  const query = useQuery({
    queryKey: ["stocks"],
    queryFn: stockListAPi,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="py-20 pl-[26rem] pr-10 h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">주식 목록</h1>
        <p className="text-sm font-medium opacity-60">
          실시간 주식을 조회하실 수 있습니다.
        </p>
      </hgroup>
      <section className="mt-5">
        <div className="text-sm font-bold opacity-80">국내</div>
        <div className="mt-1 w-7 h-[3px] bg-black opacity-70" />
        <Separator />
      </section>
      <section className="mt-2 flex gap-5">
        <Button className="p-5 h-24 w-56 flex flex-col items-start justify-start font-bold opacity-80">
          <h4 className="text-sm">국내 전체</h4>
          <p className="mt-0.5 text-xs opacity-90">
            원하는 주식을 직접 골라보세요
          </p>
        </Button>
        <Button className="p-5 h-24 w-56 flex flex-col items-start justify-start font-bold opacity-80">
          <h4 className="text-sm">저평가 성장주</h4>
          <p className="mt-0.5 text-xs opacity-90">
            앞으로 성장할 저평가된 주식
          </p>
        </Button>
        <Button className="p-5 h-24 w-56 flex flex-col items-start justify-start font-bold opacity-80">
          <h4 className="text-sm">아직 저렴한 가치주</h4>
          <p className="mt-0.5 text-xs opacity-90">
            회사의 순자산 대비 저평가된 주식
          </p>
        </Button>
        <Button className="p-5 h-24 w-56 flex flex-col items-start justify-start font-bold opacity-80">
          <h4 className="text-sm">꾸준한 배당주</h4>
          <p className="mt-0.5 text-xs opacity-90">배당을 꾸준히 주는 주식</p>
        </Button>
      </section>
      <section className="mt-3">
        <Button className="rounded-full flex items-center gap-2 font-bold opacity-70">
          <SlidersHorizontal size={16} />
          <span className="mb-0.5">필터 추가</span>
        </Button>
      </section>

      <section className="mt-5 font-bold opacity-80">
        <div className="text-xs opacity-60">검색된 주식 · 961개</div>
        <Separator className="my-3" />
        {query.isSuccess && (
          <StockListTable data={query.data.data.simpleStockInfos} />
        )}
      </section>
    </main>
  );
};

export default StockPage;
