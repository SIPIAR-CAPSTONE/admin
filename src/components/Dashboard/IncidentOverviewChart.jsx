"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";
import { cn } from "@/lib/utils";
import BarChartSkeleton from "../Skeletons/BarChartSkeleton";

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-5))",
  },
};

export default function IncidentOverviewChart({
  chartData,
  className,
  loading,
  ...props
}) {
  const currentYear = moment().year();

  return (
    <Card className={cn("dark:bg-neutral-800 h-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Incidents Overview</CardTitle>
        <CardDescription>Previous year - {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <BarChartSkeleton />
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                label={{
                  value: "Number  of Incidents",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="incidents"
                fill="var(--color-incidents)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
