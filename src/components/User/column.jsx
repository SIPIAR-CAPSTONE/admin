import TableHeadButton from "@/components/DataTable/TableHeadButton";
import { Badge } from "@/components/ui/badge";
import { cn, exactMatchFilter } from "@/lib/utils";

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
    id: "isVerified",
    accessorKey: "isVerified",
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Verified"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const isVerified = row.getValue("isVerified") === true ? "Yes" : "No";

      return (
        <Badge
          className={cn(
            "rounded-md",
            isVerified === "Yes"
              ? "bg-green-500  dark:bg-green-600 dark:text-white"
              : "bg-neutral-400  dark:bg-neutral-600 dark:text-white"
          )}
        >
          {isVerified}
        </Badge>
      );
    },
  },
];
