import { Bannner } from "@/components/banner";
import { TopInfoSection } from "./_components/top-info-section";
import { IndexChart } from "./_components/index-chart";
import { DetailCard } from "./_components/detail-card";
import { IndexListCard } from "./_components/index-list";
import { getIndexDetailLongApi, getIndexListApi } from "@/lib/index-api";

type Props = {
  params: { id: string };
};

const IndexPage = async ({ params }: Props) => {
  const data1 = await getIndexDetailLongApi(params.id);
  const data2 = await getIndexListApi();
  const bannerData = await getIndexListApi();

  return (
    <main className="pt-14 pb-12 pl-96 h-full flex flex-col min-h-[700px] min-w-[1500px] bg-secondary">
      <TopInfoSection data={data1.output1} />
      <section className="p-5 h-full flex gap-5">
        <div className="p-5 h-full w-full border rounded-xl bg-background">
          <IndexChart
            data={data1.output2.reverse()}
            curValue={data1.output1.bstp_nmix_prpr}
          />
        </div>
        <div className="h-full flex-shrink-0 w-96 flex flex-col justify-between gap-5">
          <DetailCard data={data1.output1} />
          <IndexListCard data={data2} />
        </div>
      </section>
      <section className="fixed bottom-0">
        <Bannner data={bannerData} className="bg-background" />
      </section>
    </main>
  );
};

export default IndexPage;
