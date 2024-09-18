"use client";
import { Separator } from "@/components/ui/separator";
import { StockInfoApi } from "@/lib/stock-api";
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

  const formatString = (value: string | undefined) => {
    if (value == undefined) return "";
    const _val = parseInt(value);
    const formatted = new Intl.NumberFormat().format(_val);
    return formatted;
  };

  const curPrice = query.data?.data.stockCurrentPrice.output.prdy_vrss;
  const curPercentage = query.data?.data.stockCurrentPrice.output.prdy_ctrt;

  return (
    <section className="px-5 h-16 border-b flex items-center justify-between bg-background">
      <div>
        <h1 className="text-sm font-bold opacity-60">
          {query.data?.data.stockInfo.prdt_abrv_name}
        </h1>
        <h2 className="font-bold opacity-70 flex items-center">
          {formatString(query.data?.data.stockCurrentPrice.output.stck_prpr)}원
          <Separator orientation="vertical" className="mx-2 h-5" />
          {curPrice != undefined && curPercentage != undefined && (
            <span
              className={
                parseInt(curPrice) < 0 ? "text-blue-500" : "text-rose-500"
              }
            >
              {formatString(curPrice)}원({Math.abs(parseFloat(curPercentage))}%)
            </span>
          )}
        </h2>
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
          <h4>
            {formatString(query.data?.data.stockCurrentPrice.output.stck_lwpr)}
            원
          </h4>
        </div>
        <div className="border-l pl-2">
          <h4 className="text-xs">1일 최고</h4>
          <h4>
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
