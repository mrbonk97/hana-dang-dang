"use client";
import { StockSection } from "./_components/stock-section";
import { SearchSection } from "./_components/search-section";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/nav/footer";
import { CompareDialog } from "./_components/compare-dialog";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const ComparePage = ({ searchParams }: Props) => {
  if (searchParams == undefined || searchParams.e1 == undefined)
    return <main>비교할 종목이없음</main>;

  return (
    <main className="pt-14 pl-96 min-h-full">
      <div className="min-h-full flex">
        <StockSection type="blue" code={searchParams.e1} />
        <SearchSection />
      </div>
      <section className="p-10">
        <CompareDialog>
          <Button className="h-20 p-5 w-full flex gap-10 text-3xl font-bold">
            AI 비교하기
          </Button>
        </CompareDialog>
      </section>
      <Footer />
    </main>
  );
};

export default ComparePage;
