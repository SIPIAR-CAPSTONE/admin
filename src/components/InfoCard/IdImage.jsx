import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export default function IdImage({ label, loading, src }) {
  return (
    <div className="max-w-xs space-y-2">
      <Label className="text-sm ray-500">{label}</Label>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <div className="overflow-hidden rounded-lg">
              <ImagePreview loading={loading} src={src} label={label} />
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

const ImagePreview = ({ loading, src, label }) => {
  if (loading) return <IdImagePreviewSkeleton />;

  if (!src) return <IdImagePreviewSkeleton animate={false} />;

  return (
    <img
      src={src}
      alt={`ID ${label}`}
      className="object-cover transition-transform duration-300 h-[11.25rem] aspect-video group-hover:scale-105"
    />
  );
};

const IdImagePreviewSkeleton = ({ animate = true }) => {
  return (
    <div
      class={cn(
        "flex items-center justify-center h-[11.25rem] bg-neutral-300 rounded dark:bg-neutral-700",
        animate && "animate-pulse"
      )}
    >
      <svg
        className="w-10 h-10 text-neutral-200 dark:text-neutral-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
      </svg>
    </div>
  );
};
