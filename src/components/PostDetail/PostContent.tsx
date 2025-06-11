import { useState } from "react";
import Icon from "../common/Icon";
import CommentForm from "./CommentForm";
import { createLike, deleteLike } from "../../apis/like";
// import PostImg from "../../assets/images/post_image.png";

export default function PostContent({
  post,
  postId,
}: {
  post: Post;
  postId: number;
}) {
  const [heart, setHeart] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
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
              {heart ? (
                <Icon
                  width="18px"
                  height="16px"
                  left="-415px"
                  top="-727px"
                  className="cursor-pointer"
                  onClick={handleHeart}
                />
              ) : (
                <Icon
                  width="18px"
                  height="16px"
                  left="-415px"
                  top="-762px"
                  className="cursor-pointer"
                  onClick={handleHeart}
                />
              )}
              <span className="ml-1 text-[14px]">{likesCount}</span>
            </div>
            <span className="text-[14px]">{post.comments.length}개의 댓글</span>
          </div>
        </div>
        <CommentForm isReply={false} />
      </section>
    </>
  );
}
