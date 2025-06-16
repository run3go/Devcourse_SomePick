import { useState } from "react";
import Icon from "../common/Icon";
import MoreMenu from "./MoreMenu";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useNavigate } from "react-router";

export default function PostHeader({
  post,
  postId,
  authId,
}: {
  post: Post;
  postId: number;
  authId?: string;
}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  return (
    <>
      <header>
        <div className="flex justify-between items-center dark:text-[var(--dark-gray-100)]">
          <h1 className="text-[20px]">{post.title}</h1>
          {post.author.id === authId && (
            <div className="relative inline-block" onClick={toggleMenu}>
              <Icon
                width="14px"
                height="4px"
                left="-511px"
                top="-768px"
                className="cursor-pointer dark:hidden"
              />
              <Icon
                width="14px"
                height="4px"
                left="-511px"
                top="-736px"
                className="cursor-pointer hidden dark:block"
              />
              {showMenu && (
                <MoreMenu
                  onClick={toggleMenu}
                  id={postId}
                  type="post"
                  closeMenu={() => setShowMenu(false)}
                />
              )}
            </div>
          )}
        </div>
        <span className="text-[16px] text-[#969696]">
          {dayjs(post.created_at).format("YYYY년 MM월 DD일 HH:mm")}
        </span>
      </header>
      <hr className="my-[15px] border-white border dark:border-[var(--dark-gray-500)]" />
      <div className="flex gap-2.5 mb-5 items-center">
        <img
          className="w-[30px] h-[30px] rounded-full object-center object-cover"
          src={post.author.main_image ?? ""}
        />
        <span
          className="cursor-pointer dark:text-[var(--dark-gray-100)]"
          onClick={() => navigate(`/profile/${post.author.id}`)}
        >
          {post.author.nickname}
        </span>
      </div>
    </>
  );
}
