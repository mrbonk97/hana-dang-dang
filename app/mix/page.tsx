import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const MixPage = () => {
  return (
    <main className="py-14 h-full flex2 flex-col gap-10">
      <section className="flex items-center justify-center gap-10">
        <hgroup className="text-7xl font-bold opacity-80">
          <h1>
            하나
            <strong className="text-c1-300">당당</strong>
          </h1>
          <h2 className="mt-1">
            포트폴리오 <strong className="text-c1-300">MIX</strong>
          </h2>
          <p className="mt-1 text-base opacity-60">
            고객님의 성향에 맞게 포트폴리오를 섞어드립니다.
          </p>
        </hgroup>
        <Image src={"/icons/mix.gif"} alt="mix" width={400} height={400} />
      </section>
      <Button className="rounded-full py-6 px-10" asChild>
        <Link href={"/mix/diagnosis"}>진단받기</Link>
      </Button>
    </main>
  );
};

export default MixPage;
