import { DrawerTerms } from "@/components/drawer/drawer-terms";
import { Button } from "@/components/ui/button";
import { BookCheckIcon, GlobeIcon, PiggyBank } from "lucide-react";

const SignUpPage = () => {
  return (
    <main className="py-20 min-h-[100vh] h-full flex flex-col items-center justify-evenly gap-10">
      <hgroup>
        <h1 className="text-4xl font-bold opacity-80 leading-relaxed">
          자산관리계좌의 기본! <br />
          주식과 금융상품 투자를 한번에!
        </h1>
      </hgroup>
      <section className="max-w-[450px] w-full space-y-4">
        <div className="p-5 w-full border rounded-xl flex items-center gap-2">
          <GlobeIcon className="text-c1-300" />
          국내, 해외 주식거래를 한번에
        </div>
        <div className="p-5 w-full border rounded-xl flex items-center gap-2">
          <PiggyBank className="text-c1-300" />
          절세만능 중개형 ISA계좌
        </div>
        <div className="p-5 w-full border rounded-xl flex items-center gap-2">
          <BookCheckIcon className="text-c1-300" />
          중개형ISA는 평생 우대수수료 & 공모주 청약가능
        </div>
      </section>
      <section className="max-w-[450px] w-full space-y-2">
        <DrawerTerms>
          <Button className="py-10 w-full text-xl rounded-xl">
            주식+중개형 ISA+CMA 계좌 개설
          </Button>
        </DrawerTerms>
      </section>
    </main>
  );
};

export default SignUpPage;
