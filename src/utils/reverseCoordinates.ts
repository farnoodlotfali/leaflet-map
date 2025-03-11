import { LatLngExpression } from "leaflet";

export const reverseCoordinates = (
  val: LatLngExpression | string
): LatLngExpression => {
  return val
    .toString()
    .split(",")
    .map((item) => Number(item))
    .reverse() as LatLngExpression;
};
