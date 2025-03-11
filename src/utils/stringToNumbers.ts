export const stringToNumbers = <T>(val: string): T => {
  return val.split(",").map((item) => Number(item)) as T;
};
