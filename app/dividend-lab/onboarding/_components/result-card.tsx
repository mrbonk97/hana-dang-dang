import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface Props {
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  onClick: () => void;
}
export const ResultCard = ({ q2, q3, q4, q5, onClick }: Props) => {
  return (
    <div className="p-5 h-full w-full flex flex-col justify-between items-center flex-shrink-0">
      <Card className="mt-10 w-full max-w-lg border">
        <CardHeader>
          <CardTitle className="opacity-70 font-bold text-lg">요약</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="w-full space-y-5 text-2xl font-bold opacity-80">
            <List title="리스크 성향" answer={q2} />
            <List title="배당 선호도" answer={q3} />
            <List title="관심 산업" answer={q4} />
            <List title="목표 수익" answer={formatNumber(q5) + "만원"} />
          </ul>
        </CardContent>
      </Card>
      <Button onClick={onClick} className="w-full py-8 text-lg font-bold">
        시작하기
      </Button>
    </div>
  );
};

interface ListProps {
  title: string;
  answer: string;
}

const List = ({ title, answer }: ListProps) => {
  return (
    <li className="justify-between grid grid-cols-5">
      <div className="col-span-2">{title}</div>
      <div className="col-span-3 text-right">{answer}</div>
    </li>
  );
};
