import { useState } from "react";
import MatchingCard from "../../components/MatchingPage/MatchingCard";
import MatchingImage from "../../assets/images/MatchingImage.png";
import Button from "../../components/common/Button";
import LeftBtn from "../../assets/images/Left.png";
import RightBtn from "../../assets/images/right.png";
import MatchingCardInfo from "../../components/MatchingPage/MatchingCardInfo";

export default function MatchingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8 p-6">
        {/* 소개팅 이미지 */}
        <img src={MatchingImage} alt="소개팅소개이미지" />
        {/* 제목 */}
        <div className="text-[32px] font-bold">
          <span className="text-[#FFC7ED]">지유</span>님이 원하시는 소개팅 상대를 찾았어요!
        </div>
        {/* 필터 버튼 그룹 */}
        <div className="flex space-x-8">
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">관심사</span>
          </Button>
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">지역</span>
          </Button>
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">MBTI</span>
          </Button>
        </div>
        {/* 매칭 카드 리스트 */}
        <div className="flex space-x-10 overflow-x-auto py-4">
          {/* 왼쪽 흐린 카드 */}
          <MatchingCard
            blurClass="blur"
            width="w-[350px]"
            height="h-[500px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
            disableFlip={true}
          />

          <div className="relative flex items-center">
            {/* 왼쪽 버튼 */}
            <button className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 z-10">
              <img src={LeftBtn} alt="이전" className="cursor-pointer" />
            </button>

            {/*  중앙 카드 */}
            <MatchingCard />

            {/* 오른쪽 버튼 */}
            <button className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 z-10">
              <img src={RightBtn} alt="다음" className="cursor-pointer" />
            </button>
          </div>

          {/* 오른쪽 흐린 카드 */}
          <MatchingCard
            blurClass="blur"
            width="w-[350px]"
            height="h-[500px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
            disableFlip={true}
          />
        </div>
        {/* 하단 안내 텍스트 */}

        <h2 className="text-[32px] font-bold text-center flex flex-col my-[100px] text-black">
          <span className="text-[#969696] text-[24px]">추천 상대가 마음에 안드신다면,</span>
          다른 소개팅 상대들도 만나보세요!
        </h2>
        {/* 추천 카드 */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-[1500px]">
          {[...Array(5)].map((_, i) => (
            <MatchingCard
              key={i}
              width="w-[300px]"
              height="h-[450px]"
              imageWidth="w-full"
              imageHeight="h-full"
              text="text-[18px]"
              disableFlip={true}
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>
      {/* 추천카드 모달 */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0 flex items-center justify-center
            z-50
            backdrop-blur-sm
          "
        >
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          <div
            className="
              relative z-10
              max-w-md w-full
            "
            onClick={(e) => e.stopPropagation()}
          >
            <MatchingCardInfo />
          </div>
        </div>
      )}
    </>
  );
}
