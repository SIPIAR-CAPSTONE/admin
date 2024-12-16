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
  if (loading) return <IdImagePreviewSkeletonLoading />;

  if (!src) return <IdImagePreviewSkeleton />;

  return (
    <img
      src={src}
      alt={`ID ${label}`}
      className="object-cover transition-transform duration-300 h-[11.25rem] aspect-video group-hover:scale-105"
    />
  );
};

const IdImagePreviewSkeleton = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-[11.25rem] bg-neutral-300 rounded dark:bg-neutral-700"
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

const IdImagePreviewSkeletonLoading = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-[11.25rem] bg-neutral-300 rounded dark:bg-neutral-700",
        "animate-pulse"
      )}
    >
      {/* Animated 4 dots SVG loader */}
      <svg
        className="w-12 h-12 text-neutral-200 dark:text-neutral-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 20"
      >
        <circle cx="10" cy="10" r="10" className="dot" />
        <circle cx="30" cy="10" r="10" className="dot" />
        <circle cx="50" cy="10" r="10" className="dot" />
        <circle cx="70" cy="10" r="10" className="dot" />

        <style>
          {`
            .dot {
              fill: currentColor;
              animation: bounce 1.4s infinite ease-in-out;
            }
            .dot:nth-child(1) {
              animation-delay: 0s;
            }
            .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .dot:nth-child(3) {
              animation-delay: 0.4s;
            }
            .dot:nth-child(4) {
              animation-delay: 0.6s;
            }

            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-10px);
              }
              60% {
                transform: translateY(-5px);
              }
            }
          `}
        </style>
      </svg>
    </div>
  );
};
