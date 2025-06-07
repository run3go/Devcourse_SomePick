import Button from "../common/Button";
import image from "../../assets/images/KakaoTalk_20241210_084712919.jpg";

export default function MiniProfilecard() {
  return (
    <div
      className="w-[180px] h-[152px] border-2 border-[#FFC7ED] rounded-[20px]
                    p-4 flex flex-col items-center justify-between"
    >
      {/* 프로필 이미지 */}
      <img src={image} alt="프로필" className="w-[60px] h-[60px] rounded-full object-cover" />

      {/* 이름 */}
      <span className="font-medium text-gray-800">이현우</span>

      {/* 팔로우 버튼 */}
      <div className="flex gap-3">
        <Button width="w-[70px]" height="h-[25px]" borderRadius="12px">
          팔로우
        </Button>
        <Button width="w-[70px]" height="h-[25px]" borderRadius="12px">
          프로필
        </Button>
      </div>
    </div>
  );
}
