import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import moment from "moment";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("firstName")}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("lastName")}</div>;
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = moment(row.getValue("requestDate")).format("YYYY-MM-DD");
      return <div>{date}</div>;
    },
  },
];
