import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";
import { Badge } from "@/components/ui/badge";
import { capitalize, cn, exactMatchFilter } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Bystander"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      console.log(row.original);
      return <div>{row.original.reporterName}</div>;
    },
  },
  {
    accessorKey: "barangay",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Barangay"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("barangay")}</div>;
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
      const date = moment(row.getValue("date")).format("MMMM D, YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => {
      return <TableHeadButton label="Time" noIcon />;
    },
    cell: ({ row }) => {
      const time = moment(row.getValue("date")).format("hh:mm A");
      return <div>{time}</div>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Active Status"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={cn(
            "rounded-md",
            status === "Completed"
              ? "bg-blue-500 dark:bg-blue-600 dark:text-white"
              : status === "On Going"
              ? "bg-green-500  dark:bg-green-600 dark:text-white"
              : "bg-red-500  dark:bg-red-600 dark:text-white"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "condition",
    accessorKey: "condition",
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Patient Condition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const condition = capitalize(row.getValue("condition"));
      return (
        <Badge
          className={cn(
            "rounded-md",
            condition === "Stable"
              ? "bg-green-500  dark:bg-green-600 dark:text-white"
              : "bg-red-500  dark:bg-red-600 dark:text-white"
          )}
        >
          {condition}
        </Badge>
      );
    },
  },
];
