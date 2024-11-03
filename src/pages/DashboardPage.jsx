import { User, UserCheck, Timer, OctagonAlert } from "lucide-react";

import AnalyticsCard from "@/components/Dashboard/AnalyticCard";
import TopBar from "@/components/TopBar/TopBar";
import IncidentOverviewGraph from "@/components/Dashboard/IncidentOverviewChart";
import H1 from "@/components/ui/H1";
import { PeakTimeIncidentChart } from "@/components/Dashboard/PeakTimeIncidentChart";

const data = {
  breadcrumbs: [
    {
      name: "Dashboard",
      href: "dashboard",
    },
  ],
  TopSummary: [
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
  ],
};

export default function DashboardPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 py-8 mx-auto space-y-4 max-w-screen-2xl">
        <H1>Analytics Dashboard</H1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.TopSummary.map((item) => (
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
          <IncidentOverviewGraph className="md:col-span-4" />
          <PeakTimeIncidentChart className="md:col-span-3" />
        </div>
      </div>
    </div>
  );
}
