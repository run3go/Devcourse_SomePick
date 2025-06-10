import ChatItem from "./ChatItem";

export default function ChatList() {
  return (
    <>
      <div className="border rounded-2xl p-1.5 my-3 border-[var(--primary-pink)] h-[300px] overflow-auto">
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
