import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";

export const columns = [
  {
    accessorKey: "issueType",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Issue Type"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("issueType")}</div>;
    },
  },
  {
    accessorKey: "issueDescription",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Issue Description"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("issueDescription")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Email"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
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
];
