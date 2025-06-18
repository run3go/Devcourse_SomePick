import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import Icon from "../common/Icon";

interface PostcardProps {
  className?: string;
  post: PostData;
  isProfile?: boolean;
  // 클릭 이벤트를 받아서 author와 event를 부모로 전달
  onProfileClick?: (
    author: Author,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export default function Postcard({
  className,
  post,
  isProfile = false,
  onProfileClick,
}: PostcardProps) {
  const navigate = useNavigate();

  // 댓글 갯수
  const totalCommentCount = post.comments.reduce((acc, parentComment) => {
    const validChildCount = (parentComment.comments ?? []).filter(
      (child) => !child.deleted
    ).length;

    // 부모 댓글이 살아있을때 + 대댓글
    if (!parentComment.deleted) {
      return acc + 1 + validChildCount;
    }

    // 부모 댓글 삭제되고 대댓글만 남을때
    return acc + validChildCount;
  }, 0);

  return (
    <div
      onClick={() => navigate(`/post/detail/${post.id}`)}
      className={twMerge(
        "flex items-stretch w-[1360px] h-[280px] border-2 rounded-xl border-[#FFC7ED]",
        "hover:border-[#FF66B3] hover:shadow-lg transition-all duration-200",
        "bg-white cursor-pointer p-8 dark:bg-[#4B4B4B]",
        className
      )}
    >
      <div className="flex-1 flex flex-col">
        {isProfile && post.channel && (
          <span className="text-sm text-[var(--primary-pink)] font-bold mb-4">
            {post.channel.description}
          </span>
        )}
        <div className="space-y-2">
          {/* 프로필 (클릭 영역) */}
          <div
            className="inline-flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onProfileClick?.(post.author, e);
            }}
          >
            <img
              src={post.author.main_image ?? undefined}
              alt="사진"
              className="w-[44px] h-[44px] rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <span className="font-medium dark:text-[var(--dark-gray-700)]">
                {post.author.nickname}
              </span>
              <span className="text-[#969696]">
                {dayjs(post.created_at).format("YYYY.MM.DD")}
              </span>
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold dark:text-[var(--dark-gray-700)]">
            {post.title}
          </h2>

          {/* 본문 */}
          <p className="leading-relaxed line-clamp-2 dark:text-[var(--dark-gray-700)]">
            {post.contents}
          </p>
        </div>

        {/* 좋아요  댓글 */}
        <div className="flex items-center space-x-6 mt-auto dark:text-[var(--dark-gray-700)]">
          <div className="flex items-center gap-[5px]">
            {/* 기본모드용 아이콘 */}
            <Icon
              className="block dark:hidden"
              width="18px"
              height="16px"
              left="-415px"
              top="-762px"
            />
            {/* 다크모드용 아이콘 */}
            <Icon
              className="hidden dark:block"
              width="17px"
              height="16px"
              left="-416px"
              top="-793px"
            />
            <span className="h-5.5">{post.likes.length}</span>
          </div>
          <div className="flex items-center gap-[6px]">
            {/* 기본모드용 아이콘 */}
            <Icon
              className="block dark:hidden"
              width="16px"
              height="16px"
              left="-463px"
              top="-762px"
            />
            {/* 다크모드용 아이콘 */}
            <Icon
              className="hidden dark:block"
              width="17px"
              height="17px"
              left="-375px"
              top="-792px"
            />
            <span className="h-5.5">{totalCommentCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* 우측 이미지 */}
      <div className="p-4 flex-shrink-0 self-center">
        {post.images?.[0] && (
          <img
            src={post.images[0]}
            alt="Post"
            className={twMerge(
              "w-[241px] h-[214px] object-cover rounded-[16px]",
              isProfile && "w-[150px] h-[150px]"
            )}
          />
        )}
      </div>
    </div>
  );
}
