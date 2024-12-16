import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AnalyticsCardSkeleton({ title, Icon }) {
  return (
    <Card className="shadow rounded-xl dark:bg-neutral-800 min-h-[9.15rem]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="font-semibold">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-neutral-500" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold pb-1.5">
          <Skeleton className="w-full h-8 bg-neutral-100 dark:bg-neutral-800 dark:text-white" />
        </div>
        <div className="text-sm text-gray-400 mt-1.5">
          <Skeleton className="w-40 h-4 bg-neutral-100 dark:bg-neutral-800 dark:text-white" />
        </div>
      </CardContent>
    </Card>
  );
}
