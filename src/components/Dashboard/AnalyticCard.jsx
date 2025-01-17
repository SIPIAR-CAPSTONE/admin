import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AnalyticsCard({
  title,
  value,
  valuePostfix = "",
  increase,
  increasePostfix = "",
  description,
  Icon,
}) {
  const IncreaseValue = increase && (
    <span
      className={`text-sm text-green-500`}
    >
      {`+${increase}${increasePostfix}`}
    </span>
  );

  return (
    <Card className="shadow rounded-xl dark:bg-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="font-semibold">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-neutral-500" />}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold pb-1.5">
          {`${value} ${valuePostfix}`}
        </p>
        <p className="text-sm text-gray-400">
          {IncreaseValue} {description}
        </p>
      </CardContent>
    </Card>
  );
}
