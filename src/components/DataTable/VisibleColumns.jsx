import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

export default function VisibleColumns({ table }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent ps-3 md:pe-3.5 dark:bg-transparent dark:bg-neutral-700  dark:text-white"
        >
          <Settings2 />
          <span className="font-normal">Columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-neutral-700">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
