import supabase from "../utils/supabase";
// 커플 정보 조회
export const fetchCouple = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("couple_id")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      console.log("커플 조회 실패:", profileError.message);
      return;
    }

    const { data: couple, error: coupleError } = await supabase
      .from("couples")
      .select(
        `
        *,
        user1:user_id(*),
        user2:partner_id(*)
        `
      )
      .eq("id", profile.couple_id!)
      .single();

    if (coupleError) {
      console.log("커플 정보 조회 실패:", coupleError.message);
      return;
    }

    const { data: schedules, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("couple_id", profile.couple_id!);
    if (error) {
      console.log("캘린더 정보 조회 실패:", error.message);
      return;
    }
    return { couple, schedules };
  } catch (e) {
    console.error(e);
  }
};
//사귄 날짜 업데이트 (커플 아이디, 날짜)
export const updateMeetDate = async (couple_id: number, newMeetDate: Date) => {
  const formattedDate = newMeetDate.toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("couples")
    .update({ meet_date: formattedDate })
    .eq("id", couple_id)
    .select("meet_date")
    .single();
  if (error) {
    console.log("날짜 업데이트 실패:", error.message);
    return;
  }
  return data.meet_date;
};
//달력 일정 추가 (커플 아이디, 날짜, 제목, 내용)
export const createSchedule = async (
  couple_id: number,
  date: Date,
  title: string,
  memo: string
) => {
  try {
    const formattedDate = date.toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("schedules")
      .insert([{ couple_id, date: formattedDate, title, memo }])
      .select("*")
      .single();
    if (error) {
      console.log("날짜 업데이트 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
//달력 일정 업데이트 (커플 아이디, 날짜, 제목, 내용)
export const updateSchedule = async (
  schedule_id: number,
  title: string,
  memo: string
) => {
  try {
    const { data, error } = await supabase
      .from("schedules")
      .update({ title, memo })
      .eq("id", schedule_id)
      .select("*")
      .single();
    if (error) {
      console.log("날짜 업데이트 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
//달력 일정 삭제 (일정 삭제)
export const deleteSchedule = async (schedule_id: number) => {
  try {
    const { error } = await supabase
      .from("schedules")
      .delete()
      .eq("id", schedule_id);
    if (error) {
      console.log("일정 삭제 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
