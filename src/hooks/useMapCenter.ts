import { useState } from "react";
import { DEFAULT_CENTER } from "../constant/map";

export const useMapCenter = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);

  return { setCenter, center };
};
