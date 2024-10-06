import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const NotLoggedInPage = () => {
  return (
    <main className="py-20 min-h-[700px] min-w-[1200px] h-full flex2 flex-col gap-20">
      <h1 className="text-5xl font-bold opacity-80">
        하나증권 <strong className="text-c1-300">배당주 연구소</strong>
      </h1>
      <ul className="w-full flex2 gap-20 font-bold text-lg">
        <li className="flex items-center gap-2">
          <span className="opacity-70">나만의 배당 통계</span>
          <Image
            src={"/icons/checklist.png"}
            alt="chart1"
            width={24}
            height={24}
          />
        </li>
        <li className="flex items-center gap-2">
          <span className="opacity-70">포트폴리오 분석</span>
          <Image
            src={"/icons/pie-graph.png"}
            alt="chart2"
            width={24}
            height={24}
          />
        </li>
        <li className="flex items-center gap-2">
          <span className="opacity-70">배당주식 추천</span>
          <Image src={"/icons/graph.png"} alt="chart3" width={24} height={24} />
        </li>
      </ul>
      <Image
        src={"/images/telescope2.gif"}
        alt="telescope"
        width={256}
        height={256}
      />
      <Button className="rounded-full py-8 px-14 text-xl" asChild>
        <Link href={"/sign-in"}>로그인이 필요합니다</Link>
      </Button>
    </main>
  );
};
