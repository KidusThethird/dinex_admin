"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: string;
  type: string;
}

export function DataTableGenerator<TData, TValue>({
  columns,
  data,
  filterBy,
  type,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  let filterBytoDisplay = "";

  switch (type) {
    case "waiter":
      filterBytoDisplay = "First Name";
      break;
      case "item":
      filterBytoDisplay = "Name";
      break;
    case "package":
      filterBytoDisplay = "Package Name";
      break;
    case "course":
      filterBytoDisplay = "Course Name";
      break;
    case "section":
      filterBytoDisplay = "Section Name";
      break;
    case "purchase":
      filterBytoDisplay = "Student Id";
      break;
    case "language":
      filterBytoDisplay = "Short Form";
      break;
    case "blog":
      filterBytoDisplay = "Title";
      break;
    case "paymentMethod":
      filterBytoDisplay = "Payment Method";
      break;
    case "prize":
      filterBytoDisplay = "Item Name";
      break;
    case "leaderboard":
      filterBytoDisplay = "Grade";
      break;
    case "prizeOrders":
      filterBytoDisplay = "First Name";
      break;
    default:
  }

  const exportManage = (filterBy: any) => {
    // Export logic can be implemented here
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center my-6 mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="search" className="font-medium">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-primaryColor"
            placeholder={`Filter by ${filterBytoDisplay}`}
            value={
              (table.getColumn(`${filterBy}`)?.getFilterValue() as string) || ""
            }
            onChange={(e) => {
              table.getColumn(`${filterBy}`)?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <Button onClick={() => exportManage(filterBy)} className="bg-primaryColor">
          Export to Excel
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border shadow">
        <Table className="min-w-full table-auto  ">
          <TableHeader className="bg-gray-400 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white p-4 ">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors "
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4 ">
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
                  className="h-24 text-center text-gray-500"
                >
                  No Results Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-primaryColor"
          >
            Prev
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-primaryColor"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataTableGenerator;
