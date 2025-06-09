import supabase from "../utils/supabase";

// 댓글 작성 (댓글 내용, postId)
// 대댓글을 작성 (댓글 내용, null, parentId)
export const createComment = async (
  comment: string,
  post_id: number | null,
  parent_id?: number
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data: commentData, error } = await supabase
      .from("comments")
      .insert([
        {
          author_id: session.user.id,
          comment,
          post_id,
          parent_id,
        },
      ])
      .select(
        `
        *,
        author:profiles!author_id(
            id,
            main_image,
            nickname
        )`
      )
      .single();
    if (error) {
      console.log("댓글 작성 실패:", error.message);
      return;
    }
    return commentData;
  } catch (e) {
    console.error(e);
  }
};
//댓글 수정 (댓글 내용, commentId)
export const updateComment = async (comment: string, commentId: number) => {
  try {
    const { data: post, error } = await supabase
      .from("comments")
      .update({ comment, edited: true })
      .eq("id", commentId)
      .select(
        `
        *,
        author:profiles!author_id(
            id,
            main_image,
            nickname
        )`
      )
      .single();
    if (error) {
      console.log("게시글 작성 실패:", error.message);
      return;
    }
    return post;
  } catch (e) {
    console.error(e);
  }
};
//댓글 삭제 (commentId, 대댓글 여부)
export const deleteComment = async (commentId: number, isParent: boolean) => {
  if (isParent) {
    try {
      const { error } = await supabase
        .from("comments")
        .update({ comment: "", deleted: true, edited: false })
        .eq("id", commentId);
      if (error) {
        console.log("댓글 삭제 실패:", error.message);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      if (error) {
        console.log("댓글 삭제 실패:", error.message);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }
};
