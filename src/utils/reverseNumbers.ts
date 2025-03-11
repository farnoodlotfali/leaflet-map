export const reverseNumbers = (val: string): string => {
  return val
    .split(",")
    .map((item) => Number(item))
    .reverse()
    .toString();
};
