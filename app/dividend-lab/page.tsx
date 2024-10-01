import { Button } from "@/components/ui/button";
import Image from "next/image";

const DividendLabPage = () => {
  return (
    <main className="min-h-full h-full">
      <section className="flex2 flex-col gap-20 h-full w-full">
        <hgroup className="text-7xl font-bold">
          <h1 className="opacity-80">
            하나증권 <strong className="text-c1-300">배당주 연구소</strong>
          </h1>
        </hgroup>
        <ul className="w-full flex2 gap-20 font-bold text-lg">
          <li className="flex items-center gap-2">
            <span className="opacity-70"> 주식 비교</span>
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
            <span className="opacity-70"> 배당 예측</span>
            <Image
              src={"/icons/graph.png"}
              alt="chart3"
              width={24}
              height={24}
            />
          </li>
        </ul>
        <Image
          src={"/images/telescope2.gif"}
          alt="telescope"
          width={256}
          height={256}
        />
      </section>
      <section className="h-full bg-c1-300 flex items-center justify-evenly">
        <div>
          <h2 className="text-7xl font-black text-primary-foreground leading-[1.5]">
            나의 성향에 맞는
            <br />
            배당 포트폴리오 구성
          </h2>
          <Button
            variant={"outline"}
            className="mt-5 rounded-full py-10 px-16 text-xl font-bold"
          >
            <span className="opacity-80">진단받기</span>
          </Button>
        </div>
        <Image
          src={"/images/hana-girl.gif"}
          alt="hana-girl"
          width={512}
          height={512}
        />
      </section>
      <section className="h-full flex items-center justify-evenly">
        <Image
          src={"/images/busan_expo_byuldori.gif"}
          alt="hana-girl"
          width={512}
          height={512}
        />
        <div>
          <h2 className="text-right text-7xl font-black opacity-70 leading-[1.5]">
            배당 주식 비교 &<br />
            추이 분석
          </h2>
          <div className="flex justify-end">
            <Button className="mt-5 rounded-full py-10 px-16 text-xl font-bold">
              <span className="opacity-80">시작하기</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DividendLabPage;
