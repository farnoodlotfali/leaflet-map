import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapHandleFlyTo = ({ flyTo }: any) => {
  const map = useMap();

  useEffect(() => {
    if (flyTo?.center) {
      map.flyTo(flyTo?.center, flyTo?.zoom ?? map.getZoom());
    }
  }, [flyTo, map]);

  return null;
};

export default MapHandleFlyTo;
