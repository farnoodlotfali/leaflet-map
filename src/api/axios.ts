import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://routing.openstreetmap.de",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosInstance2 = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const onError = (
  error: Error & {
    response: { data: { errors: any; message: string }; status: number };
  }
) => {
  throw error;
};

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const fetcher = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  post: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    return AxiosInstance.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  put: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  patch: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
};

const fetcher2 = {
  get: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance2.get<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  post: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) => {
    return AxiosInstance2.post<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e));
  },
  put: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance2.put<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  patch: <T>(
    url: string,
    body: {},
    configs?: AxiosRequestConfig<any> | undefined
  ) =>
    AxiosInstance2.patch<T>(url, body, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
  delete: <T>(url: string, configs?: AxiosRequestConfig<any> | undefined) =>
    AxiosInstance2.delete<T>(url, configs)
      .then(responseBody)
      .catch((e) => onError(e)),
};

export { fetcher, fetcher2 };
