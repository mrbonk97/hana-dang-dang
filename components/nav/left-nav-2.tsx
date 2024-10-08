"use client";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronsLeft } from "lucide-react";
import { getStockListRankApi } from "@/lib/stock-api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatNumber } from "@/lib/utils";

export const Leftnav2 = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const setTime = () => {
      const today = new Date();
      const dateString = `오늘 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}기준`;
      setDate(dateString);
    };
    setTime();
    const timer = setInterval(setTime, 5000);
    return () => clearInterval(timer);
  }, []);

  const { data, isSuccess } = useQuery({
    queryKey: ["stock-rank"],
    queryFn: () => getStockListRankApi("vol"),
    refetchInterval: 50000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (!isSuccess || data == undefined || data == null)
    return (
      <aside className="z-40 fixed left-16 top-14 py-3 h-full w-80 border-r bg-background">
        <div className="px-5 flex justify-between items-center">
          <hgroup>
            <h4 className="font-bold opacity-70">실시간 차트</h4>
            <p className="text-sm font-bold opacity-60">{date}</p>
          </hgroup>
          <Button
            variant={"ghost"}
            className="p-0 rounded-full h-10 w-10 flex2"
          >
            <ChevronsLeft className="text-c1-300 hover:bg-secondary" />
          </Button>
        </div>
        <Separator className="mt-4 mb-2 ml-5 w-[calc(100%-40px)]" />
        <ul className="px-2 pb-28 h-full space-y-2 overflow-y-auto">
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
        </ul>
      </aside>
    );

  return (
    <aside className="z-40 fixed left-16 top-14 py-3 h-full w-80 border-r bg-background">
      <div className="px-5 flex justify-between items-center">
        <hgroup>
          <h4 className="font-bold opacity-70">실시간 차트</h4>
          <p className="text-sm font-bold opacity-60">{date}</p>
        </hgroup>
        <Button variant={"ghost"} className="p-0 rounded-full h-10 w-10 flex2">
          <ChevronsLeft className="text-c1-300 hover:bg-secondary" />
        </Button>
      </div>
      <Separator className="mt-4 mb-2 ml-5 w-[calc(100%-40px)]" />

      <ul className="px-2 pb-28 h-full space-y-2 overflow-y-auto">
        {data.map((item) => (
          <List
            key={item.mksc_shrn_iscd}
            title={item.hts_kor_isnm}
            code={item.mksc_shrn_iscd}
            rank={item.data_rank}
            price={item.stck_prpr}
            prdy_vrss={item.prdy_vrss}
            prdy_ctrt={item.prdy_ctrt}
          />
        ))}
      </ul>
    </aside>
  );
};

interface ListProps {
  title: string;
  code: string;
  rank: string;
  price: string;
  prdy_vrss: string; // 전일 대비
  prdy_ctrt: string; // 전일 대비율
}

const List = ({
  title,
  code,
  rank,
  price,
  prdy_vrss,
  prdy_ctrt,
}: ListProps) => {
  let imgCode = code;
  if (imgCode.length == 6) imgCode = imgCode.slice(0, -1) + "0";

  return (
    <li>
      <Link
        href={`/stocks/${code}`}
        className="py-4 px-3 rounded-lg font-bold flex justify-between gap-2 items-center hover:bg-c1-100 duration-150 text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="text-c1-300">{rank}</span>
          <Avatar className="w-8 h-8">
            <AvatarImage src={`/kospi-icons/${imgCode}.png`} />
            <AvatarFallback>{title.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="opacity-60 overflow-hidden whitespace-nowrap text-ellipsis text-xs">
            {title}
          </span>
        </div>
        <div className="w-28 flex flex-col items-end">
          <span className="opacity-70">{formatNumber(price)}원</span>
          <span
            className={`opacity-70 text-xs font-medium text-right
              ${parseInt(prdy_vrss) < 0 && "text-blue-500"}
              ${parseInt(prdy_vrss) > 0 && "text-rose-500"}`}
          >
            {formatNumber(prdy_vrss)}원({Math.abs(parseFloat(prdy_ctrt))}%)
          </span>
        </div>
      </Link>
    </li>
  );
};

const ListSkeleton = () => {
  return (
    <li className="py-1 flex justify-between gap-2 animate-pulse">
      <div className="bg-secondary h-10 w-10 rounded-full flex-shrink-0" />
      <div className="bg-secondary h-10 w-full rounded-xl" />
    </li>
  );
};
