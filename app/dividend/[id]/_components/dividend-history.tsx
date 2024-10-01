import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: {
    id: number;
    code: string;
    title: string;
    amount: number;
    percentage: number;
    dividendType: string;
    declareDate: string;
    payDate: string;
  }[];
}

export const DividendHistoryCard = ({ data }: Props) => {
  return (
    <Card className="h-full flex flex-col w-[600px] overflow-hidden flex-shrink-0">
      <CardHeader>
        <CardTitle>배당 내역</CardTitle>
        <CardDescription>최근 5년치 배당 데이터입니다.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>배당락</TableHead>
              <TableHead>지급일</TableHead>
              <TableHead>유형</TableHead>
              <TableHead className="text-right">배당금</TableHead>
              <TableHead className="text-right">수익률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.declareDate}
                </TableCell>
                <TableCell>{item.payDate}</TableCell>
                <TableCell>{item.dividendType}</TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.amount)}원
                </TableCell>
                <TableCell className="text-right">{item.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
