import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Header({ title, className, ...props }) {
  return (
    <header
      className={cn("flex items-center px-2.5 py-3.5", className)}
      {...props}
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4 ms-2 me-4" />
      <h1 className="text-base dark:text-white">{title}</h1>
    </header>
  );
}
