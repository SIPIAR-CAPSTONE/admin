import { getTimeString } from "@/lib/utils";
import { Bell } from "lucide-react";

export default function NotificationItem({ title, desc, date }) {
  const time = getTimeString(date);

  return (
    <div aria-label="notification item" className="flex items-start gap-x-4">
      <div className="text-white mt-2 bg-primary-500 p-1.5 rounded-full">
        <Bell className="size-3" />
      </div>
      <div className="flex flex-1 gap-x-4">
        <div className="flex-1">
          <span
            aria-label="notification title"
            className="block text-base font-semibold"
          >
            {title}
          </span>
          <p
            aria-label="notification description"
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {desc}
          </p>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{time}</p>
      </div>
    </div>
  );
}
