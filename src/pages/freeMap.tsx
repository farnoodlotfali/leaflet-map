import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
import { useMapFlyTo } from "../hooks/useMapFlyTo";
import { useMapCenter } from "../hooks/useMapCenter";
import { useMapLocationName } from "../hooks/useMapLocationName";
import { ZoomControl } from "react-leaflet";
import ExampleClusterGroup from "../components/map/ExampleClusterGroup";

const MapWrapper = lazy(() => import("../components/map/MapWrapper"));

const FreeMap = () => {
  const { flyTo, handleFlyTo } = useMapFlyTo();
  const { center, setCenter } = useMapCenter();
  const { locationName, setLocationName } = useMapLocationName();

  return (
    <div className="w-full h-dvh relative ">
      <div className="  absolute bg-red-500 container bottom-0 right-0 left-0 z-50 mx-auto">
        <div>center: {center?.join(", ")}</div>
        <div>locationName: {locationName}</div>
        <button
          onClick={() => {
            handleFlyTo([35.6993744, 51.3816063], 14);
          }}
        >
          Set FlyTo
        </button>
      </div>

      <Suspense fallback={<Spinner />}>
        <MapWrapper
          zoom={11}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          flyTo={flyTo}
          setCenter={setCenter}
          setLocationName={setLocationName}
        >
          <ZoomControl position="bottomright" />
          <ExampleClusterGroup />
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default FreeMap;
