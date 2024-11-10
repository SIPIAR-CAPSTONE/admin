import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TableHeadButton({ label, onClick }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="font-semibold text-white hover:bg-primary-400 hover:text-white dark:hover:bg-primary-900"
    >
      {label}
      <ArrowUpDown className="w-4 h-4 ml-2" />
    </Button>
  );
}
