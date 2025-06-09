import Imoji from "../../assets/images/spriteImage.png";

import { Outlet } from "react-router";
import ChatList from "../../components/message/ChatList";

export default function MessagePage() {
  return (
    <>
      <div className="w-[1380px] mx-auto gap-10 flex my-[10vh]">
        <div className="w-[420px] h-[1132px] px-9 py-8 box-shadow-custom rounded-2xl">
          <div>
            <div className="flex gap-[29px] justify-center items-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <a
                  className="inline-block w-[30px] h-[26px]"
                  style={{
                    backgroundImage: `url(${Imoji})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "-179px -879px",
                  }}
                ></a>
                <span className="text-[20px]">받은 하트 목록</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer rounded-2xl p-2 hover:border">
                <a
                  className="inline-block w-[26px] h-[22px]"
                  style={{
                    backgroundImage: `url(${Imoji})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "-125px -958px",
                  }}
                ></a>
                <div className="text-[14px]">보낸 하트 목록</div>
              </div>
            </div>
            <ChatList />
          </div>
          <div>
            <div>
              <div className="flex items-center mt-24 gap-[5px] ml-2">
                <a
                  className="inline-block w-[29px] h-[27px] cursor-pointer"
                  style={{
                    backgroundImage: `url(${Imoji})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "-119px -878px",
                  }}
                ></a>
                <span>연결 중</span>
              </div>
            </div>
            <div className="border-2 rounded-2xl p-5 my-5 border-[#d9d9d9] h-[429px] justify-center items-center flex">
              <span className="text-[#969696]">
                아직 연결중인 사람이 없어요!
              </span>
            </div>
          </div>
        </div>
        <div className="w-[878px] h-[1132px] box-shadow-custom rounded-2xl items-center justify-center flex">
          {/* <div className="flex flex-col items-center gap-6">
            <a
              className="inline-block w-[50px] h-[50px] cursor-pointer"
              style={{
                backgroundImage: `url(${Imoji})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-50px -941px",
              }}
            ></a>
            <span className="text-[24px] text-[#969696]">
              DM을 확인해보세요!
            </span>
          </div> */}

          <Outlet />
        </div>
      </div>
    </>
  );
}
