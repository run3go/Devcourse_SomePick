import { redirect } from "react-router";
import { toast } from "react-toastify";
import { fetchCouple } from "../../apis/calendar";
import supabase from "../../utils/supabase";

export const getCoupleInfo = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth/login");
  }
  const data = await fetchCouple();
  if (!data) {
    toast.warn("연결된 상대가 없습니다");
    return redirect("/back");
  }

  return data;
};
