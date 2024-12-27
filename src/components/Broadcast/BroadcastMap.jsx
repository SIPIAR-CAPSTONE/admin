import { MapContainer, TileLayer } from "react-leaflet";
import CustomerMarker from "@/components/Broadcast/CustomMarker";
import PopupAlert from "@/components/Broadcast/PopupAlert";
import { useMemo } from "react";
import ActiveUserPopupAlert from "./ActiveUserPopupAlert";

export const DEFAULT_POSITION = [8.44, 124.64];

export default function BroadcastMap({
  emergencyAlerts,
  activeUsers,
  responders,
  focusPosition,
}) {
  const emergencyAlertMapPins = useMemo(
    () =>
      emergencyAlerts?.map((alert) => {
        const lng = alert?.longitude || 0;
        const lat = alert?.latitude || 0;
        const position = [lat, lng];

        return (
          <CustomerMarker
            key={alert.broadcast_id}
            position={position}
            focusPosition={focusPosition}
            type="alert"
          >
            <PopupAlert alert={alert} responders={responders} />
          </CustomerMarker>
        );
      }),
    [emergencyAlerts, responders]
  );

  const activeUsersMapPins = useMemo(
    () =>
      activeUsers?.map((user) => {
        const lng = user?.longitude || 0;
        const lat = user?.latitude || 0;
        const position = [lat, lng];

        return (
          <CustomerMarker
            key={user.user_id}
            position={position}
            focusPosition={focusPosition}
            type={user?.role || "bystander"}
          >
            <ActiveUserPopupAlert user={user} />
          </CustomerMarker>
        );
      }),
    [activeUsers]
  );

  return (
    <div className="size-full">
      <MapContainer center={DEFAULT_POSITION} zoom={11} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {emergencyAlertMapPins}
        {activeUsersMapPins}
      </MapContainer>
    </div>
  );
}
