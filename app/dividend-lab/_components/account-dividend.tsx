import { Button } from "@/components/ui/button";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountDividendHistoryType } from "@/lib/account-api";
import { formatNumber } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  isPending: boolean;
  isSuccess: boolean;
  data: AccountDividendHistoryType[] | undefined;
}

export const AccountDividend = ({ isPending, isSuccess, data }: Props) => {
  return (
    <Card className="border w-[600px] flex-shrink-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="opacity-80">배당 내역</CardTitle>
          <CardDescription>최근 배당금 입급 내역 입니다.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            전체 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold opacity-80">
                배당 입급일
              </TableHead>
              <TableHead className="font-bold opacity-80">종목명</TableHead>
              <TableHead className="font-bold opacity-80 text-right">
                금액
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
        <div className="w-full" />
      </CardContent>
    </Card>
  );

  let total = 0;
  data.forEach((item) => (total += item.amount));
  return (
    <Card className="border w-[600px] flex-shrink-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="opacity-80">배당 내역</CardTitle>
          <CardDescription>최근 배당금 입급 내역 입니다.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            전체 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold opacity-80">
                배당 입급일
              </TableHead>
              <TableHead className="font-bold opacity-80">종목명</TableHead>
              <TableHead className="font-bold opacity-80 text-right">
                금액
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium opacity-80">
                  {item.createdAt.substring(0, 10)}
                </TableCell>
                <TableCell className="font-medium opacity-80">
                  {item.stockInfo.prdt_abrv_name}
                </TableCell>
                <TableCell className="font-medium opacity-80 text-right">
                  {formatNumber(item.amount)}원
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>종합</TableCell>
              <TableCell className="font-bold opacity-80 text-right">
                {formatNumber(total)}원
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};
