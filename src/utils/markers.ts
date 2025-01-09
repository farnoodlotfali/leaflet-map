import L from "leaflet";
import blueMarkerIcon from "../assets/img/marker-blue.svg";
import greenMarkerIcon from "../assets/img/marker-green.svg";
import redMarkerIcon from "../assets/img/marker-red.svg";
import yellowMarkerIcon from "../assets/img/marker-yellow.svg";
import blueSkyMarkerIcon from "../assets/img/marker-blue-sky.svg";

export const blueMarker = L.icon({
  iconUrl: blueMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
export const greenMarker = L.icon({
  iconUrl: greenMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
export const redMarker = L.icon({
  iconUrl: redMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const blueSkyMarker = L.icon({
  iconUrl: blueSkyMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const yellowMarker = L.icon({
  iconUrl: yellowMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
