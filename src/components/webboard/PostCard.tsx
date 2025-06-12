// src/components/webboard/PostCard.tsx
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface PostcardProps {
  className?: string;
  post: PostData;
  isProfile?: boolean;
  // 클릭 이벤트를 받아서 author와 event를 부모로 전달
  onProfileClick?: (author: Author, e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Postcard({
  className,
  post,
  isProfile = false,
  onProfileClick,
}: PostcardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/detail/${post.id}`)}
      className={twMerge(
        "flex items-stretch w-[1360px] h-[280px] border-2 rounded-xl border-[#FFC7ED]",
        "hover:border-[#FF66B3] hover:shadow-lg transition-all duration-200",
        "bg-white cursor-pointer p-8",
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
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onProfileClick?.(post.author, e);
            }}
          >
            <img
              src={post.author.main_image ?? undefined}
              alt="사진"
              className="w-[44px] h-[40px] rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <span className="font-medium">{post.author.nickname}</span>
              <span className="text-[#969696]">2025.06.07</span>
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold">{post.title}</h2>

          {/* 본문 */}
          <p className="leading-relaxed line-clamp-2">{post.contents}</p>
        </div>

        {/* 좋아요 · 댓글 */}
        <div className="flex items-center space-x-6 mt-auto">
          <div className="flex items-center">
            <span className="heart mr-1" />
            <span>{post.likes.length}</span>
          </div>
          <div className="flex items-center">
            <span className="comment mr-1" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </div>

      {/* 우측 이미지 */}
      <div className="p-4 flex-shrink-0 self-center">
        {post.image && (
          <img
            src={post.image}
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
