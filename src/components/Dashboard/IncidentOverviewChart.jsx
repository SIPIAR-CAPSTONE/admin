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

const chartData = [
  { month: "Jan", incidents: 10 },
  { month: "Feb", incidents: 25 },
  { month: "Mar", incidents: 1 },
  { month: "Apr", incidents: 13 },
  { month: "May", incidents: 39 },
  { month: "Jun", incidents: 14 },
  { month: "Jul", incidents: 39 },
  { month: "Aug", incidents: 11 },
  { month: "Sep", incidents: 22 },
  { month: "Oct", incidents: 17 },
  { month: "Nov", incidents: 5 },
  { month: "Dec", incidents: 2 },
];

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-5))",
  },
};

export default function IncidentOverviewChart({ className, ...props }) {
  const currentYear = moment().year();

  return (
    <Card className={cn("dark:bg-neutral-800", className)} {...props}>
      <CardHeader>
        <CardTitle>Incidents Overview</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
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
            <Bar dataKey="incidents" fill="var(--color-incidents)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
