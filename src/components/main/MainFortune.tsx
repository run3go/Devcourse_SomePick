import FortuneCards from "../fortune/FortuneCards";
import { format } from "date-fns";
import useFadeIn from "../common/useFadeIn";
import Icon from "../common/Icon";
export default function MainFortune() {
  const dummyFortuneData = {
    used_at: `${format(new Date(), "yyyy-MM-dd")}`,
    status: "solo",
    love_title: "오늘, 뜻밖의 설렘이 당신을 찾아옵니다",
    love_description:
      "당신이 예상하지 못한 순간, 아주 자연스럽게 누군가가 다가올 가능성이 높습니다. 평소 자주 가던 장소나 익숙한 사람 속에서 새로운 감정을 발견할지도 몰라요. 이미 알고 지낸 사람이 오늘따라 다르게 느껴진다면, 그건 우연이 아닌 운명일 수 있습니다.",
    love_advice:
      "마음을 열고 주변 사람들과의 대화에 집중해보세요. 작은 친절과 관심이 새로운 인연의 시작이 될 수 있습니다. 너무 큰 기대보다는 자연스러운 흐름을 즐기면, 좋은 일이 찾아올 거예요.",
  };
  const fadeIn = useFadeIn();
  return (
    <>
      <div {...fadeIn}>
        <div className="mt-[300px] flex flex-col items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--gray-500)] font-bold">
            지금 내 연애, 어디쯤일까?
          </p>
          <p className="text-[40px] font-bold dark:text-[var(--dark-gray-700)]">
            운세로 체크!
          </p>
        </div>

        <div className=" mb-[60px]">
          <FortuneCards
            fortuneData={dummyFortuneData}
            onModal={false}
          ></FortuneCards>
        </div>
        <div className="flex flex-col items-center text-center mt-[-30px]">
          <div className="flex items-center mb-[10px]">
            <div className="mr-[10px]">
              <Icon
                width="30px"
                height="30px"
                left="-231px"
                top="-330.09px"
              ></Icon>
            </div>
            <p className="text-[24px] font-bold dark:text-[var(--dark-gray-700)]">
              내 연애운을 확인해요.
            </p>
          </div>
          <p className="text-[16px] text-[var(--gray-500)] dark:text-[var(--dark-gray-700)]">
            오늘의 연애운을 확인하세요!<br></br>
            결과를 게시판에 공유할 수도 있어요.
          </p>
        </div>
      </div>
    </>
  );
}
