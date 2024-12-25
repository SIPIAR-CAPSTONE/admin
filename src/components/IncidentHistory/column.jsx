import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";
import { Badge } from "@/components/ui/badge";
import { capitalize, cn, exactMatchFilter } from "@/lib/utils";
import { getResponseTimeDuration } from "../Dashboard/dashboard.helper";

export const columns = [
  {
    accessorKey: "bystanderName",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Bystander"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("bystanderName")}</div>;
    },
  },
  {
    accessorKey: "responderName",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Responder"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("responderName")}</div>;
    },
  },
  {
    accessorKey: "responseTime",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Response Time"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const incidentRequestDate = row.getValue("date");
      const responseTime = row.getValue("responseTime");

      if (!responseTime || responseTime === "-")
        return <div>Not yet responded</div>;

      const duration = getResponseTimeDuration(
        incidentRequestDate,
        responseTime,
        true
      );

      return <div>{duration}</div>;
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
    accessorKey: "time",
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
              : condition === "Unstable"
              ? "bg-red-500  dark:bg-red-600 dark:text-white"
              : "bg-gray-500  dark:bg-gray-600 dark:text-white"
          )}
        >
          {condition}
        </Badge>
      );
    },
  },
];
