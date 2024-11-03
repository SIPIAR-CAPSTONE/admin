import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";

export default function IdImage({ label, src }) {
  return (
    <div className="max-w-xs space-y-2">
      <Label className="text-sm ray-500">{label}</Label>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <div className="overflow-hidden rounded-lg ">
              <img
                src={src}
                alt={`ID ${label}`}
                className="object-cover transition-transform duration-300 aspect-video group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black rounded-lg opacity-0 bg-opacity-40 group-hover:opacity-100">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="hidden" />
          <Description className="hidden" />
          <img
            src={src}
            alt={`ID ${label} (Full Size)`}
            className="object-contain w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
