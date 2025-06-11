import Icon from "../common/Icon";
import CommentForm from "./CommentForm";
// import PostImg from "../../assets/images/post_image.png";

export default function PostContent({ post }: { post: Post }) {
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
                left="-415px"
                top="-762px"
                className="cursor-pointer"
              />
              <span className="ml-1 text-[14px]">{post.likes.length}</span>
            </div>
            <span className="text-[14px]">{post.comments.length}개의 댓글</span>
          </div>
        </div>
        <CommentForm isReply={false} />
      </section>
    </>
  );
}
