import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";

export const Topnav = () => {
  return (
    <header className="fixed top-0 left-0 px-[7%] h-14 w-full border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-20">
        <Logo />
        <nav className="flex gap-10">
          <Link href={"/dashboard"}>내 주식</Link>
          <Link href={"/asd"}>메뉴2</Link>
          <Link href={"/recommend"}>종목추천</Link>
        </nav>
      </div>
      <div className="flex gap-2">
        <Button className="rounded-full" variant={"outline"}>
          로그인
        </Button>
        <Button className="rounded-full pl-5 flex gap-1 justify-center items-center">
          회원가입 <ChevronRight size={16} />
        </Button>
      </div>
    </header>
  );
};
