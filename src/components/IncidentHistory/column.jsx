import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Location"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("location")}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Date"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const date = moment(row.getValue("date")).format("YYYY-MM-DD");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Condition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const condition =
        row.getValue("condition") === "stable" ? "Stable" : "Unstable";
      return (
        <Badge
          className={cn(
            "rounded-md",
            condition === "Stable"
              ? "bg-green-500 hover:bg-green-500 dark:bg-green-600 dark:text-white dark:hover:bg-green-600"
              : "bg-red-500 hover:bg-red-500 dark:bg-red-600 dark:text-white dark:hover:bg-red-600"
          )}
        >
          {condition}
        </Badge>
      );
    },
  },
  {
    accessorKey: "assessment",
    header: "Assessment",
    cell: ({ row }) => {
      return (
        <div className="min-w-40 md:min-w-0">{row.getValue("assessment")}</div>
      );
    },
  },
];
