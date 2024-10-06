import { Button } from "@/components/ui/button";
import { NewsType } from "@/lib/news-api";
import Image from "next/image";
import Link from "next/link";

interface NewsSectionProps {
  data: NewsType[];
}

export const NewsSection = ({ data }: NewsSectionProps) => {
  return (
    <section className="pt-0 p-5 max-w-[1200px]">
      <hgroup>
        <h1 className="text-lg font-bold opacity-80">주요 뉴스</h1>
        <div className="w-full font-medium opacity-70 flex justify-between">
          <span>최신 뉴스를 확인해보세요</span>
          <Button variant={"link"} asChild>
            <Link href={"/news"}>더보기 </Link>
          </Button>
        </div>
      </hgroup>
      <div className="h-52 mt-5 flex gap-5">
        {data.slice(0, 4).map((item) => (
          <List
            key={`news-${item.id}`}
            title={item.title}
            id={item.id}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

interface ListProps {
  title: string;
  id: number;
  imageUrl: string;
}
const List = ({ id, title, imageUrl }: ListProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="p-2 h-full w-1/4 flex flex-col justify-between gap-2 border rounded-xl group hover:bg-secondary duration-150"
    >
      <Image
        src={imageUrl}
        alt="news-1"
        width={256}
        height={256}
        className="h-full w-full rounded-xl overflow-hidden object-cover"
      />
      <p className="w-60 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-medium opacity-80 group-hover:underline underline-offset-4">
        {title}
      </p>
    </Link>
  );
};
