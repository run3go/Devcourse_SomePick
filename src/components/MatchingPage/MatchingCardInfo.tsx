import image from "../../assets/images/image 8.png";
import Button from "../common/Button";

export default function MathingCardInfo() {
  return (
    <div
      className="
        w-[600px] h-[800px]
        rounded-[20px]
        overflow-hidden
        shadow-md
      "
    >
      {/* 상단 */}
      <div
        className="
          w-full h-[400px]
          bg-[#F6F6F6]
          flex flex-col items-center justify-center space-y-4
        "
      >
        {/* 이미지 */}
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <img src={image} alt="프로필 이미지" className="w-full h-full object-cover" />
        </div>
        {/* 한줄소개 */}
        <p className="text-[24px] text-center">여기에 한줄 소개가 들어갑니다.</p>
      </div>

      {/* 하단 */}
      <div
        className="
          w-full h-[400px]
          bg-white
          flex flex-col items-center justify-center gap-[40px]
        "
      >
        {/* 이름 */}
        <h2 className="text-[32px] text-[#FFC7ED] font-semibold">차은우</h2>
        {/* 하트보내기 버튼 */}
        <div className="flex gap-[30px]">
          <Button
            width="w-[200px]"
            height="h-[60px]"
            text="text-[20px] text-[#FFFFFF] font-[850]"
            borderRadius="10px"
            icon={
              <span
                className="
                white-heart
                inline-block
                mr-2
                relative
                top-[3px]
              "
              />
            }
          >
            하트 보내기
          </Button>
          {/* 프로필 보기 버튼 */}
          <Button
            width="w-[200px]"
            height="h-[60px]"
            text="text-[20px] text-[#FFFFFF] font-[850]"
            borderRadius="10px"
            icon={
              <span
                className="
                white-user
                inline-block
                mr-2
                relative
                top-[5px]
              "
              />
            }
          >
            프로필 보기
          </Button>
        </div>
        <div className="text-[20px] text-[#969696] flex gap-11">
          <span>만25세</span>
          <span>180cm</span>
          <span>서울</span>
          <span>공무원</span>
        </div>
      </div>
    </div>
  );
}
