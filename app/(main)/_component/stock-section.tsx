import Image from "next/image";

export const StockSection = () => {
  return (
    <aside className="flex-shrink-0 p-5 h-full w-96 border-l bg-secondary">
      <h3 className="text-lg font-bold opacity-80">관심주식 TOP 10</h3>
      <p className="text-sm font-medium opacity-60">관심 그룹에 담아보세요</p>
      <ul className="mt-5 space-y-3">
        <List />
        <List />
        <List />
        <List />
      </ul>
    </aside>
  );
};

const List = () => {
  return (
    <li className="flex items-center justify-between gap-2 border-b p-3 rounded-lg bg-background hover:bg-c1-100 cursor-pointer duration-150">
      <div className="flex items-center gap-2">
        <Image
          src={"/vercel.svg"}
          alt="sam"
          width={50}
          height={50}
          className="overflow-hidden h-10 w-10 rounded-full bg-rose-200"
        />
        <span className="font-medium opacity-80">삼성전자</span>
      </div>
      <div>
        <div className="font-bold opacity-80">69,000원</div>
        <div className="text-xs font-medium opacity-60 text-blue-500">
          -1000(-1.4%)
        </div>
      </div>
    </li>
  );
};
