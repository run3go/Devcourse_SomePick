import { redirect } from "react-router";
import { fetchCouple } from "../../apis/calendar";
import { showWarnToast } from "../../components/common/ShowToast";
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
    showWarnToast("연결된 상대가 없습니다");
    return redirect("/back");
  }

  return data;
};
