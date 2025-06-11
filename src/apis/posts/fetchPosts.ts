import supabase from "../../utils/supabase";
// channelId로 특정 채널의 게시글 모두 조회 (오프셋, 채널아이디, 정렬순)
export const fetchPostsByChannelName = async (
  channelName: "free" | "dating",
  offset: number,
  sortRule: "created_at" | "likes",
  keyword: string = ""
) => {
  const postLimit = 10;
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!author_id(
          id,
          main_image,
          nickname
        ),
        comments(
          nested:comments(
            id
          )
        ),
        likes(
          id
        )
        `
      )
      .eq("channel_name", channelName)
      .or(`title.ilike.%${keyword}%, contents.ilike.%${keyword}%)`)
      .order("created_at", { ascending: false })
      .range(offset * postLimit, (offset + 1) * postLimit - 1);

    if (error) {
      console.log("게시물 가져오기 실패:", error.message);
      return;
    }

    if (sortRule === "likes") {
      console.log(posts.sort((a, b) => b.likes.length - a.likes.length));
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    }
    return posts;
  } catch (e) {
    console.error(e);
  }
};
// authorId로 특정 유저의 게시글 모두 조회
export const fetchPostsByAuthorId = async (
  authorId: string,
  offset: number = 0
) => {
  const postLimit = 10;
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
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
          nested:comments(
            id
          )
        ),
        likes(
          id
        )
        `
      )
      .eq("author_id", authorId)
      .order("created_at", { ascending: false })
      .range(offset * postLimit, (offset + 1) * postLimit - 1);
    if (error) {
      console.log("게시물 가져오기 실패:", error.message);
      return;
    }
    return posts;
  } catch (e) {
    console.error(e);
  }
};
// 팔로우한 유저들의 게시글 조회
export const fetchPostsByFollow = async (offset: number = 0) => {
  try {
    const postLimit = 10;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data: followList, error: followError } = await supabase
      .from("follows")
      .select("follow_id")
      .eq("user_id", session.user.id);

    if (followError) {
      console.log("팔로우 목록 가져오기 실패:", followError.message);
      return;
    }

    const followIdList = followList.map((item) => item.follow_id);

    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
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
          nested:comments(
            id
          )
        ),
        likes(
          id
        )
        `
      )
      .in("author_id", followIdList)
      .order("created_at", { ascending: false })
      .range(offset * postLimit, (offset + 1) * postLimit - 1);
    if (error) {
      console.log("게시물 가져오기 실패:", error.message);
      return;
    }
    console.log(posts);
  } catch (e) {
    console.error(e);
  }
};
