import { createContext } from "react";
import { MapContextType } from "../types";

export const MapContext = createContext<MapContextType | undefined>(undefined);
