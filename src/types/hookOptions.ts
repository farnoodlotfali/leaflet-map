import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { ResponseType } from "./api";

export type HookApiOptions<T> =
  | Omit<
      UseQueryOptions<ResponseType<T>, Error, ResponseType<T>, QueryKey>,
      "queryKey"
    >
  | undefined;
