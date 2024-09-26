import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { HeartIcon } from "lucide-react";

interface Props {
  title: string;
  curPrice: string;
  prevPrice: string;
  todayHigh: string;
  todayLow: string;
  yearHigh: string;
  yearLow: string;
  PER: string;
  PBR: string;
}

export const InfoSection = ({
  title,
  curPrice,
  prevPrice,
  todayHigh,
  todayLow,
  yearHigh,
  yearLow,
  PER,
  PBR,
}: Props) => {
  return (
    <section className="px-5 py-2 h-20 border-b flex items-center justify-between bg-background">
      <hgroup className="opacity-80">
        <h1 className="font-bold">{title}</h1>
        <div className="flex items-end">
          <h2 className="text-lg font-bold">
            ${parseFloat(curPrice).toFixed(2)}
          </h2>
          <span className={`ml-3 mb-[1px] font-medium`}>
            ${parseFloat(prevPrice).toFixed(2)}
          </span>
        </div>
      </hgroup>

      <ul className="flex items-center gap-2 opacity-70">
        <List title="1일최고" value={"$" + parseFloat(todayHigh).toFixed(2)} />
        <List title="1일최저" value={"$" + parseFloat(todayLow).toFixed(2)} />
        <List title="연중최고" value={"$" + parseFloat(yearHigh).toFixed(2)} />
        <List title="연중최저" value={"$" + parseFloat(yearLow).toFixed(2)} />
        <List title="PER" value={PER} />
        <List title="PBR" value={PBR} />

        <Button variant={"ghost"} className="h-12 w-12 p-0 flex2">
          <HeartIcon className="text-black" fill="black" />
        </Button>
      </ul>
    </section>
  );
};

interface ListProps {
  title: string;
  value: string;
  className?: string;
}
const List = ({ title, value, className }: ListProps) => {
  return (
    <li className="font-bold px-3 border-r">
      <div className="text-sm">{title}</div>
      <div className={className}>{value}</div>
    </li>
  );
};
