import supabase from "../utils/supabase";
// 소개팅 상대 목록 조회 (본인 성별)
export const fetchMatchedUsers = async (gender: "male" | "female") => {
  const targetGender = gender === "male" ? "female" : "male";
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("gender", targetGender)
      .eq("status", "solo");
    if (error) {
      console.log("소개팅 목록 조회 실패:", error.message);
      return;
    }
    console.log(profiles);
    return profiles;
  } catch (e) {
    console.error(e);
  }
};
// 관심 있는 상대에게 하트 보내기 (하트를 받을 상대)
export const sendHeart = async (receiverId: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data } = await supabase
      .from("matchings")
      .select("*")
      .eq("user_id", receiverId)
      .eq("matching_user_id", session.user.id)
      .single();
    if (data) {
      return true;
    }

    const { error: matchingError } = await supabase
      .from("matchings")
      .insert([{ user_id: session.user.id, matching_user_id: receiverId }])
      .select("*")
      .single();
    if (matchingError && matchingError.code === "23505") {
      alert("이미 하트를 보낸 상대입니다.");
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
// 내게 하트를 준 유저와 내가 하트를 보낸 유저 목록 조회
export const fetchMatchingUsers = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data: profiles, error } = await supabase
      .from("matchings")
      .select(
        `
        *,
        sender:profiles!user_id(*),
        reciever:profiles!matching_user_id(*)
        `
      )
      .eq("is_matched", false)
      .or(
        `user_id.eq.${session.user.id}, matching_user_id.eq.${session.user.id}`
      );
    if (error) {
      console.log("유저 목록 조회 실패:", error.message);
      return;
    }
    console.log(profiles);
    return profiles;
  } catch (e) {
    console.error(e);
  }
};

// 매칭 상대 승낙 (하트를 보낸 상대)
export const connectMatching = async (senderId: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("matchings")
      .update({ is_matched: true })
      .eq("user_id", senderId)
      .eq("matching_user_id", session.user.id);
    if (error) {
      console.log("매칭 승낙 실패:", error.message);
      return;
    }
    console.log("매칭 승낙 성공");
  } catch (e) {
    console.error(e);
  }
};
// 매칭 상대 거절 (하트를 보낸 상대)
export const disconnectMatching = async (senderId: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("matchings")
      .delete()
      .eq("user_id", senderId)
      .eq("matching_user_id", session.user.id);
    if (error) {
      console.log("매칭 거절 실패:", error.message);
      return;
    }
    console.log("매칭 거절 성공");
  } catch (e) {
    console.error(e);
  }
};
