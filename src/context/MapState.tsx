import { MapContext } from "./mapContext";
import { useState } from "react";
import { MapRoutesResponse } from "../types";
import { renderDuration } from "../utils/utils";

const AppState = ({ children }: { children: React.ReactNode }) => {
  const [routes, setRoutes] = useState<MapRoutesResponse[]>();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");
  const [showCityCenter, setShowCityCenter] = useState<boolean>(false);
  const [showCityLine, setShowCityLine] = useState<boolean>(false);
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);

  const toggleCityCenter = () => {
    setShowCityCenter((prev) => !prev);
  };
  const toggleCityLine = () => {
    setShowCityLine((prev) => !prev);
  };
  const toggleDirections = () => {
    setShowDirections((prev) => !prev);
  };
  const toggleRoutes = () => {
    setShowRoutes((prev) => !prev);
  };

  const handleInfo = (route: MapRoutesResponse) => {
    setDistance(Math.round(route.distance / 1000));

    setDuration(renderDuration(route.duration));
  };

  const handleSetRoutes = (routesArr: MapRoutesResponse[]) => {
    setRoutes(routesArr);
    handleInfo(routesArr[selectedRouteIndex]);
  };

  const handleSelectedRoute = (routeIndex: number) => {
    setSelectedRouteIndex(routeIndex);
    handleInfo(routes![routeIndex]);
  };

  const clearInfo = () => {
    setRoutes([]);
    setSelectedRouteIndex(0);
    setDistance(0);
    setDuration("");
  };

  return (
    <MapContext.Provider
      value={{
        routes,
        // setRoutes,
        duration,
        // setDuration,
        distance,
        // setDistance,
        selectedRouteIndex,
        // setSelectedRouteIndex,
        handleSelectedRoute,
        handleSetRoutes,

        showCityCenter,
        toggleCityCenter,
        showCityLine,
        toggleCityLine,
        showDirections,
        toggleDirections,
        showRoutes,
        toggleRoutes,
        clearInfo,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default AppState;
