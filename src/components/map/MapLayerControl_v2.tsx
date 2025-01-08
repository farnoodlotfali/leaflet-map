import { LAYER_ITEMS } from "../../data/map-layers";
import { LayersControl, TileLayer } from "react-leaflet";

const MapLayerControlV2 = () => {
  return (
    <LayersControl position="topleft">
      {LAYER_ITEMS.map((item) => {
        return (
          <LayersControl.BaseLayer
            checked={item?.checked}
            key={item.name}
            name={item.name}
          >
            <TileLayer attribution={item.attribution} url={item.url} />
          </LayersControl.BaseLayer>
        );
      })}
    </LayersControl>
  );
};

export default MapLayerControlV2;
