export interface ResponseType<T> {
  code: boolean;
  waypoints: number[];
  routes: T[];
}
