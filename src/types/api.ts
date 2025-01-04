export interface ResponseType<T> {
  code: boolean;
  waypoints: number[];
  routes: T[];
}
export type ResponseType2<T> = T;
