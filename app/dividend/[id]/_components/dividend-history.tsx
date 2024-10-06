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
import { DividendHistoryType } from "@/lib/dividend-api";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: DividendHistoryType[];
}

export const DividendHistoryCard = ({ data }: Props) => {
  return (
    <Card className="pb-1 h-full flex flex-col w-[600px] overflow-hidden flex-shrink-0">
      <CardHeader>
        <CardTitle>배당 내역</CardTitle>
        <CardDescription>최근 10년치 배당 데이터입니다.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>배당락일</TableHead>
              <TableHead>배당 지급일</TableHead>
              <TableHead>배당 유형</TableHead>
              <TableHead className="text-right">주당배당금</TableHead>
              <TableHead className="text-right">연간 배당수익률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`dividend-table=${item.id}`}>
                <TableCell className="font-medium">{item.lockDate}</TableCell>
                <TableCell>{item.payDate}</TableCell>
                <TableCell>{item.dividendType}</TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.amount)}원
                </TableCell>
                <TableCell className="text-right">
                  {item.yieldPercentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
