import { cn, getTimeGap } from "@/lib/utils";
import { Ambulance, ChevronRight } from "lucide-react";

export default function AlertListItem({
  status,
  bystanderName,
  time,
  location,
  onClick,
  ...props
}) {
  const timeValue = getTimeGap(time);

  return (
    <div
      onClick={onClick}
      className="flex items-center w-full p-2 rounded-lg cursor-pointer gap-x-2 bg-neutral-100 dark:bg-neutral-800 dark:text-white"
      {...props}
    >
      <ResponderStatus status={status} />
      <div className="flex-1">
        <div className="space-x-1.5">
          <span aria-label="emergency requestor name" className="font-semibold">
            {location}
          </span>
          <span
            aria-label="emergency request time"
            className="text-xs text-neutral-500"
          >
            {timeValue}
          </span>
        </div>
        <p
          aria-label="emergency request location"
          className="overflow-hidden text-xs truncate md:w-60 text-neutral-800 dark:text-neutral-300"
        >
          {bystanderName}
        </p>
      </div>
      <ChevronRight className="size-6" />
    </div>
  );
}
function ResponderStatus({ status = "Pending" }) {
  const statusValue = {
    completed: "Completed",
    going: "Responder Going",
    pending: "No Responder",
  };

  // Determine the appropriate key for the status
  const statusKey =
    status === "Completed"
      ? "completed"
      : status === "On Going"
      ? "going"
      : "pending";

  return (
    <div className="w-16">
      <Ambulance
        className={cn(
          "mx-auto size-6",
          statusKey === "completed"
            ? "text-blue-500"
            : statusKey === "going"
            ? "text-green-500"
            : "text-red-500"
        )}
      />
      <span
        aria-label="emergency request status"
        className="text-[0.5rem] block text-center text-neutral-600 dark:text-neutral-400"
      >
        {statusValue[statusKey]}
      </span>
    </div>
  );
}
