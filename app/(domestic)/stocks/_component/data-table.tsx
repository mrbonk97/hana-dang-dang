"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../../../../components/ui/separator";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import { StockListRankType } from "@/lib/stock-api";

export const columns: ColumnDef<StockListRankType>[] = [
  {
    accessorKey: "hts_kor_isnm",
    header: "주식명",
    cell: ({ row }) => (
      <div className="py-2 opacity-70">{row.getValue("hts_kor_isnm")}</div>
    ),
  },
  {
    accessorKey: "idxBztpMclsCdName",
    header: "카테고리",
    cell: ({ row }) => (
      <div className="opacity-70">{row.getValue("idxBztpMclsCdName")}</div>
    ),
  },
  {
    accessorKey: "stck_prpr",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          className="text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          현재가
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue("stck_prpr")
      );

      return <div className="text-right opacity-70">{formattedNumber}원</div>;
    },
  },
  {
    accessorKey: "prdy_vrss",
    header: () => <div className="text-right">전일 대비</div>,
    cell: ({ row }) => {
      const value = parseInt(row.getValue("prdy_vrss"));

      return (
        <div
          className={`text-right opacity-70 ${
            value < 0 ? "text-blue-500" : "text-rose-500"
          }`}
        >
          <div>{formatNumber(value)}원</div>
        </div>
      );
    },
  },

  {
    accessorKey: "acml_vol",
    header: () => <div className="text-right">거래량</div>,
    cell: ({ row }) => {
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue("acml_vol")
      );
      return <div className="text-right opacity-70">{formattedNumber}주</div>;
    },
  },
];

interface TableProps {
  data: StockListRankType[];
}

export function StockListTable({ data }: TableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <section className="mt-5 font-bold w-full">
      <div className="text-xs opacity-60">
        검색된 주식 · {table.getRowCount()}개
      </div>
      <Separator className="my-3" />
      <div className="flex items-center py-4">
        <Input
          placeholder="주식 검색"
          value={
            (table.getColumn("hts_kor_isnm")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("hts_kor_isnm")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              필터링 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/stocks/${row.original.mksc_shrn_iscd}`)
                  }
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center opacity-70"
                >
                  결과 없음.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="opacity-70">이전</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="opacity-70">다음</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
