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
      const requestDate = row.getValue("requestDate");

      if (!requestDate) return <div>-</div>;

      const date = moment(requestDate).format("MMMM D, YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "requestTime",
    header: () => {
      return <TableHeadButton label="Request Time" noIcon />;
    },
    cell: ({ row }) => {
      const requestDate = row.getValue("requestDate");

      if (!requestDate) return <div>-</div>;

      const time = moment(requestDate).format("hh:mm A");
      return <div>{time}</div>;
    },
  },
];
