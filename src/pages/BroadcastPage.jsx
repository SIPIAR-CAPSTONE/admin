import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertListItem from "@/components/Broadcast/AlertListItem";
import AlertListHeader from "@/components/Broadcast/AlertListHeader";
import BroadcastMap from "@/components/Broadcast/BroadcastMap";

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
  const [responders, setResponders] = useState(TEMP_RESPONDER_DATA);
  const [selectedFilterStatus, setSelectedFilterStatus] = useState(null);
  const [origEmergencyAlerts, setOrigEmergencyAlerts] =
    useState(TEMP_ALERTS_DATA);
  const filteredAlerts = useMemo(
    () =>
      origEmergencyAlerts.filter((alert) => {
        //if no selectedFilterStatus
        if (selectedFilterStatus === null) {
          return alert;
        }
        //if alert matched with selectedFilterStatus
        else if (alert.status === selectedFilterStatus) {
          return alert;
        }
      }),
    [selectedFilterStatus, origEmergencyAlerts]
  );
  const alertsLength = filteredAlerts.length;

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pt-2 pb-4 mx-auto space-y-4 2xl:pt-4 max-w-screen-2xl">
        <H1>Current Incidents</H1>
        <div className="flex flex-col h-full gap-6 md:flex-row">
          <div className="flex-1 border aspect-video">
            <BroadcastMap
              emergencyAlerts={filteredAlerts}
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
                {filteredAlerts.map((alert) => {
                  const fullName = `${alert.first_name} ${alert.last_name}`;
                  const position = {
                    lat: alert.coordinate.latitude,
                    lng: alert.coordinate.longitude,
                  };

                  return (
                    <AlertListItem
                      key={alert.id}
                      bystanderName={fullName}
                      location={alert.address}
                      status={alert.status}
                      time={alert.time}
                      onClick={() => setFocusPosition(position)}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

//!remove this after applying fetching
const TEMP_RESPONDER_DATA = [
  {
    id: 1,
    name: "Alex Smith",
    status: "available",
  },
  {
    id: 2,
    name: "Maria Johnson",
    status: "unavailable",
  },
  {
    id: 3,
    name: "Bob Johnson",
    status: "available",
  },
];

const TEMP_ALERTS_DATA = [
  {
    id: 1,
    distance: 500,
    createdAt: "2024-07-01T05:22:31.269Z",
    address: "Elmwood Park, 24 Oak Street",
    condition: true,
    first_name: "Alex",
    last_name: "Smith",
    coordinate: { latitude: 8.424359, longitude: 124.637703 },
    status: "going",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: 1,
  },
  {
    id: 2,
    distance: 520,
    createdAt: "2024-07-01T07:12:45.569Z",
    address: "Greenwood, 18 Pine Avenue",
    condition: true,
    first_name: "Maria",
    last_name: "Johnson",
    coordinate: { latitude: 8.43456, longitude: 124.64 },
    status: "going",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: 2,
  },
  {
    id: 3,
    distance: 480,
    createdAt: "2024-07-01T08:25:10.849Z",
    address: "Riverside, 35 Maple Street",
    condition: true,
    first_name: "John",
    last_name: "Doe",
    coordinate: { latitude: 8.41, longitude: 124.63 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 4,
    distance: 510,
    createdAt: "2024-08-01T09:45:23.123Z",
    address: "Lakeside, 22 Willow Road",
    condition: false,
    first_name: "Emma",
    last_name: "Brown",
    coordinate: { latitude: 8.42, longitude: 124.62 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 5,
    distance: 530,
    createdAt: "2024-07-01T11:15:33.647Z",
    address: "Springfield, 40 Cedar Lane",
    condition: true,
    first_name: "Michael",
    last_name: "Wilson",
    coordinate: { latitude: 8.444444, longitude: 124.65 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 6,
    distance: 470,
    createdAt: "2024-07-01T12:30:49.512Z",
    address: "Hillcrest, 50 Elm Street",
    condition: false,
    first_name: "Sophia",
    last_name: "Lee",
    coordinate: { latitude: 8.46, longitude: 124.67 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 7,
    distance: 490,
    createdAt: "2024-07-01T13:45:59.823Z",
    address: "Oakwood, 28 Oak Street",
    condition: true,
    first_name: "Olivia",
    last_name: "Martin",
    coordinate: { latitude: 8.43, longitude: 124.66 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 8,
    distance: 540,
    createdAt: "2024-07-01T15:00:10.123Z",
    address: "Maplewood, 32 Maple Street",
    condition: false,
    first_name: "Ava",
    last_name: "Harris",
    coordinate: { latitude: 8.45, longitude: 124.68 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 9,
    distance: 460,
    createdAt: "2024-07-01T16:15:20.456Z",
    address: "Pineview, 20 Pine Avenue",
    condition: true,
    first_name: "Ethan",
    last_name: "Walker",
    status: "pending",
    coordinate: { latitude: 8.42, longitude: 124.61 },
    assignedResponderId: null,
  },
  {
    id: 10,
    distance: 550,
    createdAt: "2024-07-01T17:30:30.789Z",
    address: "Cedarwood, 30 Cedar Lane",
    condition: false,
    first_name: "Charlotte",
    last_name: "Roberts",
    status: "pending",
    coordinate: { latitude: 8.44, longitude: 124.62 },
    assignedResponderId: null,
  },
  {
    id: 11,
    distance: 480,
    createdAt: "2024-07-01T18:45:40.123Z",
    address: "Oakwood, 28 Oak Street",
    condition: true,
    first_name: "Amelia",
    last_name: "Turner",
    coordinate: { latitude: 8.43, longitude: 124.66 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
  {
    id: 12,
    distance: 560,
    createdAt: "2024-07-01T19:00:50.456Z",
    address: "Maplewood, 32 Maple Street",
    condition: false,
    first_name: "Harper",
    last_name: "Parker",
    coordinate: { latitude: 8.45, longitude: 124.68 },
    status: "pending",
    time: "2023-02-15T14:30:00-08:00",
    assignedResponderId: null,
  },
];
