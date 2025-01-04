import { useMap } from "react-leaflet";
import { useMapLocation } from "../../hooks/useMapLocation";
import { UseQueryResult } from "@tanstack/react-query";
import { MapLocationResponse } from "../../types";
import { useEffect } from "react";
import { ResponseType2 } from "../../types/api";

const MapHandleLocationName = ({
  setLocationName,
  returnAllData = false,
}: any) => {
  const map = useMap();

  const {
    data,
  }: UseQueryResult<ResponseType2<MapLocationResponse>, Error> = useMapLocation(
    map?.getCenter(),
    {
      enabled: !!setLocationName && !!map,
    }
  );

  useEffect(() => {
    if (!!setLocationName && data) {
      if (returnAllData) {
        setLocationName(data);
      } else {
        setLocationName(data.display_name);
      }
    }
  }, [setLocationName, data]);

  return null;
};

export default MapHandleLocationName;
