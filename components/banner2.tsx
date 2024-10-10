import { cn } from "@/lib/utils";

interface BannerProps {
  data: string[];
  className?: string;
}

export const Bannner2 = ({ data, className }: BannerProps) => {
  return (
    <div className={cn("relative h-12 w-full overflow-hidden", className)}>
      <div className="h-full w-fit flex items-center justify-between gap-20 whitespace-nowrap loop">
        {data.map((item) => (
          <div
            key={item}
            className="flex items-center text-sm font-medium opacity-70"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute w-full pointer-events-none inset-0 bg-gradient-to-r from-90% to-100% from-transparent to-slate-100" />
    </div>
  );
};
