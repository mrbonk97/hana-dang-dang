import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-14 h-full flex items-center justify-center flex-col gap-5">
      <section className="flex items-center">
        <h1 className="text-9xl font-bold">
          <strong className="opacity-70">하나 </strong>
          <strong className="text-c1-300">당당</strong>
        </h1>
        <Image src={"/icons/fire.gif"} alt="fire" width={368} height={368} />
      </section>
      <section className="font-bold opacity-60">
        배당주&배당ETF 관리 서비스
      </section>
      <Button className="py-16 px-10 rounded-full" asChild>
        <Link href={"/main"}>시작하기</Link>
      </Button>
    </main>
  );
}
