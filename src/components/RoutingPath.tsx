import { Marker, Polyline, Tooltip } from "react-leaflet";
import { useMapContext } from "../hooks/useMapContext";
import { blueMarker, redMarker } from "../utils/markers";
import { findPolyLineData } from "../utils/utils";
import { Fragment } from "react";

const RoutingPath = () => {
  const { routes, selectedRouteIndex, handleSelectedRoute, showRoutes } =
    useMapContext();

  return (
    <>
      {showRoutes && routes && (
        <>
          {routes.map((route, i) => {
            const polyLineData = findPolyLineData(route);

            if (i === selectedRouteIndex) {
              return (
                <Fragment key={i}>
                  {/* start marker */}
                  <Marker position={polyLineData[0]} icon={blueMarker}>
                    <Tooltip permanent>
                      <h3>مبدا</h3>
                    </Tooltip>
                  </Marker>

                  {/* path */}
                  <Polyline
                    positions={polyLineData}
                    pathOptions={{ weight: 5, color: "#008000" }}
                  />
                  {/* end marker */}
                  <Marker
                    position={polyLineData[polyLineData.length - 1]}
                    icon={redMarker}
                  >
                    <Tooltip permanent>
                      <h3>مقصد</h3>
                    </Tooltip>
                  </Marker>
                </Fragment>
              );
            }
            return (
              <Fragment key={i}>
                <Polyline
                  positions={polyLineData}
                  pathOptions={{
                    weight: 4,
                    color: "grey",
                    dashArray: "3, 8",
                  }}
                  eventHandlers={{
                    click: () => {
                      handleSelectedRoute(i);
                    },
                  }}
                />
                <Polyline
                  positions={polyLineData}
                  pathOptions={{
                    weight: window.innerWidth > 600 ? 12 : 18,
                    color: "grey",
                    opacity: 0.5,
                  }}
                  eventHandlers={{
                    click: () => {
                      handleSelectedRoute(i);
                    },
                  }}
                />
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default RoutingPath;
