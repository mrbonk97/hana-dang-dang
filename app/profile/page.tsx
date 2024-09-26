"use client";
import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { MainSection } from "./_components/main-section";
import { useEffect, useState } from "react";
import { AccountStockCard } from "./_components/account-stock-card";
import { AccountBalanceGraph } from "./_components/account-balance-graph";

const ProfilePage = () => {
  const [accountId, setAccountId] = useState("5588193822");

  useEffect(() => {
    const storedAccountId = localStorage.getItem("account_id");
    if (storedAccountId) setAccountId(storedAccountId);
  }, []);

  return (
    <main className="pt-14 pl-16">
      <MainSection accountId={accountId} />
      <div className="p-10 w-full flex flex-col justify-center items-center gap-10">
        <section className="w-full max-w-[1000px] flex justify-between gap-10">
          <TransactionCard accountId={accountId} />
          <AccountCard accountId={accountId} />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountStockCard accountId={accountId} />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountBalanceGraph />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
