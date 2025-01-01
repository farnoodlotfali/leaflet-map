export interface MapRoutesRequest {
  method: string;
  startLocation: string;
  destination: string;
}

export interface MapRoutesResponse {
  distance: number;
  duration: number;
  weight: number;
  weight_name: string;
  legs: {
    distance: number;
    duration: number;
    weight: number;
    summary: string;
    steps: {
      distance: number;
      driving_side: string;
      duration: number;
      geometry: {
        coordinates: number[][];
        type: string;
      };
      mode: string;
      name: string;
      weight: number;
      maneuver: {
        bearing_after: number;
        bearing_before: number;
        location: number[];
        modifier: string;
        type: string;
      };
      intersections: {
        bearings: number[];
        entry: number[];
        location: number[];
        in: number;
        out: number;
      }[];
    }[];
  }[];
}
