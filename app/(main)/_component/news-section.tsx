"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { RecentNewsApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export const NewsSection = () => {
  const query = useQuery({
    queryKey: ["news", "recent"],
    queryFn: RecentNewsApi,
  });

  if (!query.isSuccess) {
    return null;
  }

  return (
    <div className="h-full w-full rounded-xl bg-background">
      <CardHeader>
        <CardTitle>주요 뉴스</CardTitle>
      </CardHeader>
      <div className="p-5 h-60 flex justify-between gap-4">
        <News
          title={query.data.data[0].title}
          id={query.data.data[0].id}
          imageUrl={query.data.data[0].imageUrl}
        />
        <News
          title={query.data.data[1].title}
          id={query.data.data[1].id}
          imageUrl={query.data.data[1].imageUrl}
        />
      </div>
      <ul className="pt-0 p-5 space-y-2">
        <List id={query.data.data[2].id} title={query.data.data[2].title} />
        <List id={query.data.data[3].id} title={query.data.data[3].title} />
        <List id={query.data.data[4].id} title={query.data.data[4].title} />
        <List id={query.data.data[5].id} title={query.data.data[5].title} />
        <List id={query.data.data[6].id} title={query.data.data[6].title} />
      </ul>
    </div>
  );
};

interface CardProps {
  id: number;
  title: string;
  imageUrl: string;
}
const News = ({ id, title, imageUrl }: CardProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="p-2 h-full w-full flex flex-col items-center justify-center rounded-xl hover:bg-c2-100 duration-150"
    >
      <div className="h-60 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <h4 className="p-1 text-sm w-full flex">
        <span className="font-bold w-44 text-ellipsis opacity-70 whitespace-nowrap overflow-hidden">
          {title}
        </span>
      </h4>
    </Link>
  );
};

interface ListProps {
  id: number;
  title: string;
}

const List = ({ id, title }: ListProps) => {
  return (
    <li>
      <Link
        className="p-4 flex items-center justify-between w-full rounded-xl bg-secondary hover:bg-c2-100 duration-150"
        href={`/news/${id}`}
      >
        <h4 className="max-w-[440px] whitespace-nowrap overflow-hidden text-ellipsis text-sm opacity-70 font-medium">
          {title}
        </h4>
        {/* <p className="text-xs opacity-60">11시간 전 · 매일 경제</p> */}
        <p className="text-xs opacity-60">매일 경제</p>
      </Link>
    </li>
  );
};
