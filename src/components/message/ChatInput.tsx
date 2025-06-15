import { useState } from "react";
import { sendMessage } from "../../apis/message";
import Icon from "../common/Icon";
import { notifyMessage } from "../../apis/notification";
export default function ChatInput({
  chatRoomId,
  receiverId,
  onSend,
}: {
  chatRoomId?: string | null;
  receiverId?: string | null;
  onSend: (msg: Message) => void;
}) {
  const [message, setMessage] = useState("");

  // 메세지 보내기
  const handleSend = async () => {
    if (!message.trim() || !chatRoomId || !receiverId) return;
    const newMessage = await sendMessage(chatRoomId, message, receiverId);
    await notifyMessage(receiverId, chatRoomId);
    setMessage("");
    if (newMessage && onSend) {
      onSend(newMessage);
    }
    console.log("전송완료");
  };

  return (
    <>
      <div className="flex justify-between gap-2.5 px-7 items-end">
        <input
          className="border border-[var(--gray-300)] rounded-full w-full py-2 px-4 h-full focus:outline-none text-[11px] dark:bg-[var(--dark-white)]"
          placeholder="메세지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              handleSend();
            }
          }}
        />
        <button
          className="w-[95px] h-[45px] bg-[#FFC7ED] rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleSend}
        >
          <Icon width="25px" height="25px" left="-228px" top="-880px" />
        </button>
      </div>
    </>
  );
}
