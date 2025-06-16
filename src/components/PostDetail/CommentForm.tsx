import { useState } from "react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { createComment } from "../../apis/comment";
import Alert from "../common/Alert";
import { notifyComment } from "../../apis/notification";

interface CommentProps {
  className?: string;
  parentId?: number;
  isReply?: boolean;
  postId: number | null;
  post: Post;
  onCommentAdd: () => void;
  toggleReply?: () => void;
}

export default function CommentForm({
  className = "",
  parentId,
  isReply = true,
  postId,
  post,
  onCommentAdd,
  toggleReply,
}: CommentProps) {
  const [input, setInput] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setIsAlertOpen(true);
      return;
    }
    const newComment = await createComment(input, postId, parentId);
    if (postId !== null) {
      await notifyComment(post.author.id, postId);
    }
    if (newComment) {
      setInput("");
      onCommentAdd?.();
      if (isReply) {
        toggleReply?.();
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
      {isAlertOpen && (
        <Alert
          title="댓글을 작성해주세요!"
          isOk="확인"
          onClick={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}
