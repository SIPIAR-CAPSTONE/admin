import { cn } from "@/lib/utils";

export default function ErrorMessage({ errorMessage, className }) {
  if (!errorMessage) return;

  return (
    <p
      className={cn("text-[0.8rem]  text-red-500 dark:text-red-500", className)}
    >
      {errorMessage}
    </p>
  );
}
