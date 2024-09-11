import { ChartColumnBigIcon, ChartSplineIcon } from "lucide-react";
import Link from "next/link";

export const Leftnav = () => {
  return (
    <aside className="z-50 fixed left-0 top-0 py-4 px-4 h-full w-20 bg-secondary border-r">
      <Card />
    </aside>
  );
};

export const Card = () => {
  return (
    <Link
      href={"/my-invest"}
      className="p-1 h-12 w-12 flex flex-col items-center justify-evenly opacity-70 duration-150 rounded-lg hover:bg-c2-100 hover:opacity-90"
    >
      <ChartColumnBigIcon className="opacity-80" />
      <h4 className="text-xs font-bold text-center">내 투자</h4>
    </Link>
  );
};
