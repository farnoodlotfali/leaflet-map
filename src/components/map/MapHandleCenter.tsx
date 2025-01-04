import { useMap, useMapEvents } from "react-leaflet";

const MapHandleCenter = ({ setCenter }: any) => {
  const map = useMap();
  useMapEvents({
    moveend() {
      setTimeout(() => {
        setCenter([map.getCenter().lat, map.getCenter().lng]);
      }, 500);
    },
  });

  return null;
};

export default MapHandleCenter;
