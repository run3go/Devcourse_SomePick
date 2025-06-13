import { useLoaderData, useNavigate } from "react-router";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import { fetchMessages } from "../../apis/message";
import { useAuthStore } from "../../stores/authStore";
import dayjs from "dayjs";

export default function ChatRoom({
  userId,
  chatRoomId,
}: {
  userId?: string;
  chatRoomId?: string | null;
}) {
  const {
    chatUserProfile,
  }: {
    chatUserProfile: ProfileData;
  } = useLoaderData();
  const session = useAuthStore((state) => state.session);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const authId = session?.user.id;
  useEffect(() => {
    const loadMessages = async () => {
      if (!chatRoomId) return;
      const data = await fetchMessages(chatRoomId);
      if (data) {
        setMessages(data);
      }
    };

    loadMessages();
  }, [chatRoomId]);

  return (
    <>
      <div className="w-full h-full py-0.5 flex flex-col">
        <div className="flex gap-3.5 px-6 items-center">
          <img
            src={chatUserProfile.main_image}
            className="w-[45px] h-[45px] rounded-full object-cover object-center"
          />
          <div className="flex flex-col">
            <span
              className="cursor-pointer text-[14px]"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {chatUserProfile.nickname}
            </span>
            <div className="flex gap-1 text-[var(--gray-00)] text-[11px]">
              <span>{chatUserProfile.location}</span>
              <span>{`만 ${chatUserProfile.age}세`}</span>
            </div>
          </div>
        </div>
        <hr className="mx-5 my-3 border-[var(--gray-300)]" />
        <div className="h-full overflow-y-scroll flex flex-col my-4">
          <div className="flex items-center justify-center">
            {messages.length > 0 && (
              <span className="text-[var(--gray-500)] text-[10px]">
                {dayjs(messages[0].created_at).format("YYYY년 MM월 DD일")}
              </span>
            )}
          </div>
          <div className="h-full w-full px-8 py-6">
            {messages.map((message, index) => {
              if (message.sender_id === authId) {
                return (
                  <div
                    className="flex items-center gap-2.5 mb-4 justify-end w-full"
                    key={index}
                  >
                    <span className="text-[10px] text-[#969696] self-end mb-1">
                      {dayjs(message.created_at).format("HH:mm")}
                    </span>
                    <div className="max-w-96 px-4 py-3 bg-[#FFC7ED] text-black text-right rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none text-[11px] whitespace-pre-line">
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex gap-3.5 items-end" key={index}>
                    <img
                      src={chatUserProfile.main_image}
                      className="w-[35px] h-[35px] rounded-full object-cover object-center"
                    />
                    <div className="flex items-end gap-2.5 mb-4" key={index}>
                      <div className="max-w-96 px-4 py-3 bg-gray-200 text-black mr-auto text-left rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl text-[11px] whitespace-pre-line">
                        <p>{message.message}</p>
                      </div>
                      <span className="text-[10px] text-[#969696]">
                        {dayjs(message.created_at).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <ChatInput chatRoomId={chatRoomId} receiverId={userId} />
      </div>
    </>
  );
}
