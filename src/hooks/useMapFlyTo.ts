import { useState } from "react";

type FlyToProps = {
  zoom?: number | null;
  center: number[] | null;
};

export const useMapFlyTo = () => {
  const [flyTo, setFlyTo] = useState<FlyToProps>({
    zoom: null,
    center: null,
  });

  const handleFlyTo = (c: number[], z?: number) => {
    setFlyTo({
      zoom: z,
      center: c,
    });
  };

  return { handleFlyTo, flyTo };
};
