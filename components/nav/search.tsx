"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { searchStockApi } from "@/lib/dividend-api";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: () => searchStockApi(keyword),
  });

  useEffect(() => {
    if (keyword == "") return;
    mutate();
  }, [keyword]);

  return (
    <Drawer direction="top" onOpenChange={() => setKeyword("")}>
      <DrawerTrigger>
        <Button
          className="py-1 px-6 h-10 rounded-full bg-secondary"
          variant={"outline"}
        >
          <SearchIcon className="opacity-70" size={18} />
          <span className="ml-2 opacity-70">검색어를 입력해주세요</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="top-0 bottom-auto rounded-b-[10px] mt-0 px-20">
        <DrawerHeader>
          <DrawerTitle className="opacity-80">
            검색어를 입력해주세요
          </DrawerTitle>
        </DrawerHeader>
        <section className="mt-10 h-96 w-full flex flex-col items-center">
          <div className="relative">
            <SearchIcon
              className="absolute left-5 top-1/2 -translate-y-1/2 opacity-70"
              size={24}
            />
            <Input
              className="w-96 rounded-full py-7 px-5 pl-14"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <ul className="mt-5 space-y-3">
            {isPending && (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
            {isSuccess && <></>}
          </ul>
        </section>
      </DrawerContent>
    </Drawer>
  );
};

const Skeleton = () => {
  return (
    <li className="h-14 w-96 flex items-center gap-2">
      <div className="h-full aspect-square rounded-full bg-secondary" />
      <div className="h-full w-full rounded-xl bg-secondary" />
    </li>
  );
};
