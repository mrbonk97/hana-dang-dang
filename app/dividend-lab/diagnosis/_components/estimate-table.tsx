import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DividendEstimateType } from "@/lib/account-api";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: undefined | DividendEstimateType[];
}

export function EstimateTable({ data }: Props) {
  return (
    <div className="p-5 border rounded-xl shadow-sm">
      <Table className="h-96 w-[1000px] overflow-y-auto">
        <TableHeader>
          <TableRow>
            <TableHead>종목명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">주당 예상 배당금</TableHead>
            <TableHead className="text-right">배당율</TableHead>
            <TableHead className="text-right">총 예상 배당금</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data != undefined &&
            data.map((item) => (
              <TableRow key={item.code + "estimate"}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-right">{item.quantity}주</TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.amount)}원
                </TableCell>
                <TableCell className="text-right">
                  {item.percentage.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(item.estimateProfit)}원
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
