import coupleImg from "../../assets/images/couplepro.png";
import manImg from "../../assets/images/man.png";
import womanImg from "../../assets/images/woman.png";
import ballon from "../../assets/images/balloon.png";
import "../../styles/icons.css";

export default function Dictionary() {
  return (
    <>
      <div className="mt-[150px] flex flex-col items-center justify-center">
        <p className="mb-[10px] text-[24px] text-[#969696] font-bold">
          사랑이 어려울 땐,
        </p>
        <p className="text-[32px] font-bold">연애 백과 펼치기</p>
      </div>

      <div className="relative w-full flex flex-col items-center mt-[45px]">
        <img src={ballon} alt="말풍선" className="z-10" />
        <div className="absolute top-[115px] z-0 flex flex-col items-center gap-[40px]">
          <div className="relative border rounded-[20px] border-[#FFC7ED] w-[480px] h-[150px] flex items-center bg-white shadow-md">
            <div className="w-[80px] h-[80px] border-[#FFC7ED] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
              <img
                src={coupleImg}
                alt="커플 프로필"
                className="w-full h-full object-cover bg-[#ffebf9]"
              />
            </div>
            <div className="flex flex-col ml-[20px]">
              <div className="flex items-center gap-2 text-[#969696] mb-[5px]">
                <p className="font-semibold text-[16px] text-black">주애정</p>
                <p className="text-[12px]">25.06.05</p>
              </div>
              <p className="text-[14px] font-semibold mb-[5px]">
                여자친구가 너무 좋아요.
              </p>
              <p className="text-[12px] whitespace-pre-line">
                여자친구가 너무 귀엽고 사랑스러워서 행복해요. <br />저 이대로
                행복해도 될까요?
              </p>
            </div>
            <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[#FFC7ED] bg-[#FFC7ED]">
              더보기
            </button>
          </div>

          <div className="flex gap-[50px]">
            <div className="relative border rounded-[20px] border-[#FFC7ED] w-[480px] h-[150px] flex items-center bg-white shadow-md">
              <div className="w-[80px] h-[80px] border-[#FFC7ED] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
                <img
                  src={manImg}
                  alt="남자 프로필"
                  className="w-full h-full object-cover bg-[#ffebf9]"
                />
              </div>
              <div className="flex flex-col ml-[20px]">
                <div className="flex items-center gap-2 text-[#969696] mb-[5px]">
                  <p className="font-semibold text-[16px] text-black">박솔로</p>
                  <p className="text-[12px]">25.06.10</p>
                </div>
                <p className="text-[14px] font-semibold mb-[5px]">
                  연애가 너무 어려워요...
                </p>
                <p className="text-[12px] whitespace-pre-line">
                  좋아하는 사람 앞에서 아무 말도 못하겠어요... <br />
                  이런 저 어떡하죠?
                </p>
              </div>
              <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[#FFC7ED] bg-[#FFC7ED]">
                더보기
              </button>
            </div>

            <div className="relative border rounded-[20px] border-[#FFC7ED] w-[480px] h-[150px] flex items-center bg-white shadow-md">
              <div className="w-[80px] h-[80px] border-[#FFC7ED] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
                <img
                  src={womanImg}
                  alt="여자 프로필"
                  className="w-full h-full object-cover bg-[#ffebf9]"
                />
              </div>
              <div className="flex flex-col ml-[20px]">
                <div className="flex items-center gap-2 text-[#969696] mb-[5px]">
                  <p className="font-semibold text-[16px] text-black">김사랑</p>
                  <p className="text-[12px]">25.04.21</p>
                </div>
                <p className="text-[14px] font-semibold mb-[5px]">
                  제가 선물을 잘 못 골라서 ㅠㅠ
                </p>
                <p className="text-[12px] whitespace-pre-line">
                  남자친구가 곧 생일인데 <br />
                  생일 선물 추천해주세요!
                </p>
              </div>
              <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[#FFC7ED] bg-[#FFC7ED]">
                더보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center mt-[-20px]">
        <div className="flex items-center mb-[10px]">
          <div className="iconA mr-[10px]"></div>
          <p className="text-[20px] font-bold">
            사랑, 커플에세도 솔로에게도 어려워요.
          </p>
        </div>
        <p className="text-[16px]">
          나와 같은 고민을 가진 사용자들과 고민 상담을 해요!<br></br> 연애
          고수들이 명쾌한 답을 알려줄 거예요.<br></br> 데이트 명소나 맛집 정보도
          알 수 있어요.
        </p>
      </div>
    </>
  );
}
