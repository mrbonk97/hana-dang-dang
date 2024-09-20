"use client";
import { Separator } from "@/components/ui/separator";
import { StockInfoApi } from "@/lib/stock-api";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { RefObject } from "react";

interface TopInfoSectionProps {
  id: string;
  currentPriceRef: RefObject<HTMLDivElement>;
  previousPriceRef: RefObject<HTMLDivElement>;
  highPriceRef: RefObject<HTMLDivElement>;
  lowPriceRef: RefObject<HTMLDivElement>;
}
export const TopInfoSection = ({
  id,
  currentPriceRef,
  previousPriceRef,
  highPriceRef,
  lowPriceRef,
}: TopInfoSectionProps) => {
  const query = useQuery({
    queryKey: ["simple-stock-info", id],
    queryFn: () => StockInfoApi(id),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const formatString = (value: string | undefined) => {
    if (value == undefined) return "";
    const _val = parseInt(value);
    const formatted = new Intl.NumberFormat().format(_val);
    return formatted;
  };

  const curPrice = query.data?.data.stockCurrentPrice.output.prdy_vrss || "0";
  const curPercentage =
    query.data?.data.stockCurrentPrice.output.prdy_ctrt || "0";

  return (
    <section className="px-5 h-16 border-b flex items-center justify-between bg-background">
      <div>
        <h1 className="text-sm font-bold opacity-60">
          {query.data?.data.stockInfo.prdt_abrv_name}
        </h1>
        <div className="font-bold opacity-70 flex items-center">
          <h2 ref={currentPriceRef}>
            {formatString(query.data?.data.stockCurrentPrice.output.stck_prpr)}
            원
          </h2>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <span ref={previousPriceRef}>
            {formatString(curPrice)}원({Math.abs(parseFloat(curPercentage))}%)
          </span>
        </div>
      </div>
      <div className="flex text-sm font-bold opacity-60 items-center gap-7">
        <div className="border-l pl-2">
          <h4 className="text-xs">시가총액</h4>
          <h4>
            {formatString(query.data?.data.stockCurrentPrice.output.hts_avls)}억
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">1일 최저</h4>
          <h4 ref={lowPriceRef}>
            {formatString(query.data?.data.stockCurrentPrice.output.stck_lwpr)}
            원
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">1일 최고</h4>
          <h4 ref={highPriceRef}>
            {formatString(query.data?.data.stockCurrentPrice.output.stck_hgpr)}
            원
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">1년 최저</h4>
          <h4>
            {formatString(query.data?.data.stockCurrentPrice.output.w52_lwpr)}원
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">1년 최고</h4>
          <h4>
            {formatString(query.data?.data.stockCurrentPrice.output.w52_hgpr)}원
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">PER</h4>
          <h4>{query.data?.data.stockCurrentPrice.output.per}</h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">PBR</h4>
          <h4>{query.data?.data.stockCurrentPrice.output.pbr}</h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">시장 경고</h4>
          <h4>
            {query.data?.data.stockCurrentPrice.output.mrkt_warn_cls_code ==
              "00" && <strong className="text-c1-300">정상</strong>}
            {query.data?.data.stockCurrentPrice.output.mrkt_warn_cls_code ==
              "01" && <strong className="text-rose-500">주의</strong>}
            {query.data?.data.stockCurrentPrice.output.mrkt_warn_cls_code ==
              "02" && <strong className="text-rose-500">경고</strong>}
            {query.data?.data.stockCurrentPrice.output.mrkt_warn_cls_code ==
              "03" && <strong className="text-rose-500">위험</strong>}
          </h4>
        </div>
        <div className="border-l pl-2">
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
