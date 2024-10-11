"use client";
import Image from "next/image";
import { getDividendStockInfo } from "@/lib/dividend-api";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner/spinner";
import { getStockInfoApi, getStockPriceApi } from "@/lib/stock-api";
import { DividendType2 } from "./divident-type2";
import { DividendYear2 } from "./dividend-year2";
import { formatNumber } from "@/lib/utils";

interface Props {
  code: string;
  type: "blue" | "red";
}

export const StockSection = ({ code, type }: Props) => {
  const query1 = useQuery({
    queryKey: ["compare", code],
    queryFn: () => getDividendStockInfo(code),
  });

  const query3 = useQuery({
    queryKey: ["stock-price2", code],
    queryFn: () => getStockInfoApi(code),
  });

  const query2 = useQuery({
    queryKey: ["stock-price", code],
    queryFn: () => getStockPriceApi(code),
  });

  if (
    query1.isPending ||
    !query1.isSuccess ||
    query1.data == undefined ||
    query2.isPending ||
    !query2.isSuccess ||
    query2.data == undefined ||
    query3.isPending ||
    !query3.isSuccess ||
    query3.data == undefined
  ) {
    return (
      <section className="p-10 h-[1200px] flex justify-center pt-96 w-1/2 border-r">
        <Spinner />
      </section>
    );
  }

  let total = 0;

  const chartData = [
    { type: "월간", value: 0 },
    { type: "분기별", value: 0 },
    { type: "반기", value: 0 },
    { type: "연간", value: 0 },
    { type: "12개월 추적분", value: 0 },
    { type: "기타", value: 0 },
    { type: "중간", value: 0 },
    { type: "최종", value: 0 },
    { type: "특별", value: 0 },
  ];

  query1.data.map((item) => {
    const year = new Date(item.lockDate).getFullYear();
    if (year == 2023) total += item.amount;

    if (item.dividendType == "월간") chartData[0].value++;
    if (item.dividendType == "분기별") chartData[1].value++;
    if (item.dividendType == "반기") chartData[2].value++;
    if (item.dividendType == "연간") chartData[3].value++;
    if (item.dividendType == "12개월 추적분") chartData[4].value++;
    if (item.dividendType == "기타") chartData[5].value++;
    if (item.dividendType == "중간") chartData[6].value++;
    if (item.dividendType == "최종") chartData[7].value++;
    if (item.dividendType == "특별") chartData[8].value++;
  });

  console.log(query1.data);

  return (
    <section className="p-10 w-1/2 border-r h-[1200px]">
      <div className="w-full flex gap-5">
        <Image
          src={`/kospi-icons/${code}.png`}
          alt={code}
          width={128}
          height={128}
          className="rounded-xl"
        />
        <hgroup className="font-bold opacity-80 space-y-0.5">
          <h2 className="text-4xl">
            {query3.data.output.prdt_abrv_name}
            <span className="ml-2 text-lg opacity-80">{code}</span>
          </h2>
          <h4 className="text-xl">
            {query3.data.output.std_idst_clsf_cd_name}
          </h4>
          <h4 className="pt-1 text-3xl">
            {formatNumber(query2.data.stck_prpr)}원
          </h4>
        </hgroup>
      </div>
      <div
        className={`pl-10 pr-24 py-6 mt-5 h-40 w-full rounded-xl flex justify-between items-center text-zinc-800
            ${type == "red" ? "bg-rose-200" : "bg-blue-200"}`}
      >
        <div className="h-full">
          <h4 className="text-xl font-bold opacity-80">최신 연간 배당률</h4>
          <h4 className="mt-1 text-4xl font-bold">
            {query1.data[0].yieldPercentage}%
          </h4>
        </div>
      </div>
      <ul className="mt-5 flex justify-between gap-10">
        <li
          className={`h-40 w-1/3 rounded-xl px-10 py-7 font-bold opacity-90
        ${type == "red" ? "bg-rose-200" : "bg-blue-200"}`}
        >
          <h4 className="text-lg opacity-80">PER</h4>
          <h4 className="text-2xl">{query2.data.per}</h4>
        </li>
        <li
          className={`h-40 w-1/3 rounded-xl px-10 py-7 font-bold ${
            type == "red" ? "bg-rose-200" : "bg-blue-200"
          }`}
        >
          <h4 className="text-lg opacity-80">PBR</h4>
          <h4 className="text-2xl">{query2.data.pbr}</h4>
        </li>
        <li
          className={`h-40 w-1/3 rounded-xl px-10 py-7 font-bold  ${
            type == "red" ? "bg-rose-200" : "bg-blue-200"
          }`}
        >
          <h4 className="text-sm opacity-80">2023년 총 배당금</h4>
          <h4 className="text-2xl">{formatNumber(total)}원</h4>
        </li>
      </ul>
      <article className="mt-5 h-52 w-full rounded-xl bg-c1-300">
        <DividendType2 chartData={chartData} />
        <DividendYear2 data={query1.data} />
      </article>
    </section>
  );
};
