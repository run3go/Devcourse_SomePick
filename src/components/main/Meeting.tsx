import image from "../../assets/images/image 8.png";
import type { Database } from "../../types/supabase";
import MatchingCard from "../MatchingPage/MatchingCard";
import Icon from "../common/Icon";
import useFadeIn from "../common/useFadeIn";
import Tags from "./Tags";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Meeting() {
  const fadeIn = useFadeIn();
  const dummyProfile: Profiles = {
    id: "dummy-id",
    nickname: "사용자",
    age: 25,
    height: 170,
    job: "프론트엔드 개발자",
    location: "서울",
    keywords: ["차분한", "유머있는", "열정적인"],
    interests: ["운동", "코딩", "영화"],
    main_image: image,
    sub_image: image,
    description: "안녕하세요! 함께 대화 나누고 싶은 사람이에요 :)",
    couple_id: null,
    created_at: new Date().toISOString(),
    email: null,
    gender: null,
    ideal_types: null,
    mbti: null,
    partner_nickname: null,
    status: null,
    fortune_telling_id: null,
  };
  return (
    <>
      <div {...fadeIn}>
        <div className="mt-[300px] flex flex-col items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--gray-500)]  font-bold">
            솔로라면?
          </p>
          <p className="text-[40px] font-bold dark:text-[var(--dark-gray-700)]">
            특별한 인연을 만날 수 있는 소개팅
          </p>
        </div>

        <div className="flex justify-center items-start gap-[30px] mt-[40px] dark:text-[var(--dark-gray-700)]">
          <div className="scale-[0.9] mt-[-38px]">
            <MatchingCard
              flipOnHover={true}
              profile={dummyProfile}
              disableActionButton={true}
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Tags />
            <div className="flex items-center mb-[10px] mt-[40px]">
              <div className="mr-[10px]">
                <Icon
                  width="30px"
                  height="30px"
                  left="-171px"
                  top="-330.09px"
                />
              </div>
              <p className="text-[24px] font-bold">내가 원하는 소개팅 상대</p>
            </div>
            <p className="text-[16px] text-[var(--gray-500)] dark:text-[var(--dark-gray-700)]">
              내가 고른 키워드로 내가 원하는 소개팅 상대를 추천해줘요! <br />
              상대도 내가 마음에 든다면 특별한 인연으로 발전할 수 있어요.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
