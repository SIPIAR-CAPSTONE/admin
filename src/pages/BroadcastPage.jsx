import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertListItem from "@/components/Broadcast/AlertListItem";
import AlertListHeader from "@/components/Broadcast/AlertListHeader";
import BroadcastMap from "@/components/Broadcast/BroadcastMap";
import useBroadcast from "@/hooks/useBroadcast";
import BroadcastListSkeleton from "@/components/Skeletons/BroadcastListSkeleton";
import useActiveUsers from "@/hooks/useActiveUser";

const data = {
  breadcrumbs: [
    {
      name: "Broadcast",
      href: "broadcast",
    },
  ],
};

export default function BroadcastPage() {
  const [focusPosition, setFocusPosition] = useState({});
  const [selectedFilterStatus, setSelectedFilterStatus] = useState(null);
  const {
    emergencyAlerts,
    responders,
    loading: broadcastLoading,
  } = useBroadcast();
  const { users: activeUsers } = useActiveUsers();

  const filteredAlerts = useMemo(
    () =>
      emergencyAlerts.filter((alert) =>
        selectedFilterStatus === null
          ? true
          : alert.status === selectedFilterStatus
      ),
    [selectedFilterStatus, emergencyAlerts, focusPosition]
  );

  const alertsLength = filteredAlerts.length;

  const listContent = useMemo(() => {
    return filteredAlerts.map((alert) => {
      const fullName = `${alert?.USER?.first_name} ${alert?.USER?.last_name}`;
      const position = {
        lat: alert.latitude,
        lng: alert.longitude,
      };

      return (
        <AlertListItem
          key={alert.broadcast_id}
          bystanderName={fullName}
          location={alert.address}
          status={alert.status}
          time={alert.date}
          onClick={() => setFocusPosition(position)}
        />
      );
    });
  }, [filteredAlerts, focusPosition]);

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pt-2 pb-4 mx-auto space-y-4 2xl:pt-4 max-w-screen-2xl">
        <H1>Current Incidents</H1>
        <div className="flex flex-col h-full gap-4 md:flex-row">
          <div className="flex-1 border aspect-video">
            <BroadcastMap
              emergencyAlerts={filteredAlerts}
              activeUsers={activeUsers}
              responders={responders}
              focusPosition={focusPosition}
            />
          </div>

          <div>
            <AlertListHeader
              label="EMERGENCY ALERTS"
              length={alertsLength}
              selectedFilterStatus={selectedFilterStatus}
              setSelectedFilterStatus={setSelectedFilterStatus}
            />
            <ScrollArea className="md:w-96 h-[28.5rem] px-2.5 2xl:h-[42rem]">
              <div className="space-y-2">
                {broadcastLoading ? <BroadcastListSkeleton /> : listContent}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
