"use client";
import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { MainSection } from "./_components/main-section";
import { AccountStockCard } from "./_components/account-stock-card";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { Footer } from "@/components/nav/footer";
import { NotLoggedInCard } from "@/components/not-logged-in-card";
import { BuyStateCard } from "./_components/buy-state-card";

const ProfilePage = () => {
  const selector = createSelectors(store).use;
  const account = selector.account();

  if (account == null) {
    return <NotLoggedInCard />;
  }

  return (
    <main className="pt-14 pl-16">
      <MainSection accountId={account.accountNo} />
      <div className="pt-16 w-full flex flex-col justify-center items-center">
        <section className="pt-0 p-10 h-[500px] w-[1200px] flex justify-between gap-10">
          <BuyStateCard accountId={account.accountNo} />
        </section>
        <section className="pt-0 p-10 h-[500px] w-[1200px] flex justify-between gap-10">
          <TransactionCard accountId={account.accountNo} />
          <AccountCard accountId={account.accountNo} />
        </section>
        <section className="pt-0 p-10 w-full max-w-[1200px]">
          <AccountStockCard accountId={account.accountNo} />
        </section>
        <Footer className="mt-20 pb-20 bg-secondary" />
      </div>
    </main>
  );
};

export default ProfilePage;
