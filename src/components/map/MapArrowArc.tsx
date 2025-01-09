import bezierSpline from "@turf/bezier-spline";
import { lineString } from "@turf/helpers";
import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";

type MapArrowArcProps = {
  point1: number[];
  point2: number[];
};

const MapArrowArc: React.FC<MapArrowArcProps> = ({ point1, point2 }) => {
  const Markers = useMemo(() => {
    if (point1.length !== 2 || point2.length !== 2) {
      return null;
    }
    const arr = [];
    const arr_shadow = [];

    const centerX = (point1[0] + point2[0]) / 2;
    const centerY = (point1[1] + point2[1]) / 2;

    // Calculate the radius (half the distance between the two points)
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    // const radius = Math.sqrt(dx * dx + dy * dy) / 2;
    const radius = Math.sqrt(dx * dx + dy * dy) / 8;
    const radius_shadow = Math.sqrt(dx * dx + dy * dy) / 15;

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const normalizedDx = dx / length;
    const normalizedDy = dy / length;

    // Rotate the direction vector by 90 degrees to get the perpendicular vector
    const perpDx = -normalizedDy;
    const perpDy = normalizedDx;

    // Calculate the other two points perpendicular to the line
    const point3 = [centerX + perpDx * radius, centerY + perpDy * radius];
    const point4 = [centerX - perpDx * radius, centerY - perpDy * radius];

    if (centerX + perpDx < centerX - perpDx) {
      const point4_shadow = [
        centerX - perpDx * radius_shadow,
        centerY - perpDy * radius_shadow,
      ];

      arr.push(point1, point4, point2);
      arr_shadow.push(point1, point4_shadow, point2);
    } else {
      const point3_shadow = [
        centerX + perpDx * radius_shadow,
        centerY + perpDy * radius_shadow,
      ];

      arr.push(point1, point3, point2);
      arr_shadow.push(point1, point3_shadow, point2);
    }

    const line = lineString(arr.map((latLng) => [latLng[1], latLng[0]]));
    const line_shadow = lineString(
      arr_shadow.map((latLng) => [latLng[1], latLng[0]])
    );

    const curved = bezierSpline(line, { sharpness: 1, resolution: 20000 });
    const curved_shadow = bezierSpline(line_shadow, {
      sharpness: 1,
      resolution: 20000,
    });

    return (
      <>
        <GeoJSON data={curved} pathOptions={{ weight: 5, color: "#800080" }} />
        <GeoJSON
          data={curved_shadow}
          pathOptions={{ weight: 5, color: "#00000025" }}
        />
      </>
    );
  }, [point1, point2]);

  return <>{Markers}</>;
};

export default MapArrowArc;
