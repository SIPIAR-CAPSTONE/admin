import moment from "moment";
import TableHeadButton from "@/components/DataTable/TableHeadButton";

export const columns = [
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
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="First Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
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
        <TableHeadButton
          label="Last Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
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
        <TableHeadButton
          label="Request Date"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const date = moment(row.getValue("requestDate")).format("YYYY-MM-DD");
      return <div>{date}</div>;
    },
  },
];
