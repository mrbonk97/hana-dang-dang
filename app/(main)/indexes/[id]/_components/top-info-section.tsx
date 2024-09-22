import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { IndexInfoType } from "@/type";

interface TopInfoSectionProps {
  data: IndexInfoType;
}

export const TopInfoSection = ({ data }: TopInfoSectionProps) => {
  return (
    <section className="px-5 h-16 flex-shrink-0 border-b flex items-center justify-between bg-background">
      <div>
        <h1 className="text-sm font-bold opacity-60">
          {data.hts_kor_isnm == "종합" ? "코스피" : data.hts_kor_isnm}
        </h1>
        <div className="font-bold opacity-70 flex items-center">
          <h2>{formatNumber(parseFloat(data.bstp_nmix_prpr))}</h2>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <span
            className={`${
              data.bstp_nmix_prdy_vrss[0] == "-"
                ? "text-blue-500"
                : "text-rose-500"
            }`}
          >
            {formatNumber(parseFloat(data.bstp_nmix_prdy_vrss))}(
            {parseFloat(data.bstp_nmix_prdy_ctrt)}
            %)
          </span>
        </div>
      </div>
    </section>
  );
};
