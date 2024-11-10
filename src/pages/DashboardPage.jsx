import { User, UserCheck, Timer, OctagonAlert } from "lucide-react";
import { useState } from "react";
import moment from "moment";

import AnalyticsCard from "@/components/Dashboard/AnalyticCard";
import TopBar from "@/components/TopBar/TopBar";
import IncidentOverviewGraph from "@/components/Dashboard/IncidentOverviewChart";
import H1 from "@/components/ui/H1";
import { PeakTimeIncidentChart } from "@/components/Dashboard/PeakTimeIncidentChart";
import { Button } from "@/components/ui/button";
import { organizeAnalyticsData } from "@/components/Dashboard/dashboard.helper";
import { downloadExcel } from "@/lib/utils";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

const data = {
  breadcrumbs: [
    {
      name: "Dashboard",
      href: "dashboard",
    },
  ],
};

export default function DashboardPage() {
  const [isConfirmationDialogOpen, setConfirmationIsDialogOpen] =
    useState(false);
  const openConfirmationDialog = () => setConfirmationIsDialogOpen(true);

  const TopSummary = [
    {
      id: 1,
      title: "Total Incidents",
      value: 1200,
      valuePostfix: "",
      increase: 26.8,
      increasePostfix: "%",
      description: "from last month",
      icon: OctagonAlert,
    },
    {
      id: 2,
      title: "Total Users",
      value: 1750,
      valuePostfix: "",
      increase: 14,
      increasePostfix: "%",
      description: "from last month",
      icon: User,
    },
    {
      id: 3,
      title: "Verified Users",
      value: 750,
      valuePostfix: "",
      increase: 0,
      increasePostfix: "%",
      description: "from last month",
      icon: UserCheck,
    },
    {
      id: 4,
      title: "Average Response Time",
      value: 10,
      valuePostfix: "min",
      increase: 4,
      increasePostfix: "",
      description: "from last month",
      icon: Timer,
    },
  ];

  const incidentOverviewChartData = [
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

  const peakTimeChartData = [
    {
      timeBlock: "12 AM - 3 AM",
      incidents: 5,
      fill: "var(--color-twelveAmToThreeAm)",
    },
    {
      timeBlock: "3 AM - 6 AM",
      incidents: 3,
      fill: "var(--color-threeAmToSixAm)",
    },
    {
      timeBlock: "6 AM - 9 AM",
      incidents: 30,
      fill: "var(--color-sixAmToNineAm)",
    },
    {
      timeBlock: "9 AM - 12 PM",
      incidents: 10,
      fill: "var(--color-nineAmToTwelvePm)",
    },
    {
      timeBlock: "12 PM - 3 PM",
      incidents: 8,
      fill: "var(--color-twelvePmToThreePm)",
    },
    {
      timeBlock: "3 PM - 6 PM",
      incidents: 9,
      fill: "var(--color-threePmToSixPm)",
    },
    {
      timeBlock: "6 PM - 9 PM",
      incidents: 25,
      fill: "var(--color-sixPmToNinePm)",
    },
    {
      timeBlock: "9 PM - 12 AM",
      incidents: 10,
      fill: "var(--color-ninePmToTwelveAm)",
    },
  ];

  const handleDownload = () => {
    const formattedAnalyticData = organizeAnalyticsData(
      TopSummary,
      incidentOverviewChartData,
      peakTimeChartData
    );

    const timestamp = moment().format("YYYY-MM-DD");
    const fileName = `Analytics-Report_${timestamp}`;
    downloadExcel(formattedAnalyticData, fileName);
  };

  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pb-4 mx-auto space-y-4 md:py-8 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          <H1>Analytics Dashboard</H1>
          <Button onClick={openConfirmationDialog}>Download</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TopSummary.map((item) => (
            <AnalyticsCard
              key={item.id}
              title={item.title}
              value={item.value}
              valuePostfix={item.valuePostfix}
              increase={item.increase}
              increasePostfix={item.increasePostfix}
              description={item.description}
              Icon={item.icon}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <IncidentOverviewGraph
            chartData={incidentOverviewChartData}
            className="md:col-span-4"
          />
          <PeakTimeIncidentChart
            chartData={peakTimeChartData}
            className="md:col-span-3"
          />
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        setOpen={setConfirmationIsDialogOpen}
        title="Download Analytics Report?"
        description="Are you sure you want to download the analytics report?"
        onConfirm={handleDownload}
      />
    </div>
  );
}
