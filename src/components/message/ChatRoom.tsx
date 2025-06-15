import { useLoaderData, useNavigate } from "react-router";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { fetchMessages, subscribeToMessages } from "../../apis/message";
import { useAuthStore } from "../../stores/authStore";
import dayjs from "dayjs";
import type { RealtimeChannel } from "@supabase/supabase-js";

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
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // 내가 보낸 메세지 바로 보이게
  const handleNewMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const updateSeen = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.sender_id === authId ? { ...msg, seen: true } : msg
      )
    );
  };

  // 메세지 불러오기
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

  // 메세지 실시간 연동
  useEffect(() => {
    if (!chatRoomId) return;
    let channel: RealtimeChannel | null = null;

    const subscribe = async () => {
      const res = await subscribeToMessages(
        chatRoomId,
        (msg: Message) => {
          if (msg.sender_id === authId) return;
          setMessages((prev) => [...prev, msg]);
        },
        updateSeen
      );

      channel = res ?? null;
    };

    subscribe();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  });

  // 메세지 오면 채팅창 맨아래로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="w-full h-full py-0.5 flex flex-col">
        <div className="flex gap-3.5 px-6 items-center dark:text-[var(--dark-gray-100)]">
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
        <hr className="mx-5 my-3 border-[var(--gray-500)] dark:bg-[var(--dark-bg-primary)]" />
        <div className="h-full overflow-y-scroll flex flex-col my-4">
          <div className="h-full w-full px-8">
            {messages.map((message, index) => {
              const currentDate = dayjs(message.created_at).format(
                "YYYY년 MM월 DD일"
              );
              const prevDate =
                index > 0
                  ? dayjs(messages[index - 1].created_at).format(
                      "YYYY년 MM월 DD일"
                    )
                  : null;

              const isNewDate = currentDate !== prevDate;

              return (
                <div key={index}>
                  {isNewDate && (
                    <div className="flex items-center justify-center">
                      <span className="text-[var(--gray-500)] text-[10px] my-2">
                        {currentDate}
                      </span>
                    </div>
                  )}
                  {message.sender_id === authId ? (
                    <div className="flex items-center gap-2.5 mb-4 justify-end w-full">
                      <span className="text-[10px] text-[#969696] self-end mb-1">
                        {dayjs(message.created_at).format("HH:mm")}
                      </span>
                      <div className="max-w-96 px-4 py-3 bg-[#FFC7ED] text-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none text-[11px] whitespace-pre-line">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3.5 items-end">
                      <img
                        src={chatUserProfile.main_image}
                        className="w-[35px] h-[35px] rounded-full object-cover object-center"
                      />
                      <div className="flex items-end gap-2.5 mb-4">
                        <div className="max-w-96 px-4 py-3 bg-gray-200 text-black mr-auto text-left rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl text-[11px] whitespace-pre-line dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-100)]">
                          <p>{message.message}</p>
                        </div>
                        <span className="text-[10px] text-[#969696]">
                          {dayjs(message.created_at).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messageEndRef}></div>
          </div>
        </div>
        <ChatInput
          chatRoomId={chatRoomId}
          receiverId={userId}
          onSend={handleNewMessage}
        />
      </div>
    </>
  );
}
