import { UseQueryResult } from "@tanstack/react-query";
import { MapRoutesResponse, ResponseType } from "../types";
import { useMapContext } from "../hooks/useMapContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { METHOD_NAME_ITEMS } from "../data/route-method";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CITY_CENTER_ITEMS } from "../data/city-names";
import Spinner from "./Spinner";
import SelectInput from "./SelectInput";
import { reformatRoutes } from "../utils/utils";
import { toast } from "react-toastify";
import { useMapRoute } from "../hooks/useMapRoute";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";

const RouteFormSchema = z.object({
  startLocation: z.string().nonempty({ message: "مبدا را انتخاب کنید" }),
  destination: z.string().nonempty({ message: "مقصد را انتخاب کنید" }),
  method: z.string().nonempty({ message: "نوع پیمایش را انتخاب کنید" }),
});

type RouteFormSchemaType = z.infer<typeof RouteFormSchema>;

const FormMap = () => {
  const { handleSetRoutes, clearInfo } = useMapContext();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-3 flex flex-col ">
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
        className={` p-1 text-white border-2 rounded-lg  h-10 w-full focus:shadow-md hover:opacity-85  ${
          Object.keys(errors).length
            ? "bg-red-700 pointer-events-none select-none opacity-65"
            : "bg-purple-700 disabled:bg-gray-400"
        }`}
        disabled={isFetching || !!Object.keys(errors).length}
        type="submit"
      >
        {isFetching ? <Spinner /> : "مسیریابی"}
      </button>
      <div className="flex gap-2">
        <button
          className="p-1 text-purple-700 border-2 rounded-lg  h-10 w-1/2 focus:shadow-md hover:opacity-75 border-purple-700 disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-100"
          type="button"
          onClick={() => handleReverse()}
          disabled={!coordinates.destination}
        >
          برعکس
        </button>
        <button
          className="p-1 text-red-700 border-2 rounded-lg  h-10 w-1/2 focus:shadow-md hover:opacity-75 border-red-700 disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-100"
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
    </form>
  );
};

export default FormMap;
