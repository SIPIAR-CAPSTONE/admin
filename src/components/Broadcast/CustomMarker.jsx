import { useEffect, useRef } from "react";
import { Marker, useMap } from "react-leaflet";
import { DEFAULT_POSITION } from "./BroadcastMap";
import MapPin from "@/assets/MapPin.png";

export default function CustomerMarker({ position, focusPosition, children }) {
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
    iconUrl: MapPin,
    iconSize: [35, 35],
    iconAnchor: [18, 30],
  });

  return (
    <Marker ref={markerRef} position={position} icon={customIcon}>
      {children}
    </Marker>
  );
}
