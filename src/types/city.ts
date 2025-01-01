import { LatLngExpression } from "leaflet";

export interface ICity {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    coordinates: LatLngExpression[];
  };
}
