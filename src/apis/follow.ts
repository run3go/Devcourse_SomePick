import supabase from "../utils/supabase";
// 유저 팔로우 목록 가져오기 ()
export const fetchFollowList = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data: followings, error: followingError } = await supabase
      .from("follows")
      .select(
        `
        following:follow_id(
            id,
            nickname,
            main_image
        )
        `
      )
      .eq("user_id", session.user.id);
    if (followingError) {
      console.log("팔로우 실패:", followingError.message);
      return;
    }
    const { data: followers, error: followerError } = await supabase
      .from("follows")
      .select(
        `
        follower:follow_id(
            id,
            nickname,
            main_image
        )
        `
      )
      .eq("follow_id", session.user.id);
    if (followerError) {
      console.log("팔로우 실패:", followerError.message);
      return;
    }
    console.log("팔로우 성공");
    return { followings, followers };
  } catch (e) {
    console.error(e);
  }
};
// 유저 팔로우 하기 (유저 아이디)
export const followUser = async (follow_id: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("follows").insert([
      {
        user_id: session.user.id,
        follow_id,
      },
    ]);
    if (error) {
      console.log("팔로우 실패:", error.message);
      return;
    }
    console.log("팔로우 성공");
  } catch (e) {
    console.error(e);
  }
};
// 유저 언팔로우 하기 (유저 아이디)
export const unfollowUser = async (follow_id: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follow_id", follow_id);
    if (error) {
      console.log("언팔로우 실패:", error.message);
      return;
    }
    console.log("언팔로우 성공");
  } catch (e) {
    console.error(e);
  }
};
