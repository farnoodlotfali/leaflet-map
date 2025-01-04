import {
  Convertshape2,
  GlobalSearch,
  Icon,
  Location,
  RouteSquare,
  Routing,
} from "iconsax-react";
import { useMapContext } from "../hooks/useMapContext";

type ButtonProps = {
  handleOnClick: () => void;
  Icon: Icon;
  active?: boolean;
  title?: string;
};

const Button: React.FC<ButtonProps> = ({
  handleOnClick,
  Icon,
  active,
  title = "",
}) => {
  return (
    <div
      onClick={handleOnClick}
      className={`bg-white  p-2 rounded-lg  cursor-pointer transition-all hover:scale-105 ${
        active ? "text-purple-500" : " text-stone-300 hover:text-purple-500"
      }`}
      title={title}
    >
      <Icon
        size="25"
        className={` ${
          active ? "rotate-[360deg]" : ""
        } transition-all duration-500`}
        color="currentcolor"
        variant={active ? "Bulk" : "TwoTone"}
      />
    </div>
  );
};

const ActionButtons = () => {
  const {
    showCityCenter,
    toggleCityCenter,
    showCityLine,
    toggleCityLine,
    showDirections,
    toggleDirections,
    showRoutes,
    toggleRoutes,
  } = useMapContext();

  return (
    <div className="flex gap-3 mb-3 select-none">
      <Button
        Icon={Location}
        active={showCityCenter}
        handleOnClick={toggleCityCenter}
        title="نمایش مرکز استان"
      />
      <Button
        Icon={RouteSquare}
        active={showCityLine}
        handleOnClick={toggleCityLine}
        title="نمایش خطوط استان"
      />
      <Button
        Icon={Routing}
        active={showRoutes}
        handleOnClick={toggleRoutes}
        title="نمایش مسیریابی"
      />
      <Button
        Icon={GlobalSearch}
        active={showDirections}
        handleOnClick={toggleDirections}
        title="نمایش اطلاعات مسیریابی"
      />
      <Button
        Icon={Convertshape2}
        active={showDirections}
        handleOnClick={toggleDirections}
        title="انتخاب روی نقشه"
      />
    </div>
  );
};

export default ActionButtons;
