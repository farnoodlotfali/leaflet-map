import { LatLngExpression } from "leaflet";
import { GeoJSONProps } from "react-leaflet";

export interface ICityCenter {
  type: GeoJSONProps["data"]["type"];
  properties: { name: string; fa_name: string };
  geometry: {
    type: GeoJSONProps["data"]["type"];
    coordinates: LatLngExpression;
  };
}
