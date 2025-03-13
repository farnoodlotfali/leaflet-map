import { lazy, Suspense } from "react";
import Spinner from "@/components/Spinner";
import { ZoomControl } from "react-leaflet";
import MapHandel from "@/components/MapHandel";
import RoutingPath from "@/components/RoutingPath";
import ActionButtons from "@/components/ActionButtons";
import FormMapBox from "./FormMapBox";

const MapWrapper = lazy(() => import("@/components/map/MapWrapper"));

const LimitMapPage = () => {
  return (
    <div className="w-full h-dvh relative">
      <div className="absolute z-10 top-14 right-1">
        <ActionButtons colDir />
      </div>
      <FormMapBox />

      <Suspense fallback={<Spinner />}>
        <MapWrapper
          zoom={6}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          tileV1={true}
          showCenterMarker={false}
        >
          <ZoomControl position="bottomright" />

          <MapHandel />

          <RoutingPath />
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default LimitMapPage;
