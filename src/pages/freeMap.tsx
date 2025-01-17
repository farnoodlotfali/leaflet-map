import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Marker, Tooltip, ZoomControl } from "react-leaflet";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useMapLocation } from "../hooks/useMapLocation";
import { METHOD_NAME_ITEMS } from "../data/route-method";
import { DEFAULT_CENTER } from "../constant/map";
import { useMapRoute } from "../hooks/useMapRoute";
import { MapLocationResponse, MapRoutesResponse, ResponseType } from "../types";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseType2 } from "../types/api";
import { enToFaNumber, reformatRoutes, stringToLatLng } from "../utils/utils";
import RoutingPath from "../components/RoutingPath";
import { useMapContext } from "../hooks/useMapContext";
import InfoItem from "../components/InfoItem";
import { blueMarker, redMarker } from "../utils/markers";

const MapWrapper = lazy(() => import("../components/map/MapWrapper"));

const STEPS_TITLE = ["مبدا", "مقصد", "نوع پیمایش"];

const FreeMap = () => {
  const { handleSetRoutes, distance, duration } = useMapContext();

  const [coordinates, setCoordinates] = useQueryStates(
    {
      startLocation: parseAsString.withDefault(""),
      destination: parseAsString.withDefault(""),
      method: parseAsString.withDefault(""),
      step: parseAsInteger.withDefault(0),
    },
    {
      history: "push",
    }
  );
  const [method, setMethod] = useState(
    METHOD_NAME_ITEMS.find((item) => item.value === coordinates.method) ??
      METHOD_NAME_ITEMS[0]
  );
  const [center, setCenter] = useState(DEFAULT_CENTER);

  const {
    data,
    isFetching,
  }: UseQueryResult<ResponseType2<MapLocationResponse>, Error> = useMapLocation(
    center,
    {
      enabled: !!center && coordinates.step !== 2,
    }
  );

  const {
    data: allRoutes,
    isFetching: routeIsFetching,
    isSuccess,
  }: UseQueryResult<ResponseType<MapRoutesResponse>, Error> = useMapRoute(
    coordinates,
    {
      enabled: !!coordinates.method,
    }
  );

  useEffect(() => {
    if (isSuccess && allRoutes) {
      handleSetRoutes(reformatRoutes(allRoutes.routes));
    }
  }, [isSuccess, allRoutes]);

  const handleClick = () => {
    let newCenter = [...center];
    switch (coordinates.step) {
      case 0:
        setCoordinates({
          startLocation: newCenter.join(","),
          step: 1,
        });
        break;
      case 1:
        setCoordinates({
          destination: newCenter.join(","),
          step: 2,
        });
        break;
      case 2:
        setCoordinates(
          {
            method: method.value,
            step: 3,
          },
          {
            history: "replace",
          }
        );
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (coordinates.step) {
      case 3:
        setCoordinates(
          {
            method: "",
            step: 2,
          },
          {
            history: "replace",
          }
        );
        break;
      case 2:
        setCoordinates(
          {
            destination: "",
            step: 1,
          },
          {
            history: "replace",
          }
        );
        break;
      case 1:
        setCoordinates(
          {
            startLocation: "",
            step: 0,
          },
          {
            history: "replace",
          }
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-dvh relative ">
      {routeIsFetching && (
        <div className="fixed flex flex-col gap-5 inset-0 bg-gray-600/50 z-50 pt-10 text-center text-white">
          <Spinner size={50} color="text-primary-700" />
          <span className="text-2xl">در حال مسیریابی...</span>
        </div>
      )}

      <div className="absolute bg-white shadow-2xl rounded-lg p-4 container bottom-0 right-0 left-0 z-30 mx-auto">
        {coordinates.step !== 3 ? (
          <>
            {coordinates.step === 2 ? (
              <>
                <div className="text-lg text-center mb-4">
                  نوع پیمایش را انتخاب کنید
                </div>
                <div className="flex gap-4 text-4xl justify-center mb-3">
                  {METHOD_NAME_ITEMS.map((item) => (
                    <div
                      key={item.value}
                      role="button"
                      className={`border-2 p-2 rounded-lg hover:opacity-75 text-lg ${
                        item.value === method.value
                          ? "border-primary-700 bg-primary-50 text-primary-700"
                          : "border-secondary-800 text-secondary-800"
                      }`}
                      onClick={() => setMethod(item)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="border-2 rounded-lg p-2 h-11 truncate">
                {isFetching ? (
                  <span className="text-gray-400">یافتن مسیر...</span>
                ) : (
                  data?.display_name
                )}
              </div>
            )}
            <button
              className={`p-1 text-white rounded-lg mt-2 h-12 w-full focus:shadow-md hover:opacity-85 bg-primary-700 disabled:bg-gray-400`}
              disabled={isFetching}
              onClick={handleClick}
            >
              {isFetching ? (
                <Spinner />
              ) : (
                `ثبت ${STEPS_TITLE[coordinates.step]}`
              )}
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <InfoItem title="نوع پیمایش" value={method.title} />
            <InfoItem title="زمان" value={enToFaNumber(duration)} />
            <InfoItem
              title="مسافت"
              value={enToFaNumber(distance)}
              postfix="کیلومتر"
            />
          </div>
        )}
        <button
          className={`p-1 border-2 rounded-lg mt-2 h-12 w-full focus:shadow-md hover:opacity-85 border-red-700 text-red-600`}
          onClick={handleBack}
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
          setCenter={setCenter}
          showCenterMarker={coordinates.step < 2}
        >
          {!allRoutes && (
            <>
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
            </>
          )}
          <ZoomControl position="bottomright" />
          {coordinates.step > 2 && <RoutingPath />}
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default FreeMap;
