import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchChatRoom, createChatRoom } from "../../apis/message";
import ChatRoom from "../../components/message/ChatRoom";
import { useAuthStore } from "../../stores/authStore";

export default function ChatRoomPage() {
  const { id: chatPartnerId } = useParams();
  const session = useAuthStore((state) => state.session);
  const authId = session?.user.id;

  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

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
      <ChatRoom userId={chatPartnerId} />
    </>
  );
}
