import { LatLng } from "leaflet";

export const stringToLatLng = (val: string): LatLng => {
  const arr = val.split(",");
  return { lat: Number(arr[0]), lng: Number(arr[1]) } as LatLng;
};
