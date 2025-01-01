import { MapRoutesResponse } from "./mapRoutes";

export type MapContextType = {
  routes: MapRoutesResponse[] | undefined;
  // setRoutes: React.Dispatch<
  //   React.SetStateAction<MapRoutesResponse[] | undefined>
  // >;
  selectedRouteIndex: number;
  // setSelectedRouteIndex: React.Dispatch<React.SetStateAction<number>>;
  duration: string;
  // setDuration: React.Dispatch<React.SetStateAction<string>>;
  distance: number;
  // setDistance: React.Dispatch<React.SetStateAction<number>>;
  handleSelectedRoute: (routeIndex: number) => void;
  handleSetRoutes: (routesArr: MapRoutesResponse[]) => void;

  showCityCenter: boolean;
  toggleCityCenter: () => void;
  showCityLine: boolean;
  toggleCityLine: () => void;
  showDirections: boolean;
  toggleDirections: () => void;
  showRoutes: boolean;
  toggleRoutes: () => void;
  clearInfo: () => void;
};
