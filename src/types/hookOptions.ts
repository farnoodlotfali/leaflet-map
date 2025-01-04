import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { ResponseType, ResponseType2 } from "./api";

export type HookApiOptions<T> =
  | Omit<
      UseQueryOptions<ResponseType<T>, Error, ResponseType<T>, QueryKey>,
      "queryKey"
    >
  | undefined;

export type HookApiOptions2<T> =
  | Omit<
      UseQueryOptions<ResponseType2<T>, Error, ResponseType2<T>, QueryKey>,
      "queryKey"
    >
  | undefined;
