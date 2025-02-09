import { useQuery } from "@tanstack/react-query";
import { ResponseType } from "../types";
import { HookApiOptions } from "../types/hookOptions";
import { MapRoutesRequest, MapRoutesResponse } from "../types";
import { fetcher } from "../api/axios";
import { reverseNumbers } from "../utils/utils";

export const useMapRoute = (
  data: MapRoutesRequest,
  options?: HookApiOptions<MapRoutesResponse>
) => {
  const routes = useQuery<ResponseType<MapRoutesResponse>, Error>({
    queryKey: ["routes", data],
    queryFn: () =>
      fetcher.get(
        `/routed-${data.method}/route/v1/driving/${reverseNumbers(
          data.startLocation
        )};${reverseNumbers(
          data.destination
        )}?overview=false&alternatives=true&steps=true&geometries=geojson`
      ),
    staleTime: Infinity,
    ...options,
  });
  return routes;
};
