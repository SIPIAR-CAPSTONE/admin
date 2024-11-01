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
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Condition
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("condition")}</div>;
    },
  },
  {
    accessorKey: "assessment",
    header: "Assessment",
    cell: ({ row }) => {
      return <div>{row.getValue("assessment")}</div>;
    },
  },
];
