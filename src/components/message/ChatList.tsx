import ChatItem from "./ChatItem";

export default function ChatList() {
  return (
    <>
      <div className="border rounded-2xl p-3 my-5 border-[var(--primary-pink)] h-[350px] overflow-auto">
        <ChatItem name="차은우" />
        <hr className="border-[var(--primary-pink)] mx-2" />
        <ChatItem name="차은우" />
        <hr className="border-[var(--primary-pink)] mx-2" />
        <ChatItem name="차은우" />
        <hr className="border-[var(--primary-pink)] mx-2" />
        <ChatItem name="차은우" />
      </div>
    </>
  );
}
