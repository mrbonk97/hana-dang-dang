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
  isPending: boolean;
  isSuccess: boolean;
  data: undefined | DividendEstimateType[];
}

export function EstimateTable({ isPending, isSuccess, data }: Props) {
  if (isPending || !isSuccess || data == undefined) {
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
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="h-12">
                <div className="h-1/2 w-full rounded-xl bg-secondary animate-pulse" />
                <div className="mt-1 h-1/2 w-2/3 rounded-xl bg-secondary animate-pulse delay-300" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

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
          {data.map((item) => (
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
