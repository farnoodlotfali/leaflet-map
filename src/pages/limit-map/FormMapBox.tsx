import { useEffect } from "react";
import { useMapContext } from "@/hooks/useMapContext";
import Spinner from "@/components/Spinner";
import InfoItem from "@/components/InfoItem";
import { parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseQueryResult } from "@tanstack/react-query";
import { MapRoutesResponse, ResponseType } from "@/types";
import { useMapRoute } from "@/hooks/useMapRoute";
import { toast } from "react-toastify";
import SelectInput from "@/components/SelectInput";
import { CITY_CENTER_ITEMS } from "@/data/city-names";
import { METHOD_NAME_ITEMS } from "@/data/route-method";
import { enToFaNumber } from "@/utils/enToFaNumber";
import { reformatRoutes } from "@/utils/reformatRoutes";

const RouteFormSchema = z.object({
  startLocation: z.string().nonempty({ message: "مبدا را انتخاب کنید" }),
  destination: z.string().nonempty({ message: "مقصد را انتخاب کنید" }),
  method: z.string().nonempty({ message: "نوع پیمایش را انتخاب کنید" }),
});

type RouteFormSchemaType = z.infer<typeof RouteFormSchema>;

const FormMapBox = () => {
  const { handleSetRoutes, clearInfo, duration, distance } = useMapContext();

  const [coordinates, setCoordinates] = useQueryStates(
    {
      startLocation: parseAsString.withDefault(""),
      destination: parseAsString.withDefault(""),
      method: parseAsString.withDefault(""),
    },
    {
      history: "push",
    }
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<RouteFormSchemaType>({
    resolver: zodResolver(RouteFormSchema),
    values: coordinates,
  });

  const {
    data: allRoutes,
    isFetching,
    isError,
    isSuccess,
  }: UseQueryResult<ResponseType<MapRoutesResponse>, Error> = useMapRoute(
    coordinates,
    {
      enabled: !!coordinates.destination,
    }
  );

  useEffect(() => {
    if (isSuccess && allRoutes) {
      handleSetRoutes(reformatRoutes(allRoutes.routes));
    }
  }, [isSuccess, allRoutes]);
  useEffect(() => {
    if (isError) {
      toast.error("مسیری بین دو نقطه با این نوع پیمایش وجود ندارد");
    }
  }, [isError]);

  const onSubmit: SubmitHandler<RouteFormSchemaType> = (data) => {
    setCoordinates(data);
  };

  const handleReverse = () => {
    setCoordinates((prev) => ({
      destination: prev.startLocation,
      startLocation: prev.destination,
    }));
  };

  if (isFetching) {
    return (
      <div className="absolute inset-0 left-0 z-30  bg-white/30 backdrop-blur-sm pt-10  ">
        <Spinner color="text-primary-700" size={35} />
        <p className="text-center text-primary-700 font-medium text-xl mt-2">
          محاسبه مسیر...
        </p>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 right-0 left-0 z-30 ">
      {!coordinates.destination ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3   gap-4 container bg-white shadow-2xl rounded-lg p-4 mx-auto">
            <SelectInput
              input={{
                label: "مبدا",
                name: "startLocation",
                options: CITY_CENTER_ITEMS.filter(
                  (item) => item.value !== watch("destination")
                ),
                control: control,
              }}
            />
            <SelectInput
              input={{
                label: "مقصد",
                name: "destination",
                options: CITY_CENTER_ITEMS.filter(
                  (item) => item.value !== watch("startLocation")
                ),
                control: control,
              }}
            />
            <SelectInput
              input={{
                label: "پیمایش",
                name: "method",
                options: METHOD_NAME_ITEMS,
                control: control,
              }}
            />
            <button
              className={` p-1 text-white border-2 rounded-lg  h-10 w-full focus:shadow-md hover:opacity-85 col-span-1 sm:col-span-3 md:col-span-1   ${
                Object.keys(errors).length
                  ? "bg-red-700 pointer-events-none select-none opacity-65"
                  : "bg-primary-700 disabled:bg-gray-400"
              }`}
              disabled={isFetching || !!Object.keys(errors).length}
              type="submit"
            >
              {"مسیریابی"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 max-w-lg bg-white shadow-2xl rounded-lg p-4 mx-auto">
          <InfoItem title="زمان" value={enToFaNumber(duration)} />
          <InfoItem
            title="مسافت"
            value={enToFaNumber(distance)}
            postfix="کیلومتر"
          />
          <button
            className="p-1 text-secondary-800 border-2 rounded-lg  h-10 focus:shadow-md hover:opacity-75 border-secondary-800 disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-100"
            type="button"
            onClick={() => handleReverse()}
            disabled={!coordinates.destination}
          >
            برعکس
          </button>
          <button
            className="p-1 text-red-700 border-2 rounded-lg  h-10 focus:shadow-md hover:opacity-75 border-red-700 disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-100"
            type="button"
            onClick={() => {
              setCoordinates(null);
              clearInfo();
            }}
            disabled={!coordinates.destination}
          >
            حذف
          </button>
        </div>
      )}
    </div>
  );
};

export default FormMapBox;
