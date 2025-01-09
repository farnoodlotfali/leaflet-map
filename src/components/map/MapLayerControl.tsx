import { Layer, LocationTick, Map1 } from "iconsax-react";
import Modal from "../Modal";
import { LAYER_ITEMS } from "../../data/map-layers";
import { useState } from "react";
import { MapLayerType } from "../../types";

type MapLayerControlProps = {
  selectedLayer: MapLayerType;
  handleOnSelect: (val: MapLayerType) => void;
};

const MapLayerControl: React.FC<MapLayerControlProps> = ({
  handleOnSelect,
  selectedLayer,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);
  return (
    <>
      <button
        onClick={toggleModal}
        className="text-primary-700 bg-white p-1 rounded-lg border-primary-700 border-2 absolute top-1 left-1 z-10"
      >
        <Layer size="32" color="currentcolor" variant="Broken" />
      </button>
      <Modal onClose={toggleModal} show={showModal}>
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
          {LAYER_ITEMS.map((lay) => {
            const isSelect = lay.name === selectedLayer.name;
            return (
              <div
                key={lay.name}
                onClick={() => {
                  handleOnSelect(lay);
                  toggleModal();
                }}
                className={`border-2 p-2 rounded-lg hover:opacity-75 shadow-md flex justify-between items-center ${
                  isSelect
                    ? "border-primary-700 bg-primary-700  text-white"
                    : "border-secondary-800 text-secondary-800"
                }`}
                role="button"
              >
                {lay.name}
                {isSelect ? (
                  <LocationTick
                    size="24"
                    color="currentcolor"
                    variant={"Bulk"}
                  />
                ) : (
                  <Map1 size="24" color="currentcolor" variant={"Linear"} />
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default MapLayerControl;
