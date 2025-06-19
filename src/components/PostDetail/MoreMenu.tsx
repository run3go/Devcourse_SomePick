import { useNavigate } from "react-router";
import { deletePost } from "../../apis/posts/postCrud";
import Icon from "../common/Icon";
import { deleteComment } from "../../apis/comment";
import { useEffect, useRef, useState } from "react";
import { showSuccessToast } from "../common/ShowToast";
import Alert from "../common/Alert";

type MoreMenuProps = {
  id: number;
  isParent?: boolean;
  type: "post" | "comment";
  closeMenu: () => void;
  onClick: () => void;
  onCommentAdd?: () => void;
  setEditCommentId?: (id: number) => void;
  comment?: Comments;
};

export default function MoreMenu({
  id,
  type,
  onClick,
  closeMenu,
  onCommentAdd,
  setEditCommentId,
  comment,
}: MoreMenuProps) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 게시글 삭제 or 댓글 삭제
  const handleDelete = async () => {
    if (type === "post") {
      await deletePost(id);
      showSuccessToast("게시글이 삭제되었습니다.");
      navigate(-1);
    } else if (type === "comment") {
      const isActuallyParent = comment?.parent_id === null; // 부모아이디가 없다? 그냥 댓글이다
      const hasChild = (comment?.comments?.length ?? 0) > 0; // 대댓글이 없다

      const isDelete = isActuallyParent && hasChild; // 그냥 댓글이고 대댓글이 없으면

      await deleteComment(id, !isDelete);
      showSuccessToast("댓글이 삭제되었습니다.");
      onCommentAdd?.();
    }
    closeMenu();
  };

  const openDeleteAlert = () => {
    setIsAlertOpen(true);
  };

  // 마우스 다른곳 클릭했을때 메뉴 종료
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  // 수정하기 눌렀을때 게시글 수정페이지로 이동
  const handleEdit = async () => {
    if (type === "post") {
      navigate(`/post/create/${id}`);
      closeMenu();
    }
  };

  return (
    <>
      <div
        className="absolute right-0 mt-2 bg-white p-2.5 rounded-[10px] border border-[var(--gray-500)] flex flex-col w-[89px] z-50 dark:bg-[var(--dark-bg-secondary)]"
        onClick={onClick}
        ref={menuRef}
      >
        <div className="flex items-center justify-center gap-[5px] pb-2.5">
          <button
            className="text-[12px] text-[var(--gray-700)] cursor-pointer dark:text-[var(--dark-gray-100)]"
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
            className="cursor-pointer dark:hidden"
          />
          <Icon
            width="12px"
            height="12px"
            left="-558px"
            top="-732px"
            className="cursor-pointer hidden dark:block"
          />
        </div>
        <div className="flex items-center justify-center gap-[5px]">
          <button
            className="text-[var(--red)]/60 text-[12px] cursor-pointer dark:text-[var(--dark-red)]"
            onClick={() => openDeleteAlert()}
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
        {isAlertOpen && (
          <Alert
            title={
              type === "post"
                ? "게시글을 삭제하시겠습니까?"
                : "댓글을 삭제하시겠습니까?"
            }
            isOk="네"
            isNotOk="아니요"
            onClick={() => {
              setIsAlertOpen(false);
              handleDelete();
            }}
            onCancel={() => setIsAlertOpen(false)}
          />
        )}
      </div>
    </>
  );
}
