import supabase from "../../utils/supabase";
import { storeImage } from "../util";

// 게시글 작성 (channelName, 제목, 내용, 이미지(optional))
// 운세 공유 작성 (channelName, 제목, 내용, 이미지(없을 경우 null), 운세)
export const createPost = async (
  channel_name: "free" | "dating",
  title: string,
  contents: string,
  imageFiles?: File[] | null,
  fortune_telling?: string
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const imageUrls: string[] = [];
    imageFiles?.forEach(async (file) => {
      const image = await storeImage(file, "post");
      if (image) {
        imageUrls.push(image);
      }
    });
    const { error } = await supabase.from("posts").insert([
      {
        channel_name,
        author_id: session.user.id,
        title,
        contents,
        images: imageUrls ? imageUrls : null,
        fortune_telling,
      },
    ]);
    if (error) {
      console.log("게시글 작성 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
// postId로 특정 게시글 조회
export const fetchPostByPostId = async (postId: number) => {
  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select(
        `
        title,
        contents,
        created_at,
        fortune_telling,
        images,
        channel:channels!channel_name(
          name,
          description
        ),
        author:profiles!author_id(
          id,
          main_image,
          nickname
        ),
        comments(
          id,
          parent_id,
          comment,
          created_at,
          deleted,
          author:profiles!author_id(
            id,
            main_image,
            nickname
          ),
          comments(
            id,
            comment,
            created_at,
            deleted,
            author:profiles!author_id(
              id,
              main_image,
              nickname
            )
          )
        ),
        likes(
          user_id
        )
        `
      )
      .eq("id", postId)
      .single();
    if (error) {
      console.log("게시물 가져오기 실패:", error.message);
      return;
    }
    return post;
  } catch (e) {
    console.error(e);
  }
};
// 게시글 수정
export const updatePost = async (
  postId: number,
  title: string,
  contents: string,
  prevImages?: string[],
  imageFiles?: File[] | null,
  fortune_telling?: string
) => {
  try {
    const imageUrls: string[] = [];
    imageFiles?.forEach(async (file) => {
      const image = await storeImage(file, "post");
      if (image) {
        imageUrls.push(image);
      }
    });
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        contents,
        images: prevImages ? [...prevImages, ...imageUrls] : [...imageUrls],
        fortune_telling,
      })
      .eq("id", postId);

    if (error) {
      console.log("게시글 작성 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
// 게시글 삭제 (postId)
export const deletePost = async (postId: number) => {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      console.log("게시물 삭제 실패:", error.message);
      return;
    }
    console.log("게시글 삭제 성공");
  } catch (e) {
    console.error(e);
  }
};
