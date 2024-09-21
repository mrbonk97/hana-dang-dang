import { Bannner } from "@/components/banner";
import { TopInfoSection } from "./_components/top-info-section";
import { Button } from "@/components/ui/button";
import { IndexChart } from "./_components/index-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: { id: string };
};

const IndexPage = async ({ params }: Props) => {
  const data = await fetch(
    `http://localhost:8080/api/indexes/long/${params.id}`
  ).then((res) => res.json());

  console.log(data);
  return (
    <main className="pt-14 pb-12 pl-96 h-full flex flex-col">
      <TopInfoSection
        value={data.output1.bstp_nmix_oprc}
        previous={data.output1.bstp_nmix_prdy_vrss}
        previousPercentage={data.output1.bstp_nmix_prdy_ctrt}
      />
      <section className="p-5 h-full flex gap-5">
        <div className="p-5 h-full w-full border rounded-xl">
          <IndexChart data={data.output2} />
        </div>
        <div className="h-full flex-shrink-0 w-96 flex flex-col justify-between gap-5">
          <Card className="h-full border">
            <CardHeader>
              <CardTitle className="opacity-70">상세정보</CardTitle>
              <CardContent>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <div className="h-full w-full rounded-xl border"></div>
          <Button className="py-8 rounded-xl text-base">지수 목록</Button>
        </div>
      </section>
      <section className="fixed bottom-0">
        <Bannner />
      </section>
    </main>
  );
};

export default IndexPage;
