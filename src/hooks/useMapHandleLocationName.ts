import { useMapLocation } from "./useMapLocation";
import { UseQueryResult } from "@tanstack/react-query";
import { MapLocationResponse } from "../types";
import { ResponseType2 } from "../types/api";

const useMapHandleLocationName = ({ center }: any) => {
  const locationData: UseQueryResult<
    ResponseType2<MapLocationResponse>,
    Error
  > = useMapLocation(center, {
    enabled: !!center,
  });

  return locationData;
};

export default useMapHandleLocationName;
