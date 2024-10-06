"use client";
import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { MainSection } from "./_components/main-section";
import { AccountStockCard } from "./_components/account-stock-card";
import { AccountBalanceGraph } from "./_components/account-balance-graph";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import Link from "next/link";
import { Footer } from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import { BirdIcon } from "lucide-react";

const ProfilePage = () => {
  const selector = createSelectors(store).use;
  const account = selector.account();

  if (account == null) {
    return (
      <main className="h-full flex2 flex-col gap-5 font-medium opacity-80">
        <BirdIcon size={96} className="text-c1-300" />
        <h1>로그인이 필요한 서비스입니다.</h1>
        <Button variant={"link"} asChild>
          <Link href={"/sign-in"}>로그인 하러가기</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="pt-14 pl-16">
      <MainSection accountId={account.accountNo} />
      <div className="pt-16 w-full flex flex-col justify-center items-center">
        <section className="pt-0 p-10 h-[500px] w-[1200px] flex justify-between gap-10">
          <TransactionCard accountId={account.accountNo} />
          <AccountCard accountId={account.accountNo} />
        </section>
        <section className="pt-0 p-10 w-full max-w-[1200px]">
          <AccountStockCard accountId={account.accountNo} />
        </section>
        <section className="pt-0 p-10 w-full max-w-[1200px]">
          <AccountBalanceGraph />
        </section>
        <Footer className="mt-20 pb-20 bg-secondary" />
      </div>
    </main>
  );
};

export default ProfilePage;
