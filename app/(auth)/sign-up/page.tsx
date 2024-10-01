import { DrawerTerms } from "@/components/drawer/drawer-terms";
import { Button } from "@/components/ui/button";
import { BookCheckIcon, GlobeIcon, PiggyBank } from "lucide-react";

const SignUpPage = () => {
  return (
    <main className="min-h-screen h-full flex flex-col items-center justify-evenly gap-10">
      <section className="w-[550px]">
        <hgroup>
          <h1 className="text-4xl font-bold opacity-80 leading-relaxed">
            자산관리계좌의 기본! <br />
            주식과 금융상품 투자를 한번에!
          </h1>
        </hgroup>
        <div className="mt-10 space-y-5">
          <Button className="py-10 w-full" variant={"outline"}>
            <GlobeIcon className="text-c1-300" />
            <span className="ml-2 font-bold text-lg opacity-80">
              국내, 해외 주식거래를 한번에
            </span>
          </Button>
          <Button className="py-10 w-full" variant={"outline"}>
            <PiggyBank className="text-c1-300" />
            <span className="ml-2 font-bold text-lg opacity-80">
              절세만능 중개형 ISA계좌
            </span>
          </Button>
          <Button className="py-10 w-full" variant={"outline"}>
            <BookCheckIcon className="text-c1-300" />
            <span className="ml-2 font-bold text-lg opacity-80">
              중개형ISA는 평생 우대수수료 & 공모주 청약가능
            </span>
          </Button>
        </div>
      </section>
      <DrawerTerms>
        <Button className="w-[550px] py-10 text-xl">
          주식+중개형 ISA 계좌 개설
        </Button>
      </DrawerTerms>
    </main>
  );
};

export default SignUpPage;
