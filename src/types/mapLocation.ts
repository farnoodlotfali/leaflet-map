import { LatLng } from "leaflet";

export type MapLocationRequest = LatLng | undefined;

export interface MapLocationResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: 1063266452;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: 26;
  importance: 0.05341565804531926;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    neighbourhood: string;
    residential: string;
    suburb: string;
    borough: string;
    city: string;
    district: string;
    county: string;
    province: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
}
