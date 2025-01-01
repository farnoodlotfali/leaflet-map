import { CITY_CENTER_POINTS } from "../data/city-center";

type CitySelectProps = {
  placeholder: string;
  setCity: (val?: any) => void;
  selectedCity: string;
};

const CITY_NAME_ITEMS = CITY_CENTER_POINTS.features.map(
  (item) => item.properties
);

const CitySelect: React.FC<CitySelectProps> = ({
  placeholder,
  setCity,
  selectedCity = "",
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };
  return (
    <select
      className=" p-1 border-stone-300 border-2 rounded-lg  h-10 focus:ring-1 w-full focus:shadow-md "
      onChange={handleOnChange}
      value={selectedCity}
    >
      <option value="" disabled className="text-xs">
        انتخاب {placeholder}
      </option>
      {CITY_NAME_ITEMS.map((item) => {
        return (
          <option value={item.name} key={item.name} className="text-md">
            {item.fa_name}
          </option>
        );
      })}
    </select>
  );
};
export default CitySelect;
