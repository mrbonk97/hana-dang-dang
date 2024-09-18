"use client";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { UserAvatar } from "./avatar";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";

export const Topnav = () => {
  const pn = usePathname();
  console.log(pn);
  const selector = createSelectors(store);
  const isLoggedIn = selector.use.isLoggedIn();

  return (
    <header className="z-40 fixed top-0 left-0 px-[7%] h-14 w-full border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-20">
        <Logo />
        <nav className="flex gap-10 text-sm font-bold">
          <Link
            href={"/"}
            aria-selected={pn == "/"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            홈
          </Link>
          <Link
            href={"/stocks"}
            aria-selected={pn == "/stocks"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            주식
          </Link>
          <Link
            href={"/profile"}
            aria-selected={pn == "/profile"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            투자내역
          </Link>
          <Link
            href={"/dividend-lab"}
            aria-selected={pn == "/dividend-lab"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            배당 연구소
          </Link>
        </nav>
      </div>
      <Input className="py-1 rounded-full w-60" />
      {isLoggedIn ? (
        <UserAvatar />
      ) : (
        <div className="flex gap-2">
          <Button
            className="rounded-full text-xs opacity-70"
            variant={"outline"}
            asChild
          >
            <Link href={"/sign-in"}>로그인</Link>
          </Button>
          <Button
            className="rounded-full text-xs pl-5 flex gap-1 justify-center items-center"
            asChild
          >
            <Link href={"/sign-up"}>
              회원가입 <ChevronRight size={16} />
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};
