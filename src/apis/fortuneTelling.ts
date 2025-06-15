import { formatDate, subDays } from "date-fns";
import supabase from "../utils/supabase";
import { updateProfile } from "./user";
// 유저에게 운세 테이블이 있는지 없는지 확인 후 없으면 최초에만 실행
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
          love_description: "",
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
// 운세 업데이트
export const updateFortuneTelling = async (
  love_title: string,
  love_advice: string,
  love_description: string
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const today = new Date();
    const { error } = await supabase
      .from("fortune_tellings")
      .update({
        used_at: formatDate(today, "yyyy-MM-dd"),
        love_title,
        love_advice,
        love_description,
      })
      .eq("id", session.user.user_metadata.fortune_telling_id);
    if (error) {
      console.log("게시글 작성 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
