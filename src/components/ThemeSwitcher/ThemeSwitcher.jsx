import { Switch } from "@/components/ui/switch";
import { Palette } from "lucide-react";
import useTheme from "@/components/ThemeSwitcher/useTheme";

export default function ThemeSwitcher() {
  const { handleThemeChange, enabled, theme } = useTheme();

  return (
    <div className="relative flex select-none items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors  focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
      <Palette />
      Theme
      <Switch
        className="ml-auto"
        onCheckedChange={handleThemeChange}
        checked={enabled}
      />
    </div>
  );
}
