"use client";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { getDividendCalendar } from "@/lib/dividend-api";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

export function DividendCalendar() {
  const [date, setDate] = React.useState<Date>(new Date());

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: (e: Date) => {
      const year = e.getFullYear();
      const month = String(e.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
      const day = String(e.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;
      return getDividendCalendar(formattedDate);
    },
  });

  React.useEffect(() => {
    mutate(date);
  }, []);

  console.log(data);

  return (
    <>
      <div className="flex flex-col justify-between gap-5">
        <Calendar
          className="border rounded-xl"
          mode="single"
          selected={date}
          onSelect={(e) => {
            if (e == undefined || e == null) return;
            setDate(e);
            mutate(e);
          }}
        />
        <div className="p-5 h-full w-full flex flex-col items-center justify-center rounded-xl border hover:bg-secondary duration-150">
          <h2 className="text-lg font-bold opacity-80">배당 달력</h2>
          <p className="mt-1 text-xs font-medium opacity-60">
            배당 일정을 놓치지마세요
          </p>
          <Image
            src={"/icons/personal-growth.png"}
            alt="person"
            width={96}
            height={96}
            className="mt-4"
          />
        </div>
      </div>

      <ul className="p-5 h-full w-full overflow-y-auto space-y-0.5 opacity-70 font-medium border rounded-xl overflow-hidden">
        <li className="py-2 grid grid-cols-10 border-b font-bold">
          <div className="col-span-2">종목명</div>
          <div className="col-span-2">배당일</div>
          <div className="col-span-1">배당종류</div>
          <div className="col-span-1">주식종류</div>
          <div className="col-span-1 text-right">액면가</div>
          <div className="col-span-1 text-right">배당금</div>
          <div className="col-span-1 text-right">배당률</div>
        </li>
        {isSuccess &&
          data != undefined &&
          data.map((item) => (
            <li
              key={item.isin_name}
              className="grid grid-cols-10 hover:bg-secondary duration-150"
            >
              <div className="col-span-2 max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                {item.isin_name}
              </div>
              <div className="col-span-2">{item.divi_pay_dt || "-"}</div>
              <div className="col-span-1">{item.divi_kind || "-"}</div>
              <div className="col-span-1">{item.stk_kind}</div>
              <div className="col-span-1 text-right">
                {formatNumber(item.face_val)}원
              </div>
              <div className="col-span-1 text-right">
                {formatNumber(item.per_sto_divi_amt)}원
              </div>
              <div className="col-span-1 text-right">{item.divi_rate}%</div>
            </li>
          ))}
        {isSuccess && data != undefined && data.length < 1 && (
          <li className="text-center pt-20">등록된 배당 일정이 없습니다.</li>
        )}
      </ul>
    </>
  );
}
