import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TableHeadButton({ label, onClick, noIcon = false }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "font-semibold text-white hover:bg-primary-400 hover:text-white dark:hover:bg-primary-900",
        noIcon && "cursor-default hover:bg-transparent"
      )}
    >
      {label}
      {!noIcon && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
}
