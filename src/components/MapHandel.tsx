import { useEffect, useMemo, useState } from "react";
import { useMap, Marker, Tooltip, Polygon } from "react-leaflet";
import { IRAN_CITY_ITEMS } from "../data/iran-city";
import { CITY_CENTER_POINTS } from "../data/city-center";
import { useMapContext } from "../hooks/useMapContext";
import { yellowMarker } from "../utils/markers";

const MapHandel = () => {
  const { showCityCenter, showCityLine } = useMapContext();

  const map = useMap();
  const [name, setName] = useState("");
  const [showCenter, setShowCenter] = useState(false);

  useEffect(() => {
    map.on("zoomend", () => {
      if (map.getZoom() < 9) {
        setShowCenter(false);
      } else {
        setShowCenter(true);

        setName("");
      }
    });
  }, [map]);

  const Markers = useMemo(
    () =>
      CITY_CENTER_POINTS.features.map((item) => {
        return (
          <Marker
            key={item.properties.name}
            eventHandlers={{
              click: () => {
                setShowCenter(true);
                setName("");

                map.flyTo(item.geometry.coordinates, 13);
              },
            }}
            position={item.geometry.coordinates}
            icon={yellowMarker}
          >
            <Tooltip>
              <h3>{item.properties.fa_name}</h3>
            </Tooltip>
          </Marker>
        );
      }),
    []
  );

  return (
    <>
      {showCityLine &&
        IRAN_CITY_ITEMS.map((item) => {
          return (
            <Polygon
              key={item.properties.name}
              pathOptions={{
                color: "#800080",
                fillColor:
                  name === item.properties.name ? "#800080" : "transparent",
                weight: 1,
                fillOpacity: name === item.properties.name ? 0.2 : 0,
              }}
              positions={item.geometry.coordinates}
              eventHandlers={{
                mouseover: () => {
                  if (map.getZoom() < 9) setName(item.properties.name);
                },
              }}
              className="!cursor-grab active:!cursor-grabbing"
            ></Polygon>
          );
        })}

      {showCenter || (showCityCenter && Markers)}
    </>
  );
};

export default MapHandel;
