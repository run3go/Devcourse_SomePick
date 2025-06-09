import ChatItem from "./ChatItem";

export default function ChatList() {
  return (
    <>
      <div className="border-2 rounded-2xl p-3 my-5 border-[#d9d9d9] h-[429px]">
        <ChatItem name="차은우" />
        <hr className="border-[#969696] mx-2" />
        <ChatItem name="차은우" />
        <hr className="border-[#969696] mx-2" />
        <ChatItem name="차은우" />
      </div>
    </>
  );
}
