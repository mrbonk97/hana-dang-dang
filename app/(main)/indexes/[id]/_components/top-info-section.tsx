import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";

interface TopInfoSectionProps {
  value: string;
  previous: string;
  previousPercentage: string;
}

export const TopInfoSection = ({
  value,
  previous,
  previousPercentage,
}: TopInfoSectionProps) => {
  return (
    <section className="px-5 h-16 flex-shrink-0 border-b flex items-center justify-between bg-background">
      <div>
        <h1 className="text-sm font-bold opacity-60">코스피</h1>
        <div className="font-bold opacity-70 flex items-center">
          <h2>{formatNumber(parseFloat(value))}</h2>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <span
            className={`${
              previous[0] == "-" ? "text-blue-500" : "text-rose-500"
            }`}
          >
            {formatNumber(parseFloat(previous))}(
            {parseFloat(previousPercentage)}
            %)
          </span>
        </div>
      </div>
    </section>
  );
};
