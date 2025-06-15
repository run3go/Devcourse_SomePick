import { getDate, getMonth, getYear } from "date-fns";

export const compareDate = (a: Date, b: Date) => {
  const aTime = a.getTime();
  const bTime = b.getTime();
  return bTime - aTime;
};

export const isSameDay = (a: Date, b: Date) => {
  const isSameYear = getYear(a) === getYear(b);
  const isSameMonth = getMonth(a) === getMonth(b);
  const isSameDate = getDate(a) === getDate(b);
  return isSameYear && isSameMonth && isSameDate;
};
