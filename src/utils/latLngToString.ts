import { LatLng } from "leaflet";

export const latLngToString = (val: LatLng): string => {
  return `${val.lat},${val.lng}`;
};
