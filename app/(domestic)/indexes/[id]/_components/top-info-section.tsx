import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";

interface TopInfoSectionProps {
  data: {
    bstp_nmix_prdy_vrss: string;
    prdy_vrss_sign: string;
    bstp_nmix_prdy_ctrt: string;
    prdy_nmix: string;
    acml_vol: string;
    acml_tr_pbmn: string;
    hts_kor_isnm: string;
    bstp_nmix_prpr: string;
    bstp_cls_code: string;
    prdy_vol: string;
    bstp_nmix_oprc: string;
    bstp_nmix_hgpr: string;
    bstp_nmix_lwpr: string;
    futs_prdy_oprc: string;
    futs_prdy_hgpr: string;
    futs_prdy_lwpr: string;
  };
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
