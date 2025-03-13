import { LatLngExpression } from "leaflet";
import { MapRoutesResponse } from "@/types";

export const findPolyLineData = (
  route: MapRoutesResponse
): LatLngExpression[] => {
  return route.legs[0].steps
    .map((leg) => leg.geometry.coordinates)
    .flat() as LatLngExpression[];
};
