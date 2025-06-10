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
        <Button className="w-[70px] h-[25px] text-[20px] gap-2 text-black text-sm font-medium">
          <span className="inline-block leading-[1]">팔로우</span>
        </Button>
        <Button className="w-[70px] h-[25px] text-[20px] gap-2 text-black text-sm font-medium">
          <span className="inline-block leading-[1]">프로필</span>
        </Button>
      </div>
    </div>
  );
}
