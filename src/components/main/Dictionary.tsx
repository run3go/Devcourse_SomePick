import coupleImg from "../../assets/images/couplepro.png";
import manImg from "../../assets/images/man.png";
import womanImg from "../../assets/images/woman.png";
import ballon from "../../assets/images/balloon.png";
import "../../styles/icons.css";
import useFadeIn from "../common/useFadeIn";
import Icon from "../common/Icon";

export default function Dictionary() {
  const fadeIn = useFadeIn();
  return (
    <>
      <div {...fadeIn}>
        <div className="mt-[300px] flex flex-col items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--gray-500)] font-bold">
            사랑이 어려울 땐,
          </p>
          <p className="text-[40px] font-bold">연애 백과 펼치기</p>
        </div>

        <div className="relative w-full flex flex-col items-center mt-[10px]">
          <img src={ballon} alt="말풍선" className="z-10" />
          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "1060px", top: "48px" }}
          >
            연애고수
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "1060px", top: "75px" }}
          >
            네! 당연하죠~ ㅎ ㅎ
          </div>

          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "565px", top: "95px" }}
          >
            연애교수님
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "565px", top: "120px" }}
          >
            앞으로 오래가시길~
          </div>

          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "415px", top: "260px" }}
          >
            짝사랑5년차
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "415px", top: "285px" }}
          >
            저도 그래요 ㅜㅜ
          </div>

          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "715px", top: "470px" }}
          >
            썸타는중
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "715px", top: "495px" }}
          >
            용기있게 다가가요!
          </div>

          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "1120px", top: "480px" }}
          >
            러브홀릭
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "1120px", top: "505px" }}
          >
            지갑 어때요??
          </div>

          <div
            className="absolute z-20 text-[16px] font-bold text-[var(--gray-700)]"
            style={{ left: "1395px", top: "260px" }}
          >
            사랑둥이
          </div>
          <div
            className="absolute z-20 text-[12px] font-bold text-[var(--gray-500)]"
            style={{ left: "1395px", top: "285px" }}
          >
            편지도 꼭 쓰기!
          </div>
          <div className="absolute top-[115px] z-0 flex flex-col items-center gap-[40px]">
            <div className="relative border rounded-[20px] border-[var(--primary-pink)] w-[480px] h-[150px] flex items-center shadow-md">
              <div className="w-[80px] h-[80px] border-[var(--primary-pink)] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
                <img
                  src={coupleImg}
                  alt="커플 프로필"
                  className="w-full h-full object-cover bg-[#ffebf9]"
                />
              </div>
              <div className="flex flex-col ml-[20px]">
                <div className="flex items-center gap-2 text-[var(--gray-500)] mb-[5px]">
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
              <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[var(--primary-pink)] bg-[var(--primary-pink)]">
                더보기
              </button>
            </div>

            <div className="flex gap-[50px]">
              <div className="relative border rounded-[20px] border-[var(--primary-pink)] w-[480px] h-[150px] flex items-center  shadow-md">
                <div className="w-[80px] h-[80px] border-[var(--primary-pink)] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
                  <img
                    src={manImg}
                    alt="남자 프로필"
                    className="w-full h-full object-cover bg-[#ffebf9]"
                  />
                </div>
                <div className="flex flex-col ml-[20px]">
                  <div className="flex items-center gap-2 text-[var(--gray-500)] mb-[5px]">
                    <p className="font-semibold text-[16px] text-black">
                      박솔로
                    </p>
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
                <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[var(--primary-pink)] bg-[var(--primary-pink)]">
                  더보기
                </button>
              </div>

              <div className="relative border rounded-[20px] border-[var(--primary-pink)] w-[480px] h-[150px] flex items-center  shadow-md">
                <div className="w-[80px] h-[80px] border-[var(--primary-pink)] border shadow-lg overflow-hidden flex-shrink-0 rounded-full ml-[30px]">
                  <img
                    src={womanImg}
                    alt="여자 프로필"
                    className="w-full h-full object-cover bg-[#ffebf9]"
                  />
                </div>
                <div className="flex flex-col ml-[20px]">
                  <div className="flex items-center gap-2 text-[var(--gray-500)] mb-[5px]">
                    <p className="font-semibold text-[16px] text-black">
                      김사랑
                    </p>
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
                <button className="absolute bottom-[10px] right-[20px] border rounded-[20px] w-[70px] h-[25px] text-[12px] border-[var(--primary-pink)] bg-[var(--primary-pink)]">
                  더보기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mt-[-20px]">
          <div className="flex items-center mb-[10px]">
            <div className="mr-[10px]">
              <Icon
                width="30px"
                height="30px"
                left="-291px"
                top="-330.09px"
                className="hover:cursor-pointer"
              ></Icon>
            </div>
            <p className="text-[24px] font-bold">
              사랑, 커플에게도 솔로에게도 어려워요.
            </p>
          </div>
          <p className="text-[16px] text-[var(--gray-500)]">
            나와 같은 고민을 가진 사용자들과 고민 상담을 해요!<br></br> 연애
            고수들이 명쾌한 답을 알려줄 거예요.<br></br> 데이트 명소나 맛집
            정보도 알 수 있어요.
          </p>
        </div>
      </div>
    </>
  );
}
