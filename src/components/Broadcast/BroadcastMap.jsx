import { MapContainer, TileLayer } from "react-leaflet";
import CustomerMarker from "@/components/Broadcast/CustomMarker";
import PopupAlert from "@/components/Broadcast/PopupAlert";

export const DEFAULT_POSITION = [8.44, 124.64];

export default function BroadcastMap({
  emergencyAlerts,
  responders,
  focusPosition,
}) {
  return (
    <div className="size-full">
      <MapContainer center={DEFAULT_POSITION} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {emergencyAlerts.map((alert) => {
          const lng = alert.coordinate?.longitude || 0;
          const lat = alert.coordinate?.latitude || 0;
          const position = [lat, lng];

          return (
            <CustomerMarker
              key={alert.id}
              position={position}
              focusPosition={focusPosition}
            >
              <PopupAlert alert={alert} responders={responders} />
            </CustomerMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
