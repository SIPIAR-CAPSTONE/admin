"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import moment from "moment";
import DonutChartSkeleton from "../Skeletons/DonutChartSkeleton";

export const description = "A donut chart with an active sector";

const chartConfig = {
  twelveAmToThreeAm: {
    label: "12 AM - 3 AM",
    color: "hsl(var(--chart-1))",
  },
  threeAmToSixAm: {
    label: "3 AM - 6 AM",
    color: "hsl(var(--chart-2))",
  },
  sixAmToNineAm: {
    label: "6 AM - 9 AM",
    color: "hsl(var(--chart-3))",
  },
  nineAmToTwelvePm: {
    label: "9 AM - 12 PM",
    color: "hsl(var(--chart-4))",
  },
  twelvePmToThreePm: {
    label: "12 PM - 3 PM",
    color: "hsl(var(--chart-5))",
  },
  threePmToSixPm: {
    label: "3 PM - 6 PM",
    color: "hsl(var(--chart-6))",
  },
  sixPmToNinePm: {
    label: "6 PM - 9 PM",
    color: "hsl(var(--chart-7))",
  },
  ninePmToTwelveAm: {
    label: "9 PM - 12 AM",
    color: "hsl(var(--chart-8))",
  },
};

export function PeakTimeIncidentChart({
  chartData,
  loading,
  className,
  ...props
}) {
  const currentYear = moment().year();

  return (
    <Card
      className={cn("flex flex-col dark:bg-neutral-800", className)}
      {...props}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Peak TIme Incident</CardTitle>
        <CardDescription>Previous year - {currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <DonutChartSkeleton />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto md:mt-4 aspect-square max-h-72 2xl:max-h-80"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="incidents"
                nameKey="timeBlock"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Previous year {currentYear} <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Display the most common times incidents occur.
        </div>
      </CardFooter>
    </Card>
  );
}
