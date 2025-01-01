import { CITY_CENTER_POINTS } from "./city-center";

export const CITY_CENTER_ITEMS = CITY_CENTER_POINTS.features.map((item) => ({
  title: item.properties.fa_name,
  value: item.geometry.coordinates.toString(),
}));
