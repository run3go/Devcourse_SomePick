// import Icon from "../common/Icon";
// import MoreMenu from "./MoreMenu";

import dayjs from "dayjs";
import Icon from "../common/Icon";
import { useState } from "react";
import MoreMenu from "./MoreMenu";
// import MoreMenu from "./MoreMenu";

// interface CommentProps {
//   className?: string;
//   isReply?: boolean;
// }

type CommentListProps = {
  className?: string;
  isReply?: boolean;
  post: Post;
};

export default function CommentList({
  // className = "",
  isReply = false,
  post,
}: CommentListProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {post.comments.map((comment) => (
        <div key={comment.id}>
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
                  <div
                    className="relative inline-block"
                    onClick={() => toggleMenu(comment.id)}
                  >
                    <Icon
                      width="14px"
                      height="4px"
                      left="-511px"
                      top="-768px"
                      className="cursor-pointer"
                    />
                    {openMenuId === comment.id && (
                      <MoreMenu
                        onClick={() => toggleMenu(comment.id)}
                        id={comment.id}
                        // isParent={comment.parent_id}
                        type="comment"
                        closeMenu={() => setOpenMenuId(null)}
                      />
                    )}
                  </div>
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
        </div>
      ))}
    </>
  );
}
