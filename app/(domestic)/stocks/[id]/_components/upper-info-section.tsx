"use client";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  curPrice: string;
  prevPrice: string;
  prevPerc: string;
  totalValue: string;
  todayHigh: string;
  todayLow: string;
  yearHigh: string;
  yearLow: string;
  PER: string;
  PBR: string;
  stac: string;
  danger: string;
}

export const UpperInfoSection = ({
  title,
  curPrice,
  prevPrice,
  prevPerc,
  totalValue,
  todayHigh,
  todayLow,
  yearHigh,
  yearLow,
  PER,
  PBR,
  stac,
  danger,
}: Props) => {
  const [hokaPrice, setHokaPrice] = useState(parseInt(curPrice));
  const _hokaPrice = createSelectors(store).use.curPrice();

  let color = "text-rose-600";
  if (prevPrice.charAt(0) == "-") color = "text-blue-600";

  if (danger == "00") danger = "정상";
  if (danger == "01") danger = "주의";
  if (danger == "02") danger = "경고";
  if (danger == "03") danger = "위험";

  useEffect(() => {
    if (_hokaPrice == null) return;
    setHokaPrice(parseInt(_hokaPrice));
  }, [_hokaPrice]);

  return (
    <section className="px-5 py-2 h-20 border-b flex items-center justify-between bg-background">
      <hgroup className="opacity-80">
        <h1 className="font-bold">{title}</h1>
        <div className="flex items-end">
          <h2 className="text-lg font-bold">{formatNumber(hokaPrice)}원</h2>
          <span className={`ml-3 mb-[1px] font-medium  ${color}`}>
            {formatNumber(parseInt(prevPrice))}원(
            {formatNumber(Math.abs(parseFloat(prevPerc)))}%)
          </span>
        </div>
      </hgroup>

      <ul className="flex items-center gap-2 opacity-70">
        <List
          title="시가총액"
          value={formatNumber(parseFloat(totalValue)) + "억"}
        />
        <List
          title="1일최고"
          value={formatNumber(parseFloat(todayHigh)) + "원"}
        />
        <List
          title="1일최저"
          value={formatNumber(parseFloat(todayLow)) + "원"}
        />
        <List
          title="연중최고"
          value={formatNumber(parseFloat(yearHigh)) + "원"}
        />
        <List
          title="연중최저"
          value={formatNumber(parseFloat(yearLow)) + "원"}
        />
        <List title="PER" value={formatNumber(parseFloat(PER))} />
        <List title="PBR" value={formatNumber(parseFloat(PBR))} />
        <List title="결산월" value={stac + "월"} />
        <List title="투자위험" value={danger} className="text-green-500" />
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
