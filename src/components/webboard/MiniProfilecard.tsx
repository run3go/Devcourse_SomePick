import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { followUser, unfollowUser } from "../../apis/follow"; // 경로를 실제 API 파일 위치로 조정하세요
import { notifyFollow } from "../../apis/notification";
import { useAuthStore } from "../../stores/authstore";
import Button from "../common/Button";

export default function MiniProfilecard({
  user,
  onClose,
  onFollowToggle,
}: MiniProfilecardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { session } = useAuthStore();

  // 팔로우 상태 관리
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 초기 팔로우 상태 설정 (user.is_followed prop 기반)
  useEffect(() => {
    setIsFollowing(!!user.is_followed);
  }, [user.is_followed]);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // 팔로우/언팔로우 토글 핸들러
  const handleFollowClick = async () => {
    if (!session) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(user.id);
        setIsFollowing(false);
        onFollowToggle?.(user.id, false);
      } else {
        await followUser(user.id);
        await notifyFollow(user.id);
        setIsFollowing(true);
        onFollowToggle?.(user.id, true);
      }
    } catch (error) {
      console.error("팔로우 상태 변경 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="w-[180px] h-[152px] border-2 border-[#FFC7ED] rounded-[20px] p-4 flex flex-col items-center justify-between bg-white shadow-lg dark:bg-[#4B4B4B]"
    >
      {/* 프로필 이미지 */}
      <img
        src={user.main_image ?? "/default-profile.png"}
        alt="프로필"
        className="w-[60px] h-[60px] rounded-full object-cover"
      />

      {/* 이름 */}
      <span className="font-medium text-gray-800 dark:text-white">
        {user.nickname}
      </span>

      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <Button
          onClick={handleFollowClick}
          disabled={loading}
          className="w-[70px] h-[25px] text-sm font-medium"
        >
          {isFollowing ? "언팔로우" : "팔로우"}
        </Button>
        <Button
          onClick={() => navigate(`/profile/${user.id}`)}
          className="w-[70px] h-[25px] text-sm font-medium"
        >
          프로필
        </Button>
      </div>
    </div>
  );
}
