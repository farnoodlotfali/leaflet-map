import { useContext } from "react";
import { MapContext } from "../context/mapContext";

export const useMapContext = () => {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error("Error in useMapContext");
  }

  return ctx;
};
