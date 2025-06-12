import { useEffect, useRef } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router";

export default function MiniProfilecard({ user, onClose }: MiniProfilecardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={wrapperRef}
      className="w-[180px] h-[152px]
                 border-2 border-[#FFC7ED] rounded-[20px]
                 p-4 flex flex-col items-center justify-between
                 bg-white shadow-lg"
    >
      {/* 프로필 이미지 */}
      <img
        src={user.main_image!}
        alt="프로필"
        className="w-[60px] h-[60px] rounded-full object-cover"
      />

      {/* 이름 */}
      <span className="font-medium text-gray-800">{user.nickname}</span>

      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <Button className="w-[70px] h-[25px] text-sm font-medium">팔로우</Button>
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
