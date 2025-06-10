import { useNavigate } from "react-router";
import useFadeIn from "../common/useFadeIn";
import SomepickLanding from "./SomepickLanding";
import Icon from "../common/Icon";

type Props = {
  onClickDictionary: () => void;
  onClickMeeting: () => void;
  onClickCalendar: () => void;
  onClickFortune: () => void;
};
export default function Service({
  onClickDictionary,
  onClickMeeting,
  onClickCalendar,
  onClickFortune,
}: Props) {
  const fadeIn = useFadeIn();
  const navigate = useNavigate();

  return (
    <>
      <SomepickLanding
        title="SOMEPICK"
        subtitle="연애의 시작부터 끝까지"
        button="지금 시작하기"
        onClick={() => navigate("/auth/login")}
        backGround="linear-gradient(to bottom right, #ffc7ed, #ffeef9)"
      />
      <div {...fadeIn}>
        <div className="mt-[200px] flex-col flex items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--primary-pink)] font-bold">
            커플도, 솔로도 즐길 수 있는
          </p>
          <h1 className="text-[40px] font-bold">다양한 서비스</h1>
        </div>
        <div className="flex gap-[50px] justify-center mt-[60px]">
          <div
            onClick={onClickDictionary}
            className="flex flex-col items-center justify-center border rounded-[20px] bg-[#FFE6EB] border-[#FFE6EB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              연애 고수가 알려주는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              연애 백과
            </p>
            <div className="shadow-lg rounded-bl-[15px]">
              <Icon
                width="100px"
                height="113.69px"
                left="-457.42px"
                top="-38px"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
          <div
            onClick={onClickMeeting}
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[var(--primary-pink)] border-[var(--primary-pink)]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              솔로를 위한
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              소개팅 서비스
            </p>
            <div className="shadow-lg rounded-b-[15px]">
              <Icon
                width="120.25px"
                height="94.25px"
                left="-183px"
                top="-47px"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
          <div
            onClick={onClickCalendar}
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[#FFF4FB] border-[#FFF4FB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              둘이서 쓰는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              커플 캘린더
            </p>
            <div className="shadow-lg rounded-b-[10px]">
              <Icon
                width="112px"
                height="117.9px"
                left="-41px"
                top="-36px"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
          <div
            onClick={onClickFortune}
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[#E7E6F9] border-[#E7E6F9]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              연애 흐름을 알려주는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              감성 운세
            </p>
            <div className="drop-shadow-lg">
              <Icon
                width="94.16px"
                height="105px"
                left="-333.25px"
                top="-42px"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
