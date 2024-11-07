import { cn } from "@/lib/utils";

export default function AlertListHeader({ label, length = 0 }) {
  const alertCountStyle = (length) => {
    if (length < 10) {
      return "text-sm";
    } else if (length < 100) {
      return "text-xs";
    } else if (length < 1000) {
      return "text-[0.65rem]";
    } else {
      return "text-[0.5rem]";
    }
  };

  return (
    <div className="flex items-center justify-between px-3 mb-3">
      <h2 className="text-lg font-semibold leading-none dark:text-white">{label}</h2>
      <div
        aria-label="emergency alerts size"
        className={cn(
          "text-white rounded-full  size-6 bg-primary-500 grid place-items-center",
          alertCountStyle(length)
        )}
      >
        {length}
      </div>
    </div>
  );
}
