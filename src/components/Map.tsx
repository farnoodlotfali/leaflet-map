import "leaflet/dist/leaflet.css";

import {
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { DEFAULT_CENTER } from "../data/default-center";
// import MapHandel from "./MapHandel";
import { LAYER_ITEMS } from "../data/map-layers";
import { lazy, Suspense } from "react";
import Spinner from "./Spinner";
// import RoutingPath from "./RoutingPath";

const RoutingPath = lazy(() => import("./RoutingPath"));
const MapHandel = lazy(() => import("./MapHandel"));

const Map = () => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={6}
      // zoom={window.innerWidth > 600 ? 6 : 4}
      // minZoom={window.innerWidth > 600 ? 6 : 4}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      className="w-full h-full  z-1"
      zoomControl={false}
      attributionControl={false}
    >
      <LayersControl position="topleft">
        {LAYER_ITEMS.map((item) => {
          return (
            <LayersControl.BaseLayer
              checked={item?.checked}
              key={item.name}
              name={item.name}
            >
              <TileLayer attribution={item.attribution} url={item.url} />
            </LayersControl.BaseLayer>
          );
        })}
      </LayersControl>
      <ZoomControl position="bottomright" />
 
      <Suspense fallback={<Spinner />}>
      <MapHandel />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <RoutingPath />
      </Suspense>
    </MapContainer>
  );
};

export default Map;
