"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SearchIcon, SquirrelIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { searchStockApi } from "@/lib/dividend-api";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [isCompositing, setIsCompositing] = useState(false);
  const { mutate, isPending, isSuccess, data, reset } = useMutation({
    mutationFn: (keyword: string) => searchStockApi(keyword),
  });

  return (
    <Drawer
      direction="top"
      onOpenChange={() => {
        reset();
      }}
    >
      <DrawerTrigger asChild>
        <Button
          className="py-1 pl-6 pr-7 h-10 rounded-full bg-secondary shadow-none"
          variant={"outline"}
        >
          <SearchIcon className="opacity-70" size={18} />
          <span className="ml-2 opacity-70">검색어를 입력해주세요</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="top-0 bottom-auto rounded-t-none rounded-b-[10px] mt-0">
        <DrawerHeader>
          <DrawerTitle className="opacity-80">
            검색어를 입력해주세요
          </DrawerTitle>
        </DrawerHeader>
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
              <DrawerClose
                key={`search${item.code}`}
                className="p-5 h-16 w-96 flex items-center justify-between gap-2 bg-secondary hover:bg-c1-100 duration-150 group rounded-xl"
                onClick={() => router.push(`/stocks/${item.code}`)}
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
                  <div className="text-sm">
                    <div className="text-sm font-medium opacity-80 text-right">
                      {formatNumber(item.stckClpr)}원
                    </div>
                    <div
                      className={`text-[10px] font-bold opacity-80 text-right
                        ${item.prdyVrss > 0 ? "text-rose-500" : "text-blue-500"}
                        `}
                    >
                      ({formatNumber(item.prdyVrss)}원)
                    </div>
                  </div>
                  <SquirrelIcon className="hidden group-hover:block text-c1-300" />
                </div>
              </DrawerClose>
            ))}
        </ul>
      </DrawerContent>
    </Drawer>
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
