import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";

import { PropsWithChildren, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L, { LatLng } from "leaflet";

import {
  DEFAULT_CENTER,
  DEFAULT_DOUBLE_CLICK_ZOOM,
  DEFAULT_SCROLL_WHEEL_ZOOM,
  DEFAULT_SHOW_MARKER,
  DEFAULT_ZOOM,
} from "../../constant/map";
// we can rotate icon or marker with this package

import MapHandleFlyTo from "./MapHandleFlyTo";
import { blueMarker } from "../../utils/markers";
import icon from "../../assets/img/marker-primary.svg";
import { LAYER_ITEMS } from "../../data/map-layers";

import MapLayerControl from "./MapLayerControl";
import { MapLayerType } from "../../types";
import MapLayerControlV2 from "./MapLayerControl_v2";

L.Marker.prototype.options.icon = blueMarker;
const key = new Date().getTime();
type MapWrapperProps = {
  setCenter?: any;
  setMap?: any;
  doubleClickZoom?: any;
  scrollWheelZoom?: any;
  showCenterMarker?: any;
  center?: any;
  zoom?: any;
  flyTo?: any;
  tileV1?: any;
  tileV2?: any;
};

const MapWrapper: React.FC<PropsWithChildren<MapWrapperProps>> = ({
  children,
  setCenter,
  doubleClickZoom = DEFAULT_DOUBLE_CLICK_ZOOM,
  scrollWheelZoom = DEFAULT_SCROLL_WHEEL_ZOOM,
  showCenterMarker = DEFAULT_SHOW_MARKER,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  tileV1 = false,
  tileV2 = false,
  flyTo = {
    zoom: null,
    center: null,
  },
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedLayer, setSelectedLayer] = useState(LAYER_ITEMS[0]);

  const handleLayer = (lay: MapLayerType) => {
    setSelectedLayer(lay);

    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (!!layer?.options.attribution) {
          mapRef.current?.removeLayer(layer);
        }
      });

      const newLayer = L.tileLayer(lay.url, {
        attribution: lay.attribution,
      });
      newLayer.addTo(mapRef.current);
    }
  };

  return (
    <>
      {tileV1 && (
        <MapLayerControl
          selectedLayer={selectedLayer}
          handleOnSelect={handleLayer}
        />
      )}

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
        <TileLayer
          attribution={selectedLayer.attribution}
          url={selectedLayer.url}
        />

        {children}

        <MapHandleFlyTo flyTo={flyTo} />
        <MapHandleCenter
          onMoveEnd={(value) => {
            setCenter([value.lat, value.lng]);
          }}
        />

        {tileV2 && <MapLayerControlV2 />}

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
    </>
  );
};

const MapHandleCenter = ({
  onMoveEnd,
}: {
  onMoveEnd: (val: LatLng) => void;
}) => {
  const mapEvents = useMapEvents({
    moveend() {
      onMoveEnd(mapEvents.getCenter());
    },
  });

  return <></>;
};
export default MapWrapper;
