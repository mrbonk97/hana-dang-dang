import { IndexListType } from "@/lib/index-api";
import { cn } from "@/lib/utils";

interface BannerProps {
  data: IndexListType[];
  className?: string;
}

export const Bannner = async ({ data, className }: BannerProps) => {
  return (
    <div
      className={cn(
        "relative h-12 w-full overflow-hidden bg-slate-100",
        className
      )}
    >
      <div className="h-full w-fit flex items-center justify-between gap-20 whitespace-nowrap loop">
        {data.map((item) => (
          <div
            key={item.bstp_cls_code}
            className="flex items-center text-sm font-medium opacity-70"
          >
            {item.hts_kor_isnm} {item.bstp_nmix_prpr}
            <strong
              className={
                parseFloat(item.bstp_nmix_prdy_vrss) > 0
                  ? "text-rose-500"
                  : "text-blue-400"
              }
            >
              ({item.bstp_nmix_prdy_vrss})
            </strong>
          </div>
        ))}
      </div>
      <div className="absolute w-full pointer-events-none inset-0 bg-gradient-to-r from-90% to-100% from-transparent to-slate-100" />
    </div>
  );
};
