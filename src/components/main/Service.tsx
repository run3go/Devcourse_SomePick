import "../../styles/icons.css";
import useFadeIn from "../common/useFadeIn";
// import MainBannerImg from "../../assets/images/banner.png";
import SomepickLanding from "./SomepickLanding";
export default function Service() {
  const fadeIn = useFadeIn();
  return (
    <>
      <SomepickLanding />
      <div {...fadeIn}>
        <div className="mt-[200px] flex-col flex items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--primary-pink)] font-bold">
            커플도, 솔로도 즐길 수 있는
          </p>
          <h1 className="text-[40px] font-bold">다양한 서비스</h1>
        </div>
        <div className="flex gap-[50px] justify-center mt-[60px]">
          <div
            className="flex flex-col items-center justify-center border rounded-[20px] bg-[#FFE6EB] border-[#FFE6EB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              연애 고수가 알려주는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              연애 백과
            </p>
            <div className="iconDictionary shadow-lg rounded-bl-[15px]"></div>
          </div>
          <div
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[var(--primary-pink)] border-[var(--primary-pink)]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              솔로를 위한
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              소개팅 서비스
            </p>
            <div className="iconLetter shadow-lg rounded-b-[15px]"></div>
          </div>
          <div
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[#FFF4FB] border-[#FFF4FB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              둘이서 쓰는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              커플 캘린더
            </p>
            <div className="iconCalendar shadow-lg rounded-b-[10px]"></div>
          </div>
          <div
            className="border rounded-[20px] flex flex-col items-center justify-center bg-[#E7E6F9] border-[#E7E6F9]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
          >
            <p className="mb-[10px] text-[24px] text-[var(--gray-500)]">
              연애 흐름을 알려주는
            </p>
            <p className="mb-[10px] text-[32px] text-[var(--gray-700)] font-bold">
              감성 운세
            </p>
            <div className="iconBall drop-shadow-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
