import { useQuery } from "@tanstack/react-query";
import { MapLocationRequest, MapLocationResponse } from "../types";
import { HookApiOptions2 } from "../types/hookOptions";
import { fetcher2 } from "../api/axios";
import { ResponseType2 } from "../types/api";
import { LatLng } from "leaflet";

export const useMapLocation = (
  data: MapLocationRequest,
  options?: HookApiOptions2<MapLocationResponse>
) => {
  const newData = data as LatLng;
  const routes = useQuery<ResponseType2<MapLocationResponse>, Error>({
    queryKey: ["location-name", data],
    queryFn: () =>
      fetcher2.get(
        `/reverse?lat=${newData.lat}&lon=${newData.lng}&zoom=18&addressdetails=1&format=json`
      ),
    staleTime: Infinity,
    ...options,
  });
  return routes;
};
