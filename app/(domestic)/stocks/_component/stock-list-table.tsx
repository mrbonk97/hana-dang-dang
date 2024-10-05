"use client";
import { Spinner } from "@/components/spinner/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStockListApi, StockListType } from "@/lib/stock-api";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  defaultData: StockListType[];
}

export function StockListTable({ defaultData }: Props) {
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [listData, setListData] = useState<StockListType[]>(defaultData);

  const { mutate, isPending } = useMutation({
    mutationFn: () => getStockListApi(page),
    onSuccess: (e) => {
      if (e.length < 25) setEnd(true);
      setListData([...listData, ...e]);
    },
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight && !isPending && !end) {
        mutate();
        setPage((cur) => cur + 1);
      }
    });
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순번</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead className="text-right">전일종가</TableHead>
            <TableHead className="text-right">등락률</TableHead>
            <TableHead className="text-right">거래량</TableHead>
            <TableHead className="text-right">거래대금</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listData.map((item) => (
            <TableRow key={"stock-table" + item.code}>
              <TableCell className="text-c1-300">{item.rn}</TableCell>
              <TableCell>
                <Link
                  href={`/stocks/${item.code}`}
                  className="flex items-center gap-2 font-medium hover:underline underline-offset-4"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`/kospi-icons/${
                        item.code[5] != "0"
                          ? item.code.substring(0, 5) + "0"
                          : item.code
                      }.png`}
                    />
                    <AvatarFallback>
                      {item.prdtAbrvName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {item.prdtAbrvName}
                </Link>
              </TableCell>
              <TableCell>{item.stdIdstClsfCdName}</TableCell>
              <TableCell className="text-right">
                {formatNumber(item.stckClpr)}원
              </TableCell>
              <TableCell
                className={`text-right ${
                  item.prdyVrss.charAt(0) == "-"
                    ? "text-blue-500"
                    : "text-rose-500"
                }`}
              >
                {formatNumber(item.prdyVrss)}원
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(item.acmlVol)}주
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(item.acmlTrPbmn)}원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="h-36 w-full flex2 justify-center">
        {isPending && <Spinner />}
      </div>
    </>
  );
}
