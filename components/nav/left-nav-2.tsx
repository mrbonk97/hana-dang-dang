import Link from "next/link";
import { Separator } from "../ui/separator";

export const Leftnav2 = () => {
  return (
    <aside className="z-50 fixed left-20 top-14 p-5 h-full w-80 border-r bg-background">
      <h4 className="font-bold opacity-70">실시간 차트</h4>
      <p className="text-sm font-bold opacity-60">오늘 13:22 기준</p>
      <Separator className="my-2 w-full" />
      <ul className="space-y-2 overflow-y-auto">
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
      </ul>
    </aside>
  );
};

export const List = () => {
  return (
    <li>
      <Link
        href={"/stocks/123456"}
        className="py-4 px-3 rounded-lg font-bold flex justify-between hover:bg-c1-100 duration-150"
      >
        <div className="opacity-60">
          <span className="text-c1-300">1</span>
          <span className="ml-2">삼성전자</span>
        </div>
        <span className="opacity-70">65,427원</span>
      </Link>
    </li>
  );
};
