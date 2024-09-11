"use client";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { UserAvatar } from "./avatar";

export const Topnav = () => {
  const selector = createSelectors(store);
  const isLoggedIn = selector.use.isLoggedIn();

  return (
    <header className="z-40 fixed top-0 left-0 px-[7%] h-14 w-full border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-20">
        <Logo />
        <nav className="flex gap-10 text-sm font-medium opacity-70">
          <Link href={"/main"}>홈</Link>
          <Link href={"/stocks"}>주식</Link>
          <Link href={"/etf-lab"}>배당 연구소</Link>
        </nav>
      </div>
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
