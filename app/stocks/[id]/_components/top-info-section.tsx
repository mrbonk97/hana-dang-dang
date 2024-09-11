"use client";
import { StockInfoApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface TopInfoSectionProps {
  code: string;
}
export const TopInfoSection = ({ code }: TopInfoSectionProps) => {
  const query = useQuery({
    queryKey: ["simple-stock-info", code],
    queryFn: () => StockInfoApi(code),
  });

  if (!query.isSuccess) return null;

  return (
    <section className="px-5 h-16 border-b flex items-center justify-between bg-background">
      <div>
        <h1 className="text-sm font-bold opacity-60">
          {query.data.data.prdt_abrv_name}
        </h1>
        <h2 className="font-bold opacity-70">67,400원</h2>
      </div>
      <div className="flex text-sm font-bold opacity-60 items-center gap-5">
        <div className="border-l pl-1">
          <h4 className="text-xs">시가총액</h4>
          <h4>457.5조원</h4>
        </div>
        <div className="border-l pl-1">
          <h4 className="text-xs">1일 최저</h4>
          <h4>457.5조원</h4>
        </div>
        <div className="border-l pl-1">
          <h4 className="text-xs">1일 최고</h4>
          <h4>457.5조원</h4>
        </div>
        <div className="border-l pl-1">
          <h4 className="text-xs">1년 최저</h4>
          <h4>457.5조원</h4>
        </div>
        <div className="border-l pl-1">
          <h4 className="text-xs">1년 최고</h4>
          <h4>457.5조원</h4>
        </div>
        <div className="border-l pl-1">
          <div
            role="button"
            className="h-8 w-8 flex2 bg-secondary rounded-xl hover:bg-rose-200 duration-150"
          >
            <Heart fill="black" size={16} />
          </div>
        </div>
      </div>
    </section>
  );
};
