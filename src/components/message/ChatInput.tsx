import Icon from "../common/Icon";
export default function ChatInput() {
  return (
    <>
      <div className="flex justify-between gap-2.5 px-7 items-end">
        <input
          className="border border-[#969696] rounded-full w-full py-2 px-4 h-full focus:outline-none text-[12px]"
          placeholder="메세지를 입력해주세요."
        />
        <button className="w-[100px] h-[45px] bg-[#FFC7ED] rounded-full flex items-center justify-center cursor-pointer">
          <Icon width="25px" height="25px" left="-253px" top="-873px" />
        </button>
      </div>
    </>
  );
}
