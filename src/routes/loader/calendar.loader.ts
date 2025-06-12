import { fetchCouple } from "../../apis/calendar";

export const getCoupleInfo = async () => {
  const data = await fetchCouple();
  return data;
};
