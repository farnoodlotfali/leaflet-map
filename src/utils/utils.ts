import { LatLngExpression } from "leaflet";
import { MapRoutesResponse } from "../types";

export const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const copy = Array.isArray(obj) ? ([] as T) : ({} as T);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
};

export const reformatRoutes = (
  routes: MapRoutesResponse[]
): MapRoutesResponse[] => {
  return deepCopy(routes).map((item) => ({
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

export const findPolyLineData = (
  route: MapRoutesResponse
): LatLngExpression[] => {
  return route.legs[0].steps
    .map((leg) => leg.geometry.coordinates)
    .flat() as LatLngExpression[];
};

export const renderDuration = (time: number): string => {
  const h = Math.floor(time / 3600);
  time = time - h * 3600;
  const m = Math.floor(time / 60);
  const duration = `${h} ساعت و ${m} دقیقه`;

  return duration;
};

// should return farsi number with giver input
export const enToFaNumber = (number: string | number): string | null => {
  if (number === 0) return "۰";
  if (!number) return null;
  const data: any = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰",
  };
  let result = "";
  number = number.toString();

  for (var i = 0; i < number?.length; i++) {
    if (data[number[i]]) result += data[number[i]];
    else result += number[i];
  }

  return result;
};

export const reverseCoordinates = (val: LatLngExpression): LatLngExpression => {
  return val
    .toString()
    .split(",")
    .map((item) => Number(item))
    .reverse() as LatLngExpression;
};
