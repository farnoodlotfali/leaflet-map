import { MapRoutesResponse } from "@/types";
import { deepCopy } from "./deepCopy";

export const reformatRoutes = (
  routes: MapRoutesResponse[]
): MapRoutesResponse[] => {
  return deepCopy(routes)?.map((item) => ({
    ...item,
    legs: [
      {
        ...item.legs[0],
        steps: item.legs[0].steps.map((step) => ({
          ...step,
          maneuver: {
            ...step.maneuver,
            location: step.maneuver.location.reverse(),
          },
          intersections: step.intersections.map((inter) => ({
            ...inter,
            location: inter.location.reverse(),
          })),
          geometry: {
            ...step.geometry,
            coordinates: step.geometry.coordinates.map((inter) =>
              inter.reverse()
            ),
          },
        })),
      },
    ],
  }));
};
