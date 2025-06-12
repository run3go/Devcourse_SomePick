export const compareDate = (a: Date, b: Date) => {
  const aTime = a.getTime();
  const bTime = b.getTime();
  return bTime - aTime;
};
