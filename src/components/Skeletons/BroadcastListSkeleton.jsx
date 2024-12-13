import { Skeleton } from "../ui/skeleton";

export default function BroadcastListSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-14 bg-neutral-100 dark:bg-neutral-800 dark:text-white" />
      <Skeleton className="w-full h-14 bg-neutral-100 dark:bg-neutral-800 dark:text-white" />
      <Skeleton className="w-full h-14 bg-neutral-100 dark:bg-neutral-800 dark:text-white" />
    </>
  );
}
