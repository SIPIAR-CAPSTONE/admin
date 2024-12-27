import { useEffect, useRef } from "react";
import { Marker, useMap } from "react-leaflet";
import { DEFAULT_POSITION } from "./BroadcastMap";
import MapPin from "@/assets/MapPin.png";
import BystanderPin from "@/assets/bystanderMapPin.png";
import ResponderPin from "@/assets/responderMapPin.png";

export default function CustomerMarker({
  position,
  focusPosition,
  type = "alert",
  children,
}) {
  const markerRef = useRef();
  const map = useMap();

  //upon clicking an alertListItem it will change the focusPosition, then the map will
  useEffect(() => {
    //move to the focusPosition
    map.setView([
      focusPosition?.lat || DEFAULT_POSITION[0],
      focusPosition?.lng || DEFAULT_POSITION[1],
    ]);
    //and open popup
    if (
      focusPosition &&
      focusPosition.lat === position[0] &&
      focusPosition.lng === position[1]
    ) {
      markerRef.current.openPopup();
    }
  }, [focusPosition, position]);

  //add ere your custom marker
  const customIcon = L.icon({
    iconUrl:
      type === "alert"
        ? MapPin
        : type === "responder"
        ? ResponderPin
        : BystanderPin,
    iconSize: [30, 30],
    iconAnchor: [16, 28],
  });

  return (
    <Marker ref={markerRef} position={position} icon={customIcon}>
      {children}
    </Marker>
  );
}
