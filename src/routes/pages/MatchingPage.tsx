import MatchingCard from "../../components/MatchingPage/MatchingCard";
import MathingCardInfo from "../../components/MatchingPage/MatchingCardInfo";
import MatchingImage from "../../assets/images/MatchingImage.png";
import Button from "../../components/common/Button1";
import LeftBtn from "../../assets/images/Left.png";
import RightBtn from "../../assets/images/right.png";

export default function MatchingPage() {
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
          <Button width="w-[300px]" height="h-[50px]" borderRadius="100px" text="text-20px">
            관심사
          </Button>
          <Button width="w-[300px]" height="h-[50px]" borderRadius="100px" text="text-20px">
            지역
          </Button>
          <Button width="w-[300px]" height="h-[50px]" borderRadius="100px" text="text-20px">
            MBTI
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
          />
        </div>
        {/* 하단 안내 텍스트 */}
        <MathingCardInfo />
        <h2 className="text-[32px] font-bold text-center flex flex-col my-[100px]">
          <span className="text-[#969696] text-[24px]">추천 상대가 마음에 안드신다면,</span>
          다른 소개팅 상대들도 만나보세요!
        </h2>
        {/* 추천 카드 */}

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-[1500px]">
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
          <MatchingCard
            width="w-[300px]"
            height="h-[450px]"
            imageWidth="w-full"
            imageHeight="h-full"
            text="text-[18px]"
          />
        </div>
      </div>
    </>
  );
}
