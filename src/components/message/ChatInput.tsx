import Imoji from "../../assets/images/spriteImage.png";
export default function ChatInput() {
  return (
    <>
      <div className="flex justify-between gap-2.5 px-7 items-end">
        <input
          className="border border-[#969696] rounded-full w-full p-4 h-full focus:outline-none"
          placeholder="메세지를 입력해주세요."
        />
        <button className="w-[127px] h-[60px] bg-[#FFC7ED] rounded-full flex items-center justify-center cursor-pointer">
          <a
            className="inline-block w-[35px] h-[35px]"
            style={{
              backgroundImage: `url(${Imoji})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "-253px -873px",
            }}
          ></a>
        </button>
      </div>
    </>
  );
}
