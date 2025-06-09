import "../../styles/icons.css";
// import MainBannerImg from "../../assets/images/banner.png";
import SomepickLanding from "./SomepickLanding";
export default function Service() {
  return (
    <>
      {/* <img src={MainBannerImg} alt="배너 이미지" /> */}
      <SomepickLanding />
      <div className="mt-[160px] flex-col flex items-center justify-center">
        <p className="mb-[10px] text-[24px] text-[#FFC7ED] font-bold">
          커플도, 솔로도 즐길 수 있는
        </p>
        <h1 className="text-[32px] font-bold">다양한 서비스</h1>
      </div>
      <div className="flex gap-[50px] justify-center mt-[60px]">
        <div
          className="flex flex-col items-center justify-center border rounded-[20px] bg-[#FFE6EB] border-[#FFE6EB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
        >
          <p className="mb-[10px] text-[24px] text-[#304463]">
            연애 고수가 알려주는
          </p>
          <p className="mb-[10px] text-[32px] text-[#304463] font-bold">
            연애 백과
          </p>
          <div className="iconDictionary shadow-lg rounded-bl-[15px]"></div>
        </div>
        <div
          className="border rounded-[20px] flex flex-col items-center justify-center bg-[#FFC7ED] border-[#FFC7ED]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
        >
          <p className="mb-[10px] text-[24px] text-[#304463]">솔로를 위한</p>
          <p className="mb-[10px] text-[32px] text-[#304463] font-bold">
            소개팅 서비스
          </p>
          <div className="iconLetter shadow-lg rounded-b-[15px]"></div>
        </div>
        <div
          className="border rounded-[20px] flex flex-col items-center justify-center bg-[#FFF4FB] border-[#FFF4FB]
       w-[300px] h-[400px] shadow-lg shadow-black/25 cursor-pointer"
        >
          <p className="mb-[10px] text-[24px] text-[#304463]">둘이서 쓰는</p>
          <p className="mb-[10px] text-[32px] text-[#304463] font-bold">
            커플 캘린더
          </p>
          <div className="iconCalendar shadow-lg rounded-b-[10px]"></div>
        </div>
        <div
          className="border rounded-[20px] flex flex-col items-center justify-center bg-[#E7E6F9] border-[#E7E6F9]
       w-[300px] h-[400px] mt-[80px] shadow-lg shadow-black/25 cursor-pointer"
        >
          <p className="mb-[10px] text-[24px] text-[#304463]">
            연애 흐름을 알려주는
          </p>
          <p className="mb-[10px] text-[32px] text-[#304463] font-bold">
            감성 운세
          </p>
          <div className="iconBall drop-shadow-lg"></div>
        </div>
      </div>
    </>
  );
}
