import FormMap from "./components/FormMap";
import { useMapContext } from "./hooks/useMapContext";
import { enToFaNumber } from "./utils/utils";
import ActionButtons from "./components/ActionButtons";
import InfoItem from "./components/InfoItem";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

const Map = lazy(() => import("./components/Map"));

const App = () => {
  const { duration, distance } = useMapContext();

  return (
    <div className="w-full h-screen relative">
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
      <Suspense fallback={<Spinner />}>
        <Map />
      </Suspense>
    </div>
  );
};

export default App;
