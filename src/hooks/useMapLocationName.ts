import { useState } from "react";

export const useMapLocationName = () => {
  const [locationName, setLocationName] = useState("");

  return { setLocationName, locationName };
};
