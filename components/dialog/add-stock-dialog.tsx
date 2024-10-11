"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDividendStockInfo2023, searchStockApi } from "@/lib/dividend-api";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NewsDialogProps {
  children: React.ReactNode;
}

export const AddStockDialog = ({ children }: NewsDialogProps) => {
  const [isCompositing, setIsCompositing] = useState(false);
  const { mutate, isPending, isSuccess, data, reset } = useMutation({
    mutationFn: (keyword: string) => searchStockApi(keyword),
  });

  const mutate2 = useMutation({
    mutationFn: (code: string) => getDividendStockInfo2023(code),
    onSuccess(data, variables, context) {
      console.log(data);
    },
  });

  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>종목 추가하기</DialogTitle>
        </DialogHeader>
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
                onClick={() => mutate2.mutate(item.code)}
                className="p-5 h-16 w-96 flex items-center justify-between gap-2 bg-secondary hover:bg-c1-100 duration-150 group rounded-xl"
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
                </div>
              </li>
            ))}
        </ul>

        <DialogFooter className="w-full">
          <DialogClose>
            <Button className="py-7 px-10">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
