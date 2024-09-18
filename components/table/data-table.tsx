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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { StockWithPriceType } from "@/type";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<StockWithPriceType>[] = [
  {
    accessorKey: "prdtAbrvName",
    header: "주식명",
    cell: ({ row }) => (
      <div className="py-2 opacity-70">{row.getValue("prdtAbrvName")}</div>
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
    accessorKey: "stckClpr",
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
        row.getValue("stckClpr")
      );

      return <div className="text-right opacity-70">{formattedNumber}원</div>;
    },
  },
  {
    accessorKey: "prdyVrss",
    header: () => <div className="text-right">전일 대비</div>,
    cell: ({ row }) => {
      const value = parseInt(row.getValue("prdyVrss"));
      const formattedNumber = new Intl.NumberFormat().format(value);

      const today = parseInt(row.getValue("stckClpr"));
      const previous = today + value;
      const percentage = today / previous;
      const val = percentage > 1 ? percentage - 1 : 1 - percentage;

      return (
        <div
          className={`text-right opacity-70 ${
            value < 0 ? "text-blue-500" : "text-rose-500"
          }`}
        >
          <div>{formattedNumber}원</div>
          <div className="text-xs">{(val * 100).toFixed(2)}%</div>
        </div>
      );
    },
  },

  {
    accessorKey: "acmlVol",
    header: () => <div className="text-right">거래량</div>,
    cell: ({ row }) => {
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue("acmlVol")
      );
      return <div className="text-right opacity-70">{formattedNumber}주</div>;
    },
  },
];

interface TableProps {
  data: StockWithPriceType[];
}

export function DataTableDemo({ data }: TableProps) {
  console.log(data);
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
            (table.getColumn("prdtAbrvName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("prdtAbrvName")?.setFilterValue(event.target.value)
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
                  onClick={() => router.push(`/stocks/${row.original.code}`)}
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
