import Imoji from "../../assets/images/spriteImage.png";
import Profile from "../../assets/images/profile_image2.png";
export default function ChatWaiting() {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-[783px] h-[918px] box-shadow-custom rounded-2xl flex items-center justify-center bg-[#FFC7ED]/29">
          <div className="w-[691px] h-[820px] border-[3px] rounded-2xl border-[#FFC7ED] bg-white px-[62px] py-9">
            <div className="flex flex-col items-center gap-2.5">
              <a
                className="inline-block w-[81px] h-[70px] cursor-pointer"
                style={{
                  backgroundImage: `url(${Imoji})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "-176px -944px",
                }}
              ></a>
              <div className="flex flex-col items-center font-semibold gap-3 text-[20px]">
                <span>설렘 전송중 ...</span>
                <span>
                  <span className="text-[#FF66B3]">고윤정</span>님께 하트를
                  보냈어요!
                </span>
              </div>
            </div>
            <div className="flex gap-10 mt-10 mb-[74px] items-center">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={Profile}
                  className="w-[243px] h-[243px] rounded-full"
                />
                <button className="rounded-2xl w-28 h-6 bg-[#FFC7ED] text-[10px] flex items-center justify-center cursor-pointer hover:button-shadow-custom">
                  프로필 보기
                </button>
              </div>
              <div className="w-[284px] h-[317px] rounded-2xl py-3.5 px-[18px] border border-[#d9d9d9]">
                <div className="flex flex-col gap-4 px-3 justify-center items-center">
                  <div className="flex gap-1.5 items-end">
                    <span className="text-[20px] font-bold">고윤정</span>
                    <span className="text-[10px] font-bold text-[#d9d9d9]">
                      만 28세
                    </span>
                  </div>
                  <span className="text-[10px]">
                    안녕하세요 소개입니다 잘부탁드립니다
                  </span>
                </div>
                <hr className="border-[#FFC7ED] w-[248px] my-4" />
                <div className="px-5 justify-between flex text-[14px] text-[#969696] font-bold">
                  <span>168cm</span>
                  <span>서울</span>
                  <span>모델</span>
                  <span>ISTJ</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <button className="rounded-2xl w-[359px] h-[51px] bg-[#d9d9d9] flex items-center justify-center cursor-pointer">
                아직 상대가 하트를 받지 않았어요!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
