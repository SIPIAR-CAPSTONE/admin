import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBox({ table, searchColumn }) {
  return (
    <div className="relative w-full">
      <Search className="absolute -translate-y-1/2 top-1/2 left-2 size-4 text-neutral-400" />
      <Input
        placeholder={`Search ${searchColumn}...`}
        value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn(searchColumn)?.setFilterValue(event.target.value)
        }
        className="md:max-w-xs ps-8"
      />
    </div>
  );
}
