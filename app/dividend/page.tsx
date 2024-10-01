import { DividendRankTable } from "./_components/dividend-rank-table";
import { DividendCalendar } from "./_components/dividend-calendar";
import Image from "next/image";
import { getDividendRank } from "@/lib/dividend-api";
import { Footer } from "@/components/nav/footer";

const DividendPage = async () => {
  const data = await getDividendRank();
  return (
    <main className="pl-96 pt-14">
      <hgroup className="p-5">
        <h1 className="text-lg font-bold opacity-80">배당 정보</h1>
        <h2 className="font-medium opacity-70">
          배당에 대한 다양한 정보를 확인해보세요
        </h2>
      </hgroup>
      <section className="pt-0 p-5 h-[550px] flex justify-between gap-5 max-w-[1200px]">
        <DividendCalendar />
      </section>
      <section className="pt-0 p-5 max-w-[1200px]">
        <hgroup className="mt-16">
          <h1 className="text-lg font-bold opacity-80">
            배당주 순위
            <span className="ml-2 font-medium text-xs opacity-60">
              2023년 기준
            </span>
          </h1>
        </hgroup>
        <div className="mt-10 w-full flex justify-evenly gap-5">
          <article className="p-5 w-60 border rounded-xl flex flex-col items-center bg-secondary">
            <p className="w-full text-left font-bold opacity-70">
              배당율 2위 종목
            </p>
            <Image
              src={"/icons/silver-medal.png"}
              alt="medal"
              width={128}
              height={128}
              className="mt-14"
            />
            <p className="mt-10 font-bold opacity-80 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {data[1].title}
            </p>
            <p className="mt-1 text-lg font-bold opacity-80 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              배당율:{" "}
              <strong className="text-rose-500">{data[1].yield}%</strong>
            </p>
          </article>
          <article className="p-5 w-60 border rounded-xl flex flex-col items-center bg-secondary">
            <p className="w-full text-left font-bold opacity-70">
              배당율 1위 종목
            </p>
            <Image
              src={"/icons/gold-medal.png"}
              alt="medal"
              width={128}
              height={128}
              className="mt-14"
            />
            <p className="mt-10 font-bold opacity-80">{data[0].title}</p>
            <p className="mt-1 text-lg font-bold opacity-80 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              배당율:{" "}
              <strong className="text-rose-500">{data[0].yield}%</strong>
            </p>
          </article>
          <article className="p-5 w-60 border rounded-xl flex flex-col items-center bg-secondary">
            <p className="w-full text-left font-bold opacity-70">
              배당율 3위 종목
            </p>
            <Image
              src={"/icons/bronze-medal.png"}
              alt="medal"
              width={128}
              height={128}
              className="mt-14"
            />
            <p className="mt-10 font-bold opacity-80">{data[2].title}</p>
            <p className="mt-1 text-lg font-bold opacity-80 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              배당율:{" "}
              <strong className="text-rose-500">{data[2].yield}%</strong>
            </p>
          </article>
        </div>
        <DividendRankTable data={data} />
      </section>
      <Footer />
    </main>
  );
};

export default DividendPage;
