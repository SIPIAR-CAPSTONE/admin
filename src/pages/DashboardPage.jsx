import { User, UserCheck, Timer, OctagonAlert } from "lucide-react";
import { useEffect, useState } from "react";
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
import supabase from "@/supabase/config";
import AnalyticsCardSkeleton from "@/components/Skeletons/AnalyticsCardSkeleton";

const data = {
  breadcrumbs: [
    {
      name: "Dashboard",
      href: "dashboard",
    },
  ],
};

export default function DashboardPage() {
  const formatResponseTime = (responseTimeInMinutes) => {
    responseTimeInMinutes = Math.round(responseTimeInMinutes * 100) / 100;

    if (responseTimeInMinutes < 60) {
      return `${responseTimeInMinutes.toFixed(2)} minute${
        responseTimeInMinutes === 1 ? "" : "s"
      }`;
    } else {
      const hours = Math.floor(responseTimeInMinutes / 60);
      const minutes = Math.round(responseTimeInMinutes % 60);
      return `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${
        minutes === 1 ? "" : "s"
      }`;
    }
  };

  const [isConfirmationDialogOpen, setConfirmationIsDialogOpen] =
    useState(false);
  const openConfirmationDialog = () => setConfirmationIsDialogOpen(true);
  const [loading, setLoading] = useState(false);
  const [TopSummary, setTopSummary] = useState([]);

  const [incidentOverviewChartData, setIncidentOverviewChartData] = useState(
    []
  );

  const [peakTimeChartData, setPeakTimeChartData] = useState([
    {
      timeBlock: "12 AM - 3 AM",
      incidents: 0,
      fill: "var(--color-twelveAmToThreeAm)",
    },
    {
      timeBlock: "3 AM - 6 AM",
      incidents: 0,
      fill: "var(--color-threeAmToSixAm)",
    },
    {
      timeBlock: "6 AM - 9 AM",
      incidents: 0,
      fill: "var(--color-sixAmToNineAm)",
    },
    {
      timeBlock: "9 AM - 12 PM",
      incidents: 0,
      fill: "var(--color-nineAmToTwelvePm)",
    },
    {
      timeBlock: "12 PM - 3 PM",
      incidents: 0,
      fill: "var(--color-twelvePmToThreePm)",
    },
    {
      timeBlock: "3 PM - 6 PM",
      incidents: 0,
      fill: "var(--color-threePmToSixPm)",
    },
    {
      timeBlock: "6 PM - 9 PM",
      incidents: 0,
      fill: "var(--color-sixPmToNinePm)",
    },
    {
      timeBlock: "9 PM - 12 AM",
      incidents: 0,
      fill: "var(--color-ninePmToTwelveAm)",
    },
  ]);

  const fetchTotalIncidents = async () => {
    try {
      setLoading(true);

      const { data: peakMonth } = await supabase
        .from("BROADCAST")
        .select("*")
        .not("date", "is", null);

      const currentIncidents = peakMonth.filter(
        (record) =>
          new Date(record.date).getMonth() === moment().month() &&
          new Date(record.date).getFullYear() === moment().year()
      ).length;

      const previousIncidents = peakMonth.filter(
        (record) => new Date(record.date).getMonth() !== moment().month()
      ).length;

      const { data: bystander } = await supabase
        .from("BYSTANDER")
        .select("*", { count: "exact" });

      const currentBystanders = bystander.filter(
        (record) =>
          new Date(record.created_at).getMonth() === moment().month() &&
          new Date(record.created_at).getFullYear() === moment().year()
      ).length;

      const previousBystanders = bystander.filter(
        (record) => new Date(record.created_at).getMonth() !== moment().month()
      ).length;

      const { data: verifiedBystanders } = await supabase
        .from("BYSTANDER")
        .select("*", { count: "exact" })
        .eq("is_verified", true);

      const responseTimes = peakMonth
        .filter((record) => record.response_time !== null)
        .map((record) => {
          const incidentDate = new Date(record.date);
          const responseDate = new Date(record.response_time);

          return (responseDate - incidentDate) / (1000 * 60);
        });

      const averageResponseTime =
        responseTimes.length > 0
          ? responseTimes.reduce((acc, time) => acc + time, 0) /
            responseTimes.length
          : 0;
      const averageResponseTimeFormatted =
        formatResponseTime(averageResponseTime);

      setTopSummary([
        {
          id: 1,
          title: "Total Incidents",
          value: previousIncidents + currentIncidents,
          valuePostfix: "",
          increase: currentIncidents,
          description: "added this month",
          icon: OctagonAlert,
        },
        {
          id: 2,
          title: "Total Bystanders",
          value: previousBystanders + currentBystanders,
          valuePostfix: "",
          increase: currentBystanders,
          increasePostfix: "",
          description: "added this month",
          icon: User,
        },
        {
          id: 3,
          title: "Verified Bystanders",
          value: verifiedBystanders.length,
          valuePostfix: "",
          icon: UserCheck,
        },
        {
          id: 4,
          title: "Average Response Time",
          value: averageResponseTimeFormatted,
          icon: Timer,
        },
      ]);

      const counts = {
        Jan: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 0 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Feb: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 1 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Mar: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 2 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Apr: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 3 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        May: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 4 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Jun: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 5 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Jul: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 6 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Aug: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 7 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Sep: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 8 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Oct: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 9 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Nov: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 10 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
        Dec: peakMonth.filter(
          (record) =>
            new Date(record.date).getMonth() === 11 &&
            new Date(record.date).getFullYear() === moment().year()
        ).length,
      };

      setIncidentOverviewChartData([
        { month: "Jan", incidents: counts.Jan },
        { month: "Feb", incidents: counts.Feb },
        { month: "Mar", incidents: counts.Mar },
        { month: "Apr", incidents: counts.Apr },
        { month: "May", incidents: counts.May },
        { month: "Jun", incidents: counts.Jun },
        { month: "Jul", incidents: counts.Jul },
        { month: "Aug", incidents: counts.Aug },
        { month: "Sep", incidents: counts.Sep },
        { month: "Oct", incidents: counts.Oct },
        { month: "Nov", incidents: counts.Nov },
        { month: "Dec", incidents: counts.Dec },
      ]);

      const { data, error } = await supabase
        .from("BROADCAST")
        .select("date")
        .not("date", "is", null);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const countsTime = {
        "12 AM - 3 AM": 0,
        "3 AM - 6 AM": 0,
        "6 AM - 9 AM": 0,
        "9 AM - 12 PM": 0,
        "12 PM - 3 PM": 0,
        "3 PM - 6 PM": 0,
        "6 PM - 9 PM": 0,
        "9 PM - 12 AM": 0,
      };

      data.forEach((record) => {
        if (new Date(record.date).getFullYear() === moment().year()) {
          const hour = new Date(record.date).getHours();
          if (hour >= 0 && hour < 3) countsTime["12 AM - 3 AM"]++;
          else if (hour >= 3 && hour < 6) countsTime["3 AM - 6 AM"]++;
          else if (hour >= 6 && hour < 9) countsTime["6 AM - 9 AM"]++;
          else if (hour >= 9 && hour < 12) countsTime["9 AM - 12 PM"]++;
          else if (hour >= 12 && hour < 15) countsTime["12 PM - 3 PM"]++;
          else if (hour >= 15 && hour < 18) countsTime["3 PM - 6 PM"]++;
          else if (hour >= 18 && hour < 21) countsTime["6 PM - 9 PM"]++;
          else if (hour >= 21 && hour < 24) countsTime["9 PM - 12 AM"]++;
        }
      });

      const updatedData = peakTimeChartData.map((block) => ({
        ...block,
        incidents: countsTime[block.timeBlock],
      }));

      setPeakTimeChartData(updatedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalIncidents();

    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "BROADCAST" },
        async () => {
          fetchTotalIncidents();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

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
      <div className="px-4 pt-2 pb-4 mx-auto space-y-4 2xl:pt-4 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          <H1>Analytics Dashboard</H1>
          <Button onClick={openConfirmationDialog}>Download</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading
            ? TopSummaryPlaceholder.map((item) => (
                <AnalyticsCardSkeleton
                  key={item.id}
                  title={item.title}
                  valuePostfix={item.valuePostfix}
                  Icon={item.icon}
                />
              ))
            : TopSummary.map((item) => (
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
            loading={loading}
          />
          <PeakTimeIncidentChart
            chartData={peakTimeChartData}
            className="md:col-span-3"
            loading={loading}
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

const TopSummaryPlaceholder = [
  {
    id: 1,
    title: "Total Incidents",
    value: null,
    valuePostfix: "",
    increase: null,
    description: "added this month",
    icon: OctagonAlert,
  },
  {
    id: 2,
    title: "Total Bystanders",
    value: null,
    valuePostfix: "",
    increase: null,
    increasePostfix: "",
    description: "added this month",
    icon: User,
  },
  {
    id: 3,
    title: "Verified Bystanders",
    value: null,
    valuePostfix: "",
    icon: UserCheck,
  },
  {
    id: 4,
    title: "Average Response Time",
    value: null,
    icon: Timer,
  },
];
