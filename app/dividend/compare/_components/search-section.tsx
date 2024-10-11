"use client";
import { SearchIcon, SquirrelIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { searchStockApi } from "@/lib/dividend-api";
import Image from "next/image";
import { useState } from "react";
import { StockSection } from "./stock-section";

export const SearchSection = () => {
  const [code, setCode] = useState("");
  const [isCompositing, setIsCompositing] = useState(false);
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: (keyword: string) => searchStockApi(keyword),
  });

  if (code != "") return <StockSection type="red" code={code} />;

  return (
    <section className="p-10 h-full w-1/2 flex flex-col items-center">
      <h2 className="pt-20 text-center font-bold opacity-80 text-2xl">
        비교할 종목을 선택해주세요
      </h2>
      <div className="pt-10 w-full flex justify-center">
        <div className="relative">
          <SearchIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 opacity-70"
            size={24}
          />
          <input
            className="border h-16 pl-16 rounded-full focus-visible:ring-0 focus-visible:ring-opacity-0 focus-visible:outline-none"
            onCompositionStart={() => setIsCompositing(true)}
            onInput={(e) => {
              if (isCompositing) mutate(e.currentTarget.value);
            }}
            onCompositionEnd={() => setIsCompositing(false)}
          />
        </div>
      </div>
      <ul className="mt-5 mb-1 py-5 h-[450px] w-full flex flex-col items-center gap-3 overflow-y-auto">
        {isPending && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {isSuccess &&
          data.length > 0 &&
          data.map((item) => (
            <li
              role="button"
              key={`search${item.code}`}
              className="p-5 h-24 w-96 flex items-center justify-between gap-2 bg-secondary hover:bg-c1-100 duration-150 group rounded-xl"
              onClick={() => setCode(item.code)}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={`/kospi-icons/${
                    item.code[5] != "0"
                      ? item.code.substring(0, 5) + "0"
                      : item.code
                  }.png`}
                  alt={item.prdtAbrvName.charAt(0)}
                  width={32}
                  height={32}
                  className="rounded-full overflow-hidden"
                />
                <hgroup>
                  <div className="text-sm font-medium opacity-80">
                    {item.prdtAbrvName}
                  </div>
                  <p className="text-xs font-medium opacity-60">
                    {item.stckClpr}
                  </p>
                </hgroup>
              </div>
              <div className="flex items-center gap-4">
                <SquirrelIcon className="hidden group-hover:block text-c1-300" />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

const Skeleton = () => {
  return (
    <li className="h-16 w-96 flex items-center gap-2">
      <div className="h-14 aspect-square rounded-full bg-secondary" />
      <div className="h-full w-full rounded-xl bg-secondary" />
    </li>
  );
};
