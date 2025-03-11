export const renderDuration = (time: number = 0): string => {
  const h = Math.floor(time / 3600);
  time = time - h * 3600;
  const m = Math.floor(time / 60);
  const duration = `${h} ساعت و ${m} دقیقه`;

  return duration;
};
