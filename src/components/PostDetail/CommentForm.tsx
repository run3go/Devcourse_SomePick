import { useState } from "react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { createComment, updateComment } from "../../apis/comment";
// import Alert from "../common/Alert";
import { showSuccessToast, showWarnToast } from "../common/ShowToast";
import { notifyChildComment, notifyComment } from "../../apis/notification";

interface CommentProps {
  className?: string;
  parentId?: number | null;
  isReply?: boolean;
  postId: number | null;
  parentAuthorId?: string;
  post: Post;
  onCommentAdd: () => void;
  toggleReply?: () => void;
  isEdit?: boolean;
  defaultValue?: string;
  commentId?: number;
}

export default function CommentForm({
  className = "",
  parentId,
  isReply = true,
  postId,
  post,
  onCommentAdd,
  toggleReply,
  isEdit = false,
  defaultValue = "",
  commentId,
  parentAuthorId,
}: CommentProps) {
  const [input, setInput] = useState(defaultValue);
  // const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 댓글 등록하기
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      showWarnToast("댓글을 작성해주세요!");
      return;
    }
    // 댓글 수정
    if (isEdit && commentId) {
      await updateComment(input, commentId);
      setInput("");
      onCommentAdd?.();
      showSuccessToast("댓글수정이 완료되었습니다!");
    }
    // 수정 아니면 새로운 댓글 등록
    else {
      const newComment = await createComment(input, postId, parentId);
      showSuccessToast("댓글이 등록되었습니다!");
      if (newComment) {
        setInput("");
        onCommentAdd?.();

        // 대댓글일때
        if (isReply) {
          if (parentId !== null) {
            await notifyChildComment(parentAuthorId!, postId!);
            toggleReply?.();
          }

          // 댓글일때
        } else {
          if (postId !== null) await notifyComment(post.author.id, postId);
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`flex ${className}`}>
          {isReply && (
            <Icon
              width="16px"
              height="16px"
              left="-847px"
              top="-765px"
              className="cursor-pointer ml-[37px] mr-[7px] items-start mt-[10px]"
            />
          )}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="댓글을 작성해주세요."
            className={`bg-white rounded-2xl dark:bg-[var(--dark-bg-secondary)] dark:border-[var(--primary-pink)] dark:border dark:text-[var(--dark-gray-100)] ${
              isReply ? "w-[918px]" : "w-[980px]"
            } resize-none px-[18px] py-[12px] text-[14px] mb-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFC7ED]`}
          ></textarea>
        </div>
        <div className="flex w-full">
          <Button
            type="submit"
            className="ml-auto w-[98px] h-[38px] dark:text-[var(--dark-black)]"
          >
            등록
          </Button>
        </div>
      </form>
      {/* {isAlertOpen && (
        <Alert
          title="댓글을 작성해주세요!"
          isOk="확인"
          onClick={() => setIsAlertOpen(false)}
        />
      )} */}
    </>
  );
}
