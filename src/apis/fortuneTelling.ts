import { formatDate, subDays } from "date-fns";
import supabase from "../utils/supabase";
import { updateProfile } from "./user";
// 세션에서 운세 속성이 있는지 없는지 확인 후 없으면 실행
export const createFortuneTelling = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const yesterday = subDays(new Date(), 1);
    const { data, error } = await supabase
      .from("fortune_tellings")
      .insert([
        {
          used_at: formatDate(yesterday, "yyyy-MM-dd"),
          love_advice: "",
          love_dscription: "",
          love_title: "",
        },
      ])
      .select("*")
      .single();
    if (error) {
      console.log("게시글 작성 실패:", error.message);
      return;
    }
    const payload = {
      fortune_telling_id: data.id,
    };
    await updateProfile(payload);
  } catch (e) {
    console.error(e);
  }
};
