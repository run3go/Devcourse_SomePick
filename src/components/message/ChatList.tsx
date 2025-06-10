import ChatItem from "./ChatItem";

export default function ChatList({
  onChatClick,
  selectedTab,
}: {
  onChatClick?: () => void;
  selectedTab?: string;
}) {
  function handleClick() {
    onChatClick?.();
  }

  return (
    <>
      <div className="border rounded-2xl p-1.5 my-3 border-[var(--primary-pink)] h-[300px] overflow-auto">
        {selectedTab === "보낸 하트" ? (
          <>
            <ChatItem name="차은우" onClick={handleClick} />
            <hr className="border-[var(--primary-pink)] mx-2" />
            <ChatItem name="변우석" onClick={handleClick} />
          </>
        ) : (
          <>
            <ChatItem name="정해인" onClick={handleClick} />
            <hr className="border-[var(--primary-pink)] mx-2" />
            <ChatItem name="강하늘" onClick={handleClick} />
          </>
        )}
      </div>
    </>
  );
}
