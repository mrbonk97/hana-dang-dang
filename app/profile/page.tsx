"use client";
import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { MainSection } from "./_components/main-section";
import { AccountStockCard } from "./_components/account-stock-card";
import { AccountBalanceGraph } from "./_components/account-balance-graph";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import Link from "next/link";

const ProfilePage = () => {
  const selector = createSelectors(store).use;
  const account = selector.account();

  if (account == null) {
    return (
      <main className="h-full flex2 flex-col gap-5">
        <h1>로그인이 필요한 서비스입니다.</h1>
        <Link href={"/sign-in"}>로그인 하러가기</Link>
      </main>
    );
  }

  return (
    <main className="pt-14 pl-16">
      <MainSection accountId={account.accountNo} />
      <div className="p-10 w-full flex flex-col justify-center items-center gap-10">
        <section className="w-full max-w-[1000px] flex justify-between gap-10">
          <TransactionCard accountId={account.accountNo} />
          <AccountCard accountId={account.accountNo} />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountStockCard accountId={account.accountNo} />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountBalanceGraph />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
