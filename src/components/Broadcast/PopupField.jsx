import { CircleHelp } from "lucide-react";

export default function PopupField({
  value,
  label,
  Icon = CircleHelp,
  iconColor,
  iconBgColor,
}) {
  return (
    <div className="flex items-center gap-x-2">
      <div
        aria-label="icon"
        className="p-2 rounded-full"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon className="size-4" style={{ color: iconColor }} />
      </div>
      <div>
        <span
          aria-label="value"
          className="block text-base font-medium dark:text-white"
        >
          {value || " - "}
        </span>
        <span aria-label="label" className="block -mt-1 text-neutral-500">
          {label}
        </span>
      </div>
    </div>
  );
}
