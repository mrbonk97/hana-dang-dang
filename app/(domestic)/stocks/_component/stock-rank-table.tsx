"use client";
import { Spinner } from "@/components/spinner/spinner";
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
import { getStockListRankApi, StockListRankType } from "@/lib/stock-api";
import { formatNumber } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  defaultData: StockListRankType[];
}

export const StockRankTable = ({ defaultData }: Props) => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [sortType, setSortType] = useState("vol");
  const [tableData, setTableData] = useState(defaultData);

  const { mutate, isPending } = useMutation({
    mutationFn: (type: string) => {
      setSortType(type);
      return getStockListRankApi(type);
    },
    onMutate: () => setIsSuccess(false),
    onSuccess: (e) => {
      setTableData(e);
      setTimeout(() => setIsSuccess(true), 500);
    },
  });

  return (
    <section className="pt-5 p-10 w-[1200px]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">실시간 순위</h1>
        <p className="text-sm font-medium opacity-60">
          상위 30개까지 표시됩니다.
        </p>
      </hgroup>
      <div className="relative mt-5 flex items-center gap-5">
        <Button
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
          onClick={() => mutate("vol")}
        >
          <h4 className="text-sm">거래량 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">거래량이 많은 종목</p>
        </Button>
        <Button
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
          onClick={() => mutate("rsfl")}
        >
          <h4 className="text-sm">등락률 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">주가가 변동이 큰 종목</p>
        </Button>
        <Button
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
          onClick={() => mutate("power")}
        >
          <h4 className="text-sm">체결강도 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">체결강도가 강한 종목</p>
        </Button>
        <Button
          className="p-5 h-20 w-56 flex flex-col items-start justify-start font-bold opacity-80"
          onClick={() => mutate("short")}
        >
          <h4 className="text-sm">공매도 순위</h4>
          <p className="mt-0.5 text-xs opacity-90">공매도가 강한 종목</p>
        </Button>
        <div className="z-20 -ml-20 h-24 w-56 flex2 bg-gradient-to-r from-transparent from-10% to-40% to-background">
          <Button
            variant={"outline"}
            className="ml-5 p-0 h-10 w-10 flex2 border rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순번</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead className="text-right">현재가</TableHead>
            <TableHead className="text-right">등락률</TableHead>

            {sortType == "vol" && (
              <>
                <TableHead className="text-right">전일거래량</TableHead>
                <TableHead className="text-right">누적거래대금</TableHead>
                <TableHead className="text-right">거래량</TableHead>
              </>
            )}
            {sortType == "rsfl" && (
              <>
                <TableHead className="text-right">최저가</TableHead>
                <TableHead className="text-right">최고가</TableHead>
                <TableHead className="text-right">최저가 대비 현재가</TableHead>
                <TableHead className="text-right">거래량</TableHead>
              </>
            )}
            {sortType == "power" && (
              <>
                <TableHead className="text-right">당일체결강도</TableHead>
                <TableHead className="text-right">매수 체결량</TableHead>
                <TableHead className="text-right">거래량</TableHead>
              </>
            )}
            {sortType == "short" && (
              <>
                <TableHead className="text-right">공매도 체결 수량</TableHead>
                <TableHead className="text-right">공매도 비중</TableHead>
                <TableHead className="text-right">공매도 거래 대금</TableHead>
                <TableHead className="text-right">거래량</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            tableData.map((item, idx) => {
              let code = "000000";
              if (sortType == "vol") code = item.mksc_shrn_iscd;
              if (sortType == "rsfl") code = item.stck_shrn_iscd;
              if (sortType == "power") code = item.stck_shrn_iscd;
              if (sortType == "short") code = item.mksc_shrn_iscd;

              return (
                <TableRow key={"stock-rank" + code}>
                  <TableCell className="text-c1-300">{idx + 1}</TableCell>

                  <TableCell>
                    <Link
                      href={`/stocks/${code}`}
                      className="flex items-center gap-3 font-medium hover:underline underline-offset-4"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={`/kospi-icons/${
                            code.charAt(5) != "0"
                              ? code.substring(0, 5) + "0"
                              : code
                          }.png`}
                        />
                        <AvatarFallback>
                          {item.hts_kor_isnm.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {item.hts_kor_isnm}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.stck_prpr)}원
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm ${
                      item.prdy_vrss.charAt(0) == "-"
                        ? "text-blue-500"
                        : "text-rose-500"
                    }`}
                  >
                    <div>{formatNumber(item.prdy_vrss)}원</div>
                    <div>({formatNumber(item.prdy_ctrt)}%)</div>
                  </TableCell>
                  {sortType == "vol" && (
                    <>
                      <TableCell className="text-right">
                        {formatNumber(item.prdy_vol)}주
                      </TableCell>

                      <TableCell className="text-right">
                        {formatNumber(
                          (parseInt(item.acml_tr_pbmn) / 100000000).toFixed(0)
                        )}
                        억원
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.acml_vol)}주
                      </TableCell>
                    </>
                  )}
                  {sortType == "rsfl" && (
                    <>
                      <TableCell className="text-right">
                        {formatNumber(item.stck_lwpr)}원
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.stck_hgpr)}원
                      </TableCell>
                      <TableCell className="text-right">
                        {item.lwpr_vrss_prpr_rate}%
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.acml_vol)}주
                      </TableCell>
                    </>
                  )}
                  {sortType == "power" && (
                    <>
                      <TableCell className="text-right">
                        {formatNumber(item.tday_rltv)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.seln_cnqn_smtn)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.acml_vol)}주
                      </TableCell>
                    </>
                  )}
                  {sortType == "short" && (
                    <>
                      <TableCell className="text-right">
                        {formatNumber(item.ssts_cntg_qty)}주
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.ssts_vol_rlim)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.ssts_tr_pbmn)}원
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.acml_vol)}주
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {!isSuccess && (
        <div className="pt-28 pb-20 h-[1000px] w-full justify-center">
          <Spinner />
        </div>
      )}
    </section>
  );
};
