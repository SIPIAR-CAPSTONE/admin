import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";

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
