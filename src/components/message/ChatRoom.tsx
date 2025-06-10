import Profile from "../../assets/images/profile_image.png";
import ChatInput from "./ChatInput";

export default function ChatRoom() {
  return (
    <>
      <div className="w-full h-full py-1 flex flex-col">
        <div className="flex gap-3.5 px-8 items-center">
          <img
            src={Profile}
            className="w-[50px] h-[50px] rounded-full object-cover object-center"
          />
          <div className="flex flex-col">
            <span className="cursor-pointer">차은우</span>
            <div className="flex gap-1 text-[#969696] text-[12px]">
              <span>서울</span>
              <span>만 26세</span>
            </div>
          </div>
        </div>
        <hr className="mx-5 my-3 border-[#969696]" />
        <div className="h-full">
          <div className="flex items-center justify-center">
            <span className="text-[#969696] text-[12px]">2025년 6월 4일</span>
          </div>
          <div className="h-full w-full p-8">
            <div className="flex gap-3.5 items-end">
              <img
                src={Profile}
                className="w-[40px] h-[40px] rounded-full object-cover object-center"
              />
              <div className="flex items-end gap-3.5 mb-4">
                <div className="px-5 py-4 bg-[#f4f4f4] rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl max-w-96 text-[12px]">
                  <span className="">
                    안녕하세요 반가워요
                    <br />
                    잘부탁드려요 잘부탁드립니다!!!!!
                  </span>
                </div>
                <span className="text-[10px] text-[#969696]">12:34 pm</span>
              </div>
            </div>
            <div>
              <div className="flex items-end gap-3.5 mt-4 justify-end">
                <span className="text-[10px] text-[#969696]">12:34 pm</span>
                <div className="px-5 py-4 bg-[#FFC7ED] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none max-w-96 text-[12px]">
                  <span className="">
                    안녕하세요 반가워요
                    <br />
                    잘부탁드려요 잘부탁드립니다!!!!!
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="flex items-end gap-3.5 mb-4">
                  <div className="px-5 py-4 bg-[#f4f4f4] rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl max-w-96 ml-[54px] text-[12px]">
                    <span className="">
                      안녕하세요 반가워요
                      <br />
                      잘부탁드려요 잘부탁드려요 잘부탁드립니다!!!!!!!!!
                      <br />
                      잘부탁드려요 잘부탁드립니다!!!!!!!!! 잘부탁드려요
                      잘부탁드립니다!!!!!!!!!
                    </span>
                  </div>
                  <span className="text-[10px] text-[#969696]">12:34 pm</span>
                </div>
                <div className="flex gap-3.5 items-end">
                  <img
                    src={Profile}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="flex items-end gap-3.5 mb-4">
                    <div className="px-5 py-4 bg-[#f4f4f4] rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl max-w-96 text-[12px]">
                      <span className="">
                        안녕하세요 반가워요
                        <br />
                        잘부탁드려요 잘부탁드립니다!!!!!
                      </span>
                    </div>
                    <span className="text-[10px] text-[#969696]">12:34 pm</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-end gap-3.5 mt-4 justify-end">
                <span className="text-[10px] text-[#969696]">12:34 pm</span>
                <div className="px-5 py-4 bg-[#FFC7ED] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none max-w-96 text-[12px]">
                  <span className="">
                    안녕하세요 반가워요
                    <br />
                    잘부탁드려요 잘부탁드립니다!!!!!
                    잘부탁드립니다!!!!!잘부탁드립니다!!!!!잘부탁드립니다!!!!!잘부탁드립니다!!!!!잘부탁드립니다!!!!!잘부탁드립니다!!!!!잘부탁드립니다!!!!!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChatInput />
      </div>
    </>
  );
}
