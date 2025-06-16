import dayjs from "dayjs";
import Icon from "../common/Icon";
import { useState } from "react";
import MoreMenu from "./MoreMenu";
import CommentForm from "./CommentForm";

type CommentListProps = {
  className?: string;
  isReply?: boolean;
  post: Post;
  postId: number;
  onCommentAdd: () => void;
  authId?: string;
};

export default function CommentList({
  // className = "",
  isReply = false,
  post,
  authId,
  postId,
  onCommentAdd,
}: CommentListProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [openReplyId, setOpenReplyId] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);

  // 수정, 삭제 메뉴 열기
  const toggleMenu = (id: number) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  // 답글달기 열기
  const toggleReply = (id: number) => {
    setOpenReplyId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {post.comments
        .slice()
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((comment) => (
          <div key={comment.id}>
            <div className={`${isReply ? "ml-[51px] mr-[18px]" : "mx-[18px]"}`}>
              <div className="flex gap-[5px] items-center ">
                {comment.author.main_image &&
                  (comment.deleted ? (
                    <div className="w-[33px] h-[33px] rounded-full bg-[var(--gray-300)]"></div>
                  ) : (
                    <img
                      className="w-[33px] h-[33px] rounded-full object-center object-cover"
                      src={comment.author.main_image}
                    />
                  ))}

                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center dark:text-[var(--dark-gray-100)]">
                    <span className="cursor-pointer">
                      {comment.deleted ? (
                        <p className="my-[12px] text-[13px] italic text-[var(--gray-500)]">
                          알 수 없음
                        </p>
                      ) : (
                        <p>{comment.author.nickname}</p>
                      )}
                    </span>
                    {authId === comment.author.id && !comment.deleted && (
                      <div
                        className="relative inline-block"
                        onClick={() => toggleMenu(comment.id)}
                      >
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
                        {openMenuId === comment.id && (
                          <MoreMenu
                            onClick={() => toggleMenu(comment.id)}
                            id={comment.id}
                            isParent={!isReply}
                            type="comment"
                            closeMenu={() => setOpenMenuId(null)}
                            onCommentAdd={onCommentAdd}
                            setEditCommentId={() =>
                              setEditCommentId(comment.id)
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    {!comment.deleted && (
                      <>
                        <span className="text-[12px] text-[var(--gray-500)]">
                          {dayjs(comment.created_at).format(
                            "YYYY년 MM월 DD일 HH:mm"
                          )}
                        </span>
                        {comment.edited && (
                          <span className="text-[12px] text-[var(--gray-500)] ml-1">
                            (수정됨)
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {comment.deleted ? (
                  <p className="my-[12px] text-[13px] italic text-[var(--gray-500)]">
                    삭제된 댓글입니다.
                  </p>
                ) : editCommentId === comment.id ? (
                  <CommentForm
                    isEdit={true}
                    defaultValue={comment.comment}
                    commentId={comment.id}
                    postId={postId}
                    post={post}
                    onCommentAdd={() => {
                      onCommentAdd();
                      setEditCommentId(null);
                    }}
                  />
                ) : (
                  <p className="my-[12px] dark:text-[var(--dark-gray-100)]">
                    {comment.comment}
                  </p>
                )}
                {!isReply && !comment.deleted && (
                  <a
                    className="text-[14px] text-[#969696] cursor-pointer"
                    onClick={() => toggleReply(comment.id)}
                  >
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
            {openReplyId === comment.id && (
              <CommentForm
                post={post}
                postId={null}
                parentId={comment.id}
                onCommentAdd={onCommentAdd}
                parentAuthorId={comment.author.id}
                toggleReply={() => toggleReply(comment.id)}
              />
            )}
            {comment.comments?.length > 0 &&
              comment.comments
                .slice()
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )
                .map((reply) => (
                  <CommentList
                    key={reply.id}
                    isReply={true}
                    post={{ ...post, comments: [reply] }}
                    postId={postId}
                    onCommentAdd={onCommentAdd}
                    authId={authId}
                  />
                ))}
          </div>
        ))}
    </>
  );
}
