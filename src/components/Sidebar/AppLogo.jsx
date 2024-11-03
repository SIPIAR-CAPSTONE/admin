import AppLogoImage from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function AppLogo({ logoOnly }) {
  return (
    <div className="flex items-center gap-x-2">
      <img src={AppLogoImage} alt="logo" className="size-[1.938rem]" />
      <span
        aria-label="logo name"
        className={cn("text-lg font-semibold", logoOnly && "hidden")}
      >
        SIPIAR
      </span>
    </div>
  );
}
