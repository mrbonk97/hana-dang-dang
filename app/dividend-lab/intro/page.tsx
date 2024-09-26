import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const IntroPage = () => {
  return (
    <main className="pt-14 pl-16 h-full w-full flex flex-col bg-c1-100">
      <section className="h-full flex items-center justify-evenly gap-40">
        <hgroup className="space-y-5 font-bold">
          <h1 className="text-6xl opacity-80">안정된 수입원</h1>
          <h1 className="text-6xl opacity-80">배당주 연구소</h1>
          <p className="pb-5 opacity-70">
            하나배당당에서 처음으로 선보이는 기능
          </p>
          <Button
            className="text-lg px-10 py-8 rounded-full font-bold bg-c1-300"
            asChild
          >
            <Link href={"/dividend-lab/onboarding"}>1분만에 시작하기</Link>
          </Button>
        </hgroup>
        <Image src={"/vercel.svg"} alt="vercel" width={300} height={300} />
      </section>
      <p className="h-28 text-sm text-center opacity-60">
        2022년 6월 ~ 12월 취급 대출 중 최대한도 및 대출수수료 포함한 대출 금리
        기준(렌딧 내부 데이터, 금융감독원 금융상품통합비교공시)
      </p>
    </main>
  );
};

export default IntroPage;
