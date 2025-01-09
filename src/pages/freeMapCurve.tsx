import { lazy, Suspense, useState } from "react";
import Spinner from "../components/Spinner";
import { Marker, Tooltip, ZoomControl } from "react-leaflet";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { DEFAULT_CENTER } from "../constant/map";
import { stringToLatLng, stringToNumbers } from "../utils/utils";
import { blueMarker, redMarker } from "../utils/markers";
import { useNavigate } from "react-router";
import { useMapFlyTo } from "../hooks/useMapFlyTo";
import MapArrowArc from "../components/map/MapArrowArc";

const MapWrapper = lazy(() => import("../components/map/MapWrapper"));

const STEP_ITEMS = [
  {
    step: 0,
    name: "startLocation",
    title: "مبدا",
    change: true,
  },
  {
    step: 1,
    name: "destination",
    title: "مقصد",
    change: false,
  },
];

const FreeMapCurve = () => {
  const navigate = useNavigate();
  const { flyTo, handleFlyTo } = useMapFlyTo();
  const [coordinates, setCoordinates] = useQueryStates(
    {
      startLocation: parseAsString.withDefault(""),
      destination: parseAsString.withDefault(""),
      step: parseAsInteger.withDefault(0),
    },
    {
      history: "push",
    }
  );

  const [center, setCenter] = useState(DEFAULT_CENTER);

  const handleClick = (val: (typeof STEP_ITEMS)[0]) => {
    let newCenter = [...center];

    setCoordinates({
      [val.name]: newCenter.join(","),
      step: val.step + 1,
    });
    if (val.change) {
      handleFlyTo([newCenter[0], newCenter[1] + 0.05]);
    }
  };

  return (
    <div className="w-full h-dvh relative ">
      <div className="absolute bg-white shadow-2xl rounded-lg p-4 container bottom-0 right-0 left-0 z-30 mx-auto">
        {coordinates.step < STEP_ITEMS.length && (
          <button
            onClick={() => handleClick(STEP_ITEMS[coordinates.step])}
            className={`p-1 text-white rounded-lg mt-2 h-12 w-full focus:shadow-md hover:opacity-85 bg-secondary-800 disabled:bg-gray-400`}
          >
            ثبت {STEP_ITEMS[coordinates.step].title}
          </button>
        )}
        <button
          onClick={() => navigate(-1)}
          className={`p-1 border-2 rounded-lg mt-2 h-12 w-full focus:shadow-md hover:opacity-85 border-red-700 text-red-600`}
        >
          بازگشت
        </button>
      </div>

      <Suspense fallback={<Spinner />}>
        <MapWrapper
          zoom={11}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          tileV1={true}
          flyTo={flyTo}
          setCenter={setCenter}
          showCenterMarker={coordinates.step < 2}
        >
          {coordinates?.startLocation && (
            <Marker
              position={stringToLatLng(coordinates.startLocation)}
              icon={blueMarker}
            >
              <Tooltip permanent>
                <h3>مبدا</h3>
              </Tooltip>
            </Marker>
          )}
          {coordinates?.destination && (
            <Marker
              position={stringToLatLng(coordinates.destination)}
              icon={redMarker}
            >
              <Tooltip permanent>
                <h3>مقصد</h3>
              </Tooltip>
            </Marker>
          )}
          <ZoomControl position="bottomright" />
          <MapArrowArc
            point1={stringToNumbers<number[]>(coordinates.startLocation)}
            point2={stringToNumbers<number[]>(coordinates.destination)}
          />
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default FreeMapCurve;
