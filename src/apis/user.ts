import supabase from "../utils/supabase";
// 유저 프로필 조회 (userId)
export const fetchProfile = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        couple:couple_id (
            user1:profiles!user_id (
                id,
                nickname,
                main_image
            ),
            user2:profiles!partner_id (
                id,
                nickname,
                main_image
            )
        )
        `
      )
      .eq("id", userId)
      .single();
    if (error) {
      console.log("프로필 조회 실패:", error.message);
      return;
    }
    return profile;
  } catch (e) {
    console.error(e);
  }
};
// 프로필 수정 (수정 정보)
export const updateProfile = async (payload: ProfileUpdatePayload) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data: profile, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", session.user.id)
      .select("*")
      .single();
    if (error) {
      console.log("프로필 수정 실패:", error.message);
      return error;
    }
    const { error: sessionError } = await supabase.auth.updateUser({
      data: {
        ...payload,
        keywords: payload.keywords?.join(","),
        ideal_types: payload.ideal_types?.join(","),
        interests: payload.interests?.join(","),
      },
    });
    if (sessionError) {
      console.log("세션 업데이트 실패:", sessionError);
      return;
    }
    return profile;
  } catch (e) {
    console.error(e);
  }
};
// 서로 커플 지목 시 (상대 닉네임, 본인 성별)
export const checkCouple = async (
  partner_nickname: string,
  gender: "male" | "female"
) => {
  const targetGender = gender === "male" ? "female" : "male";
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("gender", targetGender)
      .eq("status", "couple")
      .eq("nickname", partner_nickname)
      .single();
    if (error) {
      console.log("커플 지목 실패:", error.message);
      return;
    }
    // 상대방이 설정한 커플 닉네임이 내 닉네임과 일치할 경우
    if (profile.partner_nickname === session.user.user_metadata.nickname) {
      const { data: coupleData, error: coupleError } = await supabase
        .from("couples")
        .insert([
          {
            user_id: session.user.id,
            partner_id: profile.id,
          },
        ])
        .select("*")
        .single();

      if (coupleError) {
        console.log("커플 생성 실패:", coupleError.message);
        return;
      }
      const { error } = await supabase
        .from("profiles")
        .update({
          couple_id: coupleData.id,
        })
        .or(`id.eq.${session.user.id}, id.eq.${profile.id}`);

      if (error) {
        console.log("커플 생성 실패:", error.message);
        return;
      }
      console.log("커플 생성 성공");
    }
  } catch (e) {
    console.error(e);
  }
};
