import TableHeadButton from "@/components/DataTable/TableHeadButton";
import { Badge } from "@/components/ui/badge";
import { cn, exactMatchFilter } from "@/lib/utils";

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
    id: "is_available",
    accessorKey: "is_available",
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Available"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      const isAvailable = row.getValue("is_available") === true ? "Yes" : "No";

      return (
        <Badge
          className={cn(
            "rounded-md",
            isAvailable === "Yes"
              ? "bg-green-500  dark:bg-green-600 dark:text-white"
              : "bg-neutral-400  dark:bg-neutral-600 dark:text-white"
          )}
        >
          {isAvailable}
        </Badge>
      );
    },
  },
];
