import supabase from "../utils/supabase";
// 좋아요 하기 (게시글 아이디)
export const createLike = async (post_id: number) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("likes").insert([
      {
        user_id: session.user.id,
        post_id,
      },
    ]);
    if (error) {
      console.log("좋아요 실패:", error.message);
      return;
    }
    console.log("좋아요 성공");
  } catch (e) {
    console.error(e);
  }
};
// 좋아요 취소 (게시글 아이디)
export const deleteLike = async (post_id: number) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;
  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", session.user.id)
      .eq("post_id", post_id);
    if (error) {
      console.log("좋아요 취소 실패:", error.message);
      return;
    }
    console.log("좋아요 취소 성공");
  } catch (e) {
    console.error(e);
  }
};
