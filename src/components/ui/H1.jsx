import { cn } from "@/lib/utils";

export default function H1({ children, className, ...props }) {
  return (
    <h1
      className={cn("pb-2 text-2xl lg:text-3xl font-bold dark:text-white tracking-tight", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
