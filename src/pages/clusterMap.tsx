import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
import { Marker, Polyline, Tooltip, ZoomControl } from "react-leaflet";
import { BEARING_TEHRAN_ZAHEDAN, PATH_TEHRAN_ZAHEDAN } from "../data/teh-zah";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LatLngExpression } from "leaflet";
import { blueMarker, circleGreenMarker, redMarker } from "../utils/markers";

const MapWrapper = lazy(() => import("../components/map/MapWrapper"));

const ClusterMap = () => {
  return (
    <div className="w-full h-dvh relative">
      <Suspense fallback={<Spinner />}>
        <MapWrapper
          zoom={6}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          tileV1={true}
          showCenterMarker={false}
        >
          <ZoomControl position="bottomright" />
          <Marker position={PATH_TEHRAN_ZAHEDAN[0]} icon={blueMarker}>
            <Tooltip permanent>
              <h3>مبدا</h3>
            </Tooltip>
          </Marker>

          {/* path */}
          <Polyline
            positions={PATH_TEHRAN_ZAHEDAN}
            pathOptions={{ weight: 5, color: "#008000" }}
          />
          {/* end marker */}
          <Marker
            position={PATH_TEHRAN_ZAHEDAN[PATH_TEHRAN_ZAHEDAN.length - 1]}
            icon={redMarker}
          >
            <Tooltip permanent>
              <h3>مقصد</h3>
            </Tooltip>
          </Marker>
          <MarkerClusterGroup chunkedLoading>
            {BEARING_TEHRAN_ZAHEDAN.map((address, i) => (
              <Marker
                icon={circleGreenMarker}
                key={i}
                position={address.location as LatLngExpression}
                title={i.toString()}
                rotationAngle={address.bearing_after}
              ></Marker>
            ))}
          </MarkerClusterGroup>
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default ClusterMap;
