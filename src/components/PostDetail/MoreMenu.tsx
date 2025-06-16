import { useNavigate } from "react-router";
import { deletePost } from "../../apis/posts/postCrud";
import Icon from "../common/Icon";
import { toast } from "react-toastify";
import { deleteComment } from "../../apis/comment";

type MoreMenuProps = {
  id: number;
  isParent?: boolean;
  type: "post" | "comment";
  closeMenu: () => void;
  onClick: () => void;
  onCommentAdd?: () => void;
  setEditCommentId?: (id: number) => void;
};

export default function MoreMenu({
  id,
  isParent,
  type,
  onClick,
  closeMenu,
  onCommentAdd,
  setEditCommentId,
}: MoreMenuProps) {
  const navigate = useNavigate();

  // 게시글 삭제 or 댓글 삭제
  const handleDelte = async () => {
    if (type === "post") {
      await deletePost(id);
      toast.success("게시글이 삭제되었습니다.");
      navigate(-1);
    } else if (type === "comment" && isParent) {
      await deleteComment(id, isParent);
      toast.success("댓글이 삭제되었습니다.");
      onCommentAdd?.();
    }
    closeMenu();
  };

  const handleEdit = async () => {
    if (type === "post") {
      navigate(`/post/create/${id}`);
      closeMenu();
    }
  };
  return (
    <>
      <div
        className="absolute right-0 mt-2 bg-white p-2.5 rounded-[10px] border border-[var(--gray-500)] flex flex-col w-[82px] z-50 dark:bg-[var(--dark-bg-secondary)]"
        onClick={onClick}
      >
        <div className="flex items-center justify-center gap-[5px] pb-2.5">
          <button
            className="text-[10px] text-[var(--gray-700)] cursor-pointer dark:text-[var(--dark-gray-100)]"
            onClick={() => {
              if (type === "post") {
                handleEdit();
              } else {
                setEditCommentId?.(id);
                closeMenu();
              }
            }}
          >
            수정하기
          </button>
          <Icon
            width="12px"
            height="12px"
            left="-556px"
            top="-764px"
            className="cursor-pointer dark:left-[-558px] dark:top-[-732px]"
          />
        </div>
        <div className="flex items-center justify-center gap-[5px]">
          <button
            className="text-[var(--red)]/60 text-[10px] cursor-pointer dark:text-[var(--dark-red)]"
            onClick={handleDelte}
          >
            삭제하기
          </button>
          <Icon
            width="12px"
            height="13px"
            left="-597px"
            top="-763px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
