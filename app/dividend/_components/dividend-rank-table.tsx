"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

interface Props {
  data: {
    id: number;
    title: string;
    code: string;
    market: string;
    dividend: string;
    yield: string;
    yield2: string;
    faceValue: string;
    stacMonth: string;
    stockType: string;
  }[];
}

// 종목명	주식종류	시장구분	주당배당금	시가배당율	액면가배당율	액면가	결산월
export function DividendRankTable({ data }: Props) {
  const [data2, setData2] = useState(data);

  const order1 = () => {
    const _data = [...data].sort((o1, o2) => {
      const _o1 = parseFloat(o1.yield);
      const _o2 = parseFloat(o2.yield);
      return _o2 - _o1;
    });
    setData2(_data);
  };

  const order2 = () => {
    const _data = [...data].sort((o1, o2) => {
      const _o1 = parseFloat(o1.dividend);
      const _o2 = parseFloat(o2.dividend);
      return _o2 - _o1;
    });
    setData2(_data);
  };

  const order3 = () => {
    const _data = [...data].sort((o1, o2) => {
      const _o1 = parseFloat(o1.yield2);
      const _o2 = parseFloat(o2.yield2);
      return _o2 - _o1;
    });
    setData2(_data);
  };

  return (
    <>
      <div className="mt-10 flex gap-5">
        <Button
          onClick={order1}
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
        >
          <h4 className="text-sm">배당율 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">배당율이 높은순</p>
        </Button>
        <Button
          onClick={order2}
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
        >
          <h4 className="text-sm">배당금 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">배당금이 높은순</p>
        </Button>
        <Button
          onClick={order3}
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
        >
          <h4 className="text-sm">액면가 배당율 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">액면가 배당율이 높은순</p>
        </Button>
        <Button
          onClick={order3}
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
        >
          <h4 className="text-sm">결산월 정렬</h4>
          <p className="mt-0.5 text-xs opacity-90">결산월 기준 정렬</p>
        </Button>
      </div>
      <Table className="mt-10 p-5 max-w-[1200px] w-full bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead>주식 종류</TableHead>
            <TableHead>시장구분</TableHead>
            <TableHead className="text-right">배당금</TableHead>
            <TableHead className="text-right">배당율</TableHead>
            <TableHead className="text-right">액면가배당율</TableHead>
            <TableHead className="text-right">액면가</TableHead>
            <TableHead>결산월</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data2.map((item, idx) => (
            <TableRow key={`div-rank-${item.code}`}>
              <TableCell className="text-c1-300">{idx + 1}</TableCell>
              <TableCell>
                <Link
                  href={`/dividend/${item.code}`}
                  className="font-medium flex items-center gap-5"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`/kospi-icons/${
                        item.code.charAt(5) == "0"
                          ? item.code
                          : item.code.substring(0, 5) + "0"
                      }.png`}
                    />
                    <AvatarFallback>{item.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.stockType}</TableCell>
              <TableCell>{item.market}</TableCell>
              <TableCell className="text-right">{item.dividend}원</TableCell>
              <TableCell
                className={`text-right ${
                  parseFloat(item.yield) > 5 && "font-medium text-rose-500"
                }`}
              >
                {item.yield}%
              </TableCell>
              <TableCell className="text-right">{item.yield2}%</TableCell>
              <TableCell className="text-right">{item.faceValue}원</TableCell>
              <TableCell>{item.stacMonth}월</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
