import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { AccountTransactionCard } from "./_components/account-transaction-card";
import { MainSection } from "./_components/main-section";

const ProfilePage = () => {
  return (
    <main className="pt-14 pl-16">
      <MainSection />
      <div className="p-10 w-full flex flex-col justify-center items-center gap-10">
        <section className="w-full max-w-[1000px] flex justify-between gap-10">
          <TransactionCard />
          <AccountCard />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountTransactionCard />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
