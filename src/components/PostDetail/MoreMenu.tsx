import { useNavigate } from "react-router";
import { deletePost } from "../../apis/posts/postCrud";
import Icon from "../common/Icon";

type MoreMenuProps = {
  postId: number;
  closeMenu: () => void;
  onClick: () => void;
};

export default function MoreMenu({
  postId,
  onClick,
  closeMenu,
}: MoreMenuProps) {
  const navigate = useNavigate();

  const handleDelte = async () => {
    await deletePost(postId);
    closeMenu();
    alert("삭제 성공!");
    navigate("/post/free");
  };
  return (
    <>
      <div
        className="absolute right-0 mt-2 bg-white p-2.5 rounded-[10px] border border-[var(--gray-500)] flex flex-col w-[82px] z-50"
        onClick={onClick}
      >
        <div className="flex items-center justify-center gap-[5px] pb-2.5">
          <button className="text-[10px] text-[var(--gray-700)] cursor-pointer">
            수정하기
          </button>
          <Icon
            width="12px"
            height="12px"
            left="-556px"
            top="764px"
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center gap-[5px]">
          <button
            className="text-[var(--red)]/60 text-[10px] cursor-pointer"
            onClick={handleDelte}
          >
            삭제하기
          </button>
          <Icon
            width="12px"
            height="13px"
            left="-597px"
            top="763px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
