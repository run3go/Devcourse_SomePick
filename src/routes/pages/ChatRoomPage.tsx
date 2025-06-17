import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createChatRoom, fetchChatRoom } from "../../apis/message";
import ChatRoom from "../../components/message/ChatRoom";
import { useAuthStore } from "../../stores/authstore";

export default function ChatRoomPage() {
  const { id: chatPartnerId } = useParams();
  const session = useAuthStore((state) => state.session);
  const authId = session?.user.id;

  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  // 주소값으로 채팅상대 찾고, 찾은 채팅상대 아이디로 채팅방 아이디 찾아서 출력
  useEffect(() => {
    const prepareChatRoom = async () => {
      if (!chatPartnerId || !authId) return;

      let room = await fetchChatRoom(chatPartnerId);
      if (!room) {
        await createChatRoom(chatPartnerId);
        room = await fetchChatRoom(chatPartnerId);
      }

      if (room) {
        setChatRoomId(room.id);
      }
    };

    prepareChatRoom();
  }, [chatPartnerId, authId]);

  return (
    <>
      <ChatRoom userId={chatPartnerId} chatRoomId={chatRoomId} />
    </>
  );
}
