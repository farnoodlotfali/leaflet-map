import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Marker, Tooltip, useMap, ZoomControl } from "react-leaflet";
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
import { useNavigate } from "react-router";
import L, { PathOptions } from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent, createElementHook } from "@react-leaflet/core";
import { boolean } from "zod";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const MapWrapper = lazy(() => import("../components/map/MapWrapper"));

const STEPS_TITLE = ["مبدا", "مقصد", "نوع پیمایش"];

const directions: any = {
  "new name-straight": "ادامه دهید",

  "new name-slight right": "کمی به سمت راست ادامه دهید",
  "new name-slight left": "کمی به سمت چپ ادامه دهید",

  "new name-right": "به سمت راست ادامه دهید",
  "new name-left": "به سمت چپ ادامه دهید",

  "end of road-left": "به سمت چپ بپیچید",
  "end of road-right": "به سمت راست بپیچید",

  "turn-right": "به سمت راست بپیچید",
  "turn-left": "به سمت چپ بپیچید",
  "turn-straight": "ادامه دهید",

  "rotary-right": "میدان را دور بزنید",
  "rotary-straight": "میدان را دور بزنید",
  "rotary-left": "میدان را دور بزنید",

  "exit rotary-right": "به سمت راست بروید و از میدان خارج شوید",
  "exit rotary-left": "به سمت چپ بروید و از میدان خارج شوید",
  "exit rotary-straight": "از میدان خارج شوید",

  "fork-slight left": "سمت چپ ادامه دهید",
  "fork-slight right": "سمت راست ادامه دهید",

  "merge-slight left": "سمت چپ ادامه دهید",
  "merge-slight right": "سمت راست ادامه دهید",

  "exit roundabout-slight right": "سمت راست، خروجی دوربرگردان",
  "exit roundabout-slight left": "سمت چپ خروجی دوربرگردان",
  "exit roundabout-straight": "خروجی دوربرگردان",
  "exit roundabout-right": "خروجی دوربرگردان",
  "exit roundabout-left": "خروجی دوربرگردان",

  "roundabout-straight": "خروجی دوربرگردان",
  "roundabout-slight right": "خروجی دوربرگردان",
  "roundabout-slight left": "خروجی دوربرگردان",
  "roundabout-left": "خروجی دوربرگردان",
  "roundabout-right": "خروجی دوربرگردان",

  "continue-uturn": "دور بزنید",
  "continue-straight": "ادامه دهید",
  "continue-left": "ادامه دهید",
  "continue-right": "ادامه دهید",

  "turn-slight right": "به راست بپیچید",
  "turn-slight left": "به چپ بپیچید",

  "on ramp-slight right": "از رمپ سمت راست به سمت بالا بروید",
  "on ramp-slight left": "از رمپ سمت چپ به سمت بالا بروید",

  "off ramp-slight right": "از رمپ سمت راست به سمت بالا بروید",
  "off ramp-slight left": "از رمپ سمت چپ به سمت بالا بروید",

  "turn-sharp right": "به راست بپیچید",
  "turn-sharp left": "به چپ بپیچید",

  "depart-": "شروع کن",
  "depart-straight": "شروع کن",
  "depart-left": "شروع کن",
  "depart-right": "شروع کن",

  "arrive-right": "رسیدید",
  "arrive-left": "رسیدید",
  "arrive-straight": "رسیدید",
  "arrive-": "رسیدید",
};

const createRoutineMachineLayer = ({ waypoints }: any) => {
  const instance = L.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#800080", weight: 9 }],
      extendToWaypoints: false,
      missingRouteTolerance: 1,
    },
    // show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    // // draggableWaypoints: false,
    // // fitSelectedRoutes: true,
    showAlternatives: true,
    // // waypointMode: "snap",
    // collapsible: false,
    // router: new L.Routing.OSRMv1({
    //   serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
    // }),
    // containerClassName: "bg-red-500 overflow-y-scroll max-h-screen !m-0 ",
    // useZoomParameter: true,
    altLineOptions: {
      styles: [
        {
          weight: 4,
          color: "#bc5dac",
          dashArray: "3, 8",
          lineCap: "square",
          lineJoin: "miter",
        },
        {
          weight: 12,
          color: "#55006b",
          lineCap: "square",
          lineJoin: "miter",
          opacity: 0.2,
        },
      ],
      extendToWaypoints: false,
      missingRouteTolerance: 0,
    },
    autoRoute: true,
    // waypointMode: "connect",
    // pointMarkerStyle: {
    //   color: "red",
    // },
    // createMarker: function (i, wp, er) {
    //   return null;
    // },
    // language: 'it',
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const FreeMap = () => {
  const navigate = useNavigate();
  // const { handleSetRoutes, distance, duration } = useMapContext();

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

  // const {
  //   data,
  //   isFetching,
  // }: UseQueryResult<ResponseType2<MapLocationResponse>, Error> = useMapLocation(
  //   center,
  //   {
  //     enabled: !!center && coordinates.step !== 2,
  //   }
  // );

  // const {
  //   data: allRoutes,
  //   isFetching: routeIsFetching,
  //   isSuccess,
  // }: UseQueryResult<ResponseType<MapRoutesResponse>, Error> = useMapRoute(
  //   coordinates,
  //   {
  //     enabled: !!coordinates.method,
  //   }
  // );

  // useEffect(() => {
  //   if (isSuccess && allRoutes) {
  //     // handleSetRoutes(reformatRoutes(allRoutes.routes));
  //   }
  // }, [isSuccess, allRoutes]);

  // useEffect(() => {
  //   allRoutes?.routes[0].legs[0].steps.map((x) => {
  //     // console.log(`${x.maneuver.type ?? ""}-${x.maneuver.modifier ?? ""}`);
  //     // console.log({
  //     //   distance: x.distance,
  //     //   modifier: x.maneuver.modifier,
  //     //   type: x.maneuver.type,
  //     //   name: x.name,
  //     //   rotary_name: x?.rotary_name,
  //     //   dir: directions[
  //     //     `${x.maneuver.type ?? ""}-${x.maneuver.modifier ?? ""}`
  //     //   ],
  //     // });

  //     // console.log(
  //     //   `در ${x.name} ${
  //     //     directions[`${x.maneuver.type ?? ""}-${x.maneuver.modifier ?? ""}`]
  //     //   }`
  //     // );

  //     return {
  //       distance: x.distance,
  //       driving_side: x.driving_side,
  //       modifier: x.maneuver.modifier,
  //       type: x.maneuver.type,
  //       bearing_before: x.maneuver.bearing_before,
  //       bearing_after: x.maneuver.bearing_after,
  //       mode: x.mode,
  //       name: x.name,
  //       rotary_name: x?.rotary_name,
  //     };
  //   });
  // }, [allRoutes]);

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

  return (
    <div className="w-full h-dvh relative  ">
      {/* {routeIsFetching && (
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
          onClick={() => navigate(-1)}
        >
          بازگشت
        </button>
      </div> */}

      <Suspense fallback={<Spinner />}>
        <MapWrapper
          zoom={11}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          tileV3={true}
          setCenter={setCenter}
          showCenterMarker={coordinates.step < 2}
        >
          <RoutingMachine
            waypoints={[
              L.latLng(35.6892, 51.389),
              L.latLng(32.667125, 51.679688),
            ]}
          />
          {/* {!allRoutes && (
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
          )} */}
          {/* <Routing1 /> */}
          <ZoomControl position="bottomright" />
          {coordinates.step > 2 && <RoutingPath />}
        </MapWrapper>
      </Suspense>
    </div>
  );
};

export default FreeMap;
