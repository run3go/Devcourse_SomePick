import { useEffect, useState } from "react";
import Icon from "../common/Icon";
import CommentForm from "./CommentForm";
import { createLike, deleteLike } from "../../apis/like";
import { useAuthStore } from "../../stores/authstore";
// import PostImg from "../../assets/images/post_image.png";

export default function PostContent({
  post,
  postId,
}: {
  post: Post;
  postId: number;
}) {
  const { session } = useAuthStore();
  const [heart, setHeart] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  // 사용자가 게시물에 하트를 눌렀는지 여부 확인
  useEffect(() => {
    if (
      session?.user.id &&
      post.likes.some((like) => like.user_id === session.user.id)
    ) {
      setHeart(true);
    }
  }, [session, post.likes]);

  // 사용자가 하트 누르면 옆에 숫자 올라감(내려감)
  const handleHeart = async () => {
    if (!heart) {
      await createLike(postId);
      setHeart(true);
      setLikesCount((prev) => prev + 1);
    } else {
      await deleteLike(postId);
      setHeart(false);
      setLikesCount((prev) => prev - 1);
    }
  };
  return (
    <>
      <section>
        <div className="rounded-2xl bg-white mb-[30px] p-[20px]">
          <div className="">
            <p className="whitespace-pre-line mb-[26px] text-[16px]">
              {post.contents}
            </p>
            {post.image && (
              <img className="w-[178.67px] h-[268px] mb-12" src={post.image} />
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Icon
                width="18px"
                height="16px"
                left={heart ? "-415px" : "-415px"}
                top={heart ? "-727px" : "-762px"}
                className="cursor-pointer"
                onClick={handleHeart}
              />
              <span className="ml-1 text-[14px]">{likesCount}</span>
            </div>
            <span className="text-[14px]">{post.comments.length}개의 댓글</span>
          </div>
        </div>
        <CommentForm isReply={false} postId={postId} />
      </section>
    </>
  );
}
