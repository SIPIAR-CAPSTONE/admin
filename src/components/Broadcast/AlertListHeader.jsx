import { ListFilter, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";

export default function AlertListHeader({
  label,
  length = 0,
  selectedFilterStatus,
  setSelectedFilterStatus,
}) {
  return (
    <div className="flex items-center justify-between px-3 mb-3">
      <h2 className="text-lg font-semibold leading-none dark:text-white">
        {label}
      </h2>
      <div className="flex items-center gap-x-2">
        <SelectFilter
          selectedFilterStatus={selectedFilterStatus}
          setSelectedFilterStatus={setSelectedFilterStatus}
        />
        <ListCount length={length} />
      </div>
    </div>
  );
}

function SelectFilter({ selectedFilterStatus, setSelectedFilterStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const statusFilter = [
    {
      label: "Responder Going",
      value: "going",
    },
    {
      label: "No Responder",
      value: "pending",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="relative rounded-full shadow-none dark:hover:bg-neutral-800 dark:bg-neutral-700 text-neutral-800 size-7 hover:bg-neutral-200 bg-neutral-100 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ListFilter className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div className="space-y-1.5">
          {statusFilter.map((item) => (
            <Button
              key={item.value}
              className={cn(
                "w-full text-black bg-transparent shadow-none hover:bg-neutral-100 dark:bg-neutral-700 dark:border-none border dark:hover:bg-neutral-800 dark:text-white",
                selectedFilterStatus === item.value &&
                  "bg-primary-500 text-white select-none hover:bg-primary-600 border-none dark:hover:bg-primary-500 dark:bg-primary-600"
              )}
              onClick={() => setSelectedFilterStatus(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {selectedFilterStatus && (
          <>
            <Separator className="mt-3" />
            <Button
              className="w-full text-black bg-transparent rounded-none shadow-none dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-white"
              onClick={() => setSelectedFilterStatus(null)}
            >
              <span>Clear Filter</span>
              <X />
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

function ListCount({ length }) {
  return (
    <div
      aria-label="emergency alerts size"
      className={cn(
        "text-white rounded-full size-7 font-medium bg-primary-500  grid place-items-center",
        alertCountStyle(length)
      )}
    >
      {length}
    </div>
  );
}

function alertCountStyle(length) {
  if (length < 10) {
    return "text-sm";
  } else if (length < 100) {
    return "text-xs";
  } else if (length < 1000) {
    return "text-[0.65rem]";
  } else {
    return "text-[0.5rem]";
  }
}
