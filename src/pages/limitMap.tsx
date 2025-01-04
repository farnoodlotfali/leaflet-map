import { lazy, Suspense } from "react";
import ActionButtons from "../components/ActionButtons";
import ChooseFromMap from "../components/ChooseFromMap";
import { useMapContext } from "../hooks/useMapContext";
import Spinner from "../components/Spinner";
import FormMap from "../components/FormMap";
import InfoItem from "../components/InfoItem";
import { enToFaNumber } from "../utils/utils";

const Map = lazy(() => import("../components/Map"));

const LimitMap = () => {
  const { duration, distance } = useMapContext();

  return (
    <div className="w-full h-dvh relative">
      <div className="w-80 absolute z-10  top-3 right-3 ">
        <ActionButtons />
        <div className="bg-white rounded-lg shadow-2xl flex flex-col  gap-3 p-5 ">
            <FormMap />
  
            <hr />
  
            <InfoItem title="زمان" value={enToFaNumber(duration)} />
            <InfoItem
              title="مسافت"
              value={enToFaNumber(distance)}
              postfix="کیلومتر"
            />
          </div>
      </div>
      <ChooseFromMap />
      <Suspense fallback={<Spinner />}>
        <Map />
      </Suspense>
    </div>
  );
};

export default LimitMap;
