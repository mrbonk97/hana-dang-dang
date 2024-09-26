import { Bannner } from "@/components/banner";
import { TopInfoSection } from "./_components/top-info-section";
import { IndexChart } from "./_components/index-chart";
import { DetailCard } from "./_components/detail-card";
import { IndexInfoType, IndexType } from "@/type";
import { IndexListCard } from "./_components/index-list";

type Props = {
  params: { id: string };
};

const IndexPage = async ({ params }: Props) => {
  const data: {
    output1: IndexInfoType;
    output2: IndexType[];
  } = await fetch(`http://localhost:8080/api/indexes/long/${params.id}`).then(
    (res) => res.json()
  );

  const data2 = await fetch("http://localhost:8080/api/indexes").then((res) =>
    res.json()
  );

  return (
    <main className="pt-14 pb-12 pl-96 h-full flex flex-col min-h-[700px] min-w-[1500px] bg-secondary">
      <TopInfoSection data={data.output1} />
      <section className="p-5 h-full flex gap-5">
        <div className="p-5 h-full w-full border rounded-xl bg-background">
          <IndexChart
            data={data.output2.reverse()}
            curValue={data.output1.bstp_nmix_prpr}
          />
        </div>
        <div className="h-full flex-shrink-0 w-96 flex flex-col justify-between gap-5">
          <DetailCard data={data.output1} />
          <IndexListCard data={data2.output2} />
        </div>
      </section>
      <section className="fixed bottom-0">
        <Bannner className="bg-background" />
      </section>
    </main>
  );
};

export default IndexPage;
