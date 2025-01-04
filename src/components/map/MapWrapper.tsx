import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";

import { PropsWithChildren, useRef } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

import {
  DEFAULT_CENTER,
  DEFAULT_DOUBLE_CLICK_ZOOM,
  DEFAULT_SCROLL_WHEEL_ZOOM,
  DEFAULT_SHOW_MARKER,
  DEFAULT_ZOOM,
} from "../../constant/map";
// we can rotate icon or marker with this package

import MapHandleFlyTo from "./MapHandleFlyTo";
import MapHandleCenter from "./MapHandleCenter";
import MapHandleLocationName from "./MapHandleLocationName";
import { blueMarker } from "../../utils/markers";
import icon from "../../assets/img/marker.svg";
import { LAYER_ITEMS } from "../../data/map-layers";

L.Marker.prototype.options.icon = blueMarker;
const key = new Date().getTime();
type MapWrapperProps = {
  setCenter?: any;
  setLocationName?: any;
  locationReturnAll?: any;
  doubleClickZoom?: any;
  scrollWheelZoom?: any;
  showCenterMarker?: any;
  center?: any;
  zoom?: any;
  flyTo?: any;
};

const MapWrapper: React.FC<PropsWithChildren<MapWrapperProps>> = ({
  children,
  setCenter,
  setLocationName,
  locationReturnAll,
  doubleClickZoom = DEFAULT_DOUBLE_CLICK_ZOOM,
  scrollWheelZoom = DEFAULT_SCROLL_WHEEL_ZOOM,
  showCenterMarker = DEFAULT_SHOW_MARKER,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  flyTo = {
    zoom: null,
    center: null,
  },
}) => {
  const mapRef = useRef<L.Map>(null);

  return (
    <MapContainer
      key={key}
      center={center}
      zoom={zoom}
      className="w-full h-full  z-1"
      zoomControl={false}
      attributionControl={false}
      doubleClickZoom={doubleClickZoom}
      scrollWheelZoom={scrollWheelZoom}
      maxZoom={50}
      ref={mapRef}
    >
      {children}

      <MapHandleFlyTo flyTo={flyTo} />
      {setCenter && <MapHandleCenter setCenter={setCenter} />}
      {setLocationName && (
        <MapHandleLocationName
          setLocationName={setLocationName}
          returnAllData={locationReturnAll}
        />
      )}
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

      {showCenterMarker && (
        <img
          src={icon}
          alt="marker"
          height="40"
          width="40"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            marginTop: "-30px",
            zIndex: 999,
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapWrapper;
