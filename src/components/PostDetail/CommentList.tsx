// import Icon from "../common/Icon";
// import MoreMenu from "./MoreMenu";

import dayjs from "dayjs";

// interface CommentProps {
//   className?: string;
//   isReply?: boolean;
//   profileImg?: string;
//   name?: string;
//   time?: string;
//   content?: string;
// }

type CommentListProps = {
  isReply?: boolean;
  post: Post;
};

export default function CommentList({
  //   className = "",
  isReply = false,
  // profileImg,
  // name,
  // time,
  // content,
  post,
}: CommentListProps) {
  return (
    <>
      {post.comments.map((comment) => (
        <>
          <div className={`${isReply ? "ml-[51px] mr-[18px]" : "mx-[18px]"}`}>
            <div className="flex gap-[5px] items-center ">
              {comment.author.main_image && (
                <img
                  className="w-[33px] h-[33px] rounded-full object-center object-cover"
                  src={comment.author.main_image}
                />
              )}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="cursor-pointer">
                    {comment.author.nickname}
                  </span>
                  {/* <div className="relative inline-block">
                <Icon width="14px" height="4px" left="-511px" top="-768px" />
                <MoreMenu />
              </div> */}
                </div>
                <span className="text-[12px] text-[#969696]">
                  {dayjs(comment.created_at).format("YYYY년 MM월 DD일 HH:mm")}
                </span>
              </div>
            </div>
            <div>
              <p className="my-[12px]">{comment.comment}</p>
              {!isReply && (
                <a className="text-[14px] text-[#969696] cursor-pointer">
                  답글 달기
                </a>
              )}
            </div>
          </div>
          <hr
            className={`${
              isReply ? "ml-[33px]" : ""
            } my-[12px] border-white border-1`}
          />
        </>
      ))}
    </>
  );
}
