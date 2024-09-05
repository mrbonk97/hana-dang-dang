import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RecommedPage = () => {
  return (
    <main className="pt-14 min-h-full h-full">
      <Section1 />
      <Section2 />
    </main>
  );
};

export default RecommedPage;

const Section1 = () => {
  return (
    <section id="s1" className="px-10 h-full flex2 flex-col gap-16">
      <h1 className="text-7xl font-black text-center">
        <span className="opacity-70 break-keep">하나당당</span>
        <span className="text-c1-300 break-keep"> 종목추천</span>
      </h1>
      <ul className="flex gap-20 font-medium">
        <li className="flex items-center gap-2">
          <Image
            src={"/icons/piggy-bank.png"}
            alt="nat"
            width={40}
            height={40}
          />
          <span className="opacity-80 break-keep">국내 ETF</span>
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={"/icons/money-plant.png"}
            alt="nat"
            width={40}
            height={40}
          />
          <span className="opacity-80 break-keep">해외 ETF</span>
        </li>
      </ul>
      <Image
        src={"/images/telescope2.gif"}
        alt="telescope"
        width={500}
        height={500}
      />
    </section>
  );
};

const Section2 = () => {
  return (
    <section
      id="s2"
      className="p-10 h-full flex flex-col md:flex-row items-center justify-evenly gap-10 bg-c1-300 text-primary-foreground"
    >
      <hgroup>
        <h4 className="text-base md:text-2xl font-bold opacity-70 break-keep">
          나에게 성향에 맞는 종목을 찾아드립니다.
        </h4>
        <h2 className="text-center md:text-left mt-5 text-4xl md:text-7xl font-bold leading-[1.3] break-keep">
          챗봇으로
          <br /> 간편하게 조회
        </h2>
        <h3 className="mt-5 text-sm md:text-xl font-medium opacity-70">
          추천에 필요한 정보를 챗봇에게 알려주면 16차 알고리즘을 통해 종목을
          추천해드립니다.
        </h3>
        <div className="mt-10 flex md:block justify-center">
          <Button
            variant={"secondary"}
            className="py-10 w-80 rounded-full"
            asChild
          >
            <Link href={"/recommend/chat"}>
              <span className="text-2xl font-bold opacity-70">추천받기</span>
            </Link>
          </Button>
        </div>
      </hgroup>
      <Image
        src={"/images/hana-girl.gif"}
        width={500}
        height={500}
        alt="hana-girl"
        className="h-80 w-80 md:h-auto md:w-auto"
      />
    </section>
  );
};
