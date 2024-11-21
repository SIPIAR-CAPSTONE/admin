import { useState } from "react";
import {
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
import TableFooter from "@/components/DataTable/TableFooter";
import VisibleColumns from "@/components/DataTable/VisibleColumns";
import SearchBox from "@/components/DataTable/SearchBox";
import { useNavigate } from "react-router-dom";
import H1 from "@/components/ui/H1";
import { FacetedFilter } from "@/components/DataTable/FacetedFilter";

export function DataTable({
  columns,
  data,
  tableName,
  searchColumn = "email",
  filterColumn,
  filterTitle,
  filterOptions,
  statePropKeys = [],
}) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-lg md:px-6 md:border md:shadow md:py-2 md:dark:bg-neutral-800 md:dark:border-neutral-700 dark:text-white">
      <div className="flex flex-col gap-2 py-4 md:items-center md:justify-between md:flex-row">
        <H1 className="md:pb-0">{tableName}</H1>
        <div className="flex justify-end w-full md:w-auto gap-x-2">
          {filterColumn && filterOptions && (
            <FacetedFilter
              column={table.getColumn(filterColumn)}
              title={filterTitle}
              options={filterOptions}
            />
          )}
          <VisibleColumns table={table} />
          <SearchBox table={table} searchColumn={searchColumn} />
        </div>
      </div>

      <div className="border dark:border-neutral-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary-500 hover:bg-primary-500 dark:bg-primary-700 hover:dark:bg-primary-800"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-center text-white dark:text-white"
                    >
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    const state = statePropKeys.reduce((acc, key) => {
                      acc[key] = row.original?.[key];
                      return acc;
                    }, {});

                    navigate(row.original.id, {
                      state: state,
                    });
                  }}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
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
                  className="h-24 text-center dark:text-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableFooter table={table} />
    </div>
  );
}
