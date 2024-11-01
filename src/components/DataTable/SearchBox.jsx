import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBox({ table }) {
  return (
    <div className="relative">
      <Search className="absolute -translate-y-1/2 top-1/2 left-2 size-4 text-neutral-400" />
      <Input
        placeholder="Search email..."
        value={table.getColumn("email")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-xs ps-8"
      />
    </div>
  );
}
