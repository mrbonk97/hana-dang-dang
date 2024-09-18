import {
  ChartColumnBigIcon,
  ChartSplineIcon,
  FlameIcon,
  HeartIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface LeftnavProps {
  bgB?: boolean;
}

export const Leftnav = ({ bgB }: LeftnavProps) => {
  return (
    <aside
      className={`z-50 fixed left-0 top-0 py-4 px-2 h-full w-16 border-r space-y-2
        ${bgB ? "bg-background" : "bg-secondary"}`}
    >
      <Card
        title="내 투자"
        icon={<ChartColumnBigIcon className="opacity-80" />}
      />
      <Card
        title="관심"
        icon={<HeartIcon fill="black" className="opacity-80" />}
      />
      <Separator className="w-full" />
      <Card
        title="인기종목"
        icon={<FlameIcon fill="black" className="opacity-80" />}
      />
    </aside>
  );
};

interface CardProps {
  title: string;
  icon: React.ReactNode;
}

const Card = ({ title, icon }: CardProps) => {
  return (
    <Link
      href={"/my-invest"}
      className="p-1 w-12 flex flex-col items-center justify-evenly opacity-70 duration-150 rounded-lg hover:bg-c2-100 hover:opacity-90"
    >
      {icon}
      <h4 className="text-[10px] font-bold text-center">{title}</h4>
    </Link>
  );
};
