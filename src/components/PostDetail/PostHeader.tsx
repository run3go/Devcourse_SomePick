import { useState } from "react";
import Icon from "../common/Icon";
import MoreMenu from "./MoreMenu";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function PostHeader({ post }: { post: Post }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <h1 className="text-[20px]">{post.title}</h1>
          <div className="relative inline-block" onClick={toggleMenu}>
            <Icon
              width="14px"
              height="4px"
              left="-511px"
              top="-768px"
              className="cursor-pointer"
            />
            {showMenu && <MoreMenu onClick={toggleMenu} />}
          </div>
        </div>
        <span className="text-[16px] text-[#969696]">
          {dayjs(post.created_at).format("YYYY년 MM월 DD일 HH:mm")}
        </span>
      </header>
      <hr className="my-[15px] border-white border-1" />
      <div className="flex gap-2.5 mb-5 items-center">
        <img
          className="w-[30px] h-[30px] rounded-full object-center object-cover"
          src={post.author.main_image ?? ""}
        />
        <span className="cursor-pointer">{post.author.nickname}</span>
      </div>
    </>
  );
}
