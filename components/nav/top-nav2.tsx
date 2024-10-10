import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}

export const Topnav2 = ({ className }: Props) => {
  return (
    <header
      className={cn(
        `z-50 fixed top-0 left-0 py-2 px-[7%] h-14 w-full border-b flex items-center justify-between bg-background`,
        className
      )}
    >
      <div className="flex items-center gap-20">
        <Logo />
        <nav className="flex gap-10 text-sm font-bold">
          <Link
            href={"/"}
            className="ont-medium opacity-80 font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            홈
          </Link>
          <Link
            href={"/stocks"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            주식
          </Link>
          <Link
            href={"/dividend"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            배당 정보
          </Link>
          <Link
            href={`/dividend-lab`}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            배당 연구소
          </Link>
          <Link
            href={"/profile"}
            className="opacity-60 font-medium aria-selected:opacity-80 aria-selected:font-bold hover:opacity-80 hover:font-bold duration-150"
          >
            투자내역
          </Link>
        </nav>
      </div>
      <div className="flex gap-2 opacity-90">
        <Link
          href={"/sign-in"}
          className="rounded-full text-xs flex gap-1 justify-center items-center font-medium bg-secondary text-zinc-700 py-2.5 px-5"
        >
          로그인
        </Link>
        <Link
          href={"/sign-up"}
          className="rounded-full text-xs pl-5 flex gap-1 justify-center items-center font-medium bg-c1-300 py-2.5 px-4"
        >
          회원가입 <ChevronRight size={16} />
        </Link>
      </div>
    </header>
  );
};
