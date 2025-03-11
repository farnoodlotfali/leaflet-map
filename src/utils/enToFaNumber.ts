// should return farsi number with giver input
export const enToFaNumber = (number: string | number): string | null => {
  if (number === 0) return "۰";
  if (!number) return null;
  const data: any = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰",
  };
  let result = "";
  number = number.toString();

  for (var i = 0; i < number?.length; i++) {
    if (data[number[i]]) result += data[number[i]];
    else result += number[i];
  }

  return result;
};
