import supabase from "../utils/supabase";
// 채팅 멤버 가져오기
export const fetchChatMembers = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .or(`user1_id.eq.${session.user.id}, user2_id.eq.${session.user.id}`);
    if (error) {
      console.log("채팅방 멤버 조회 실패:", error.message);
      return;
    }
    const chatMembers = data.map((room) =>
      room.user1_id === session.user.id ? room.user2_id : room.user1_id
    );
    return chatMembers;
  } catch (e) {
    console.error(e);
  }
};
// 채팅방 생성 (채팅 상대 id)
export const createChatRoom = async (chatPartnerId: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("chat_rooms").insert([
      {
        user1_id: session.user.id,
        user2_id: chatPartnerId,
      },
    ]);
    if (error) {
      console.log("채팅방 생성 실패:", error.message);
      return;
    }
    console.log("채팅방 생성 성공");
  } catch (e) {
    console.error(e);
  }
};
//채팅방 가져오기
export const fetchChatRoom = async (chatPartnerId: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase
      .from("chat_rooms")
      .select(`*`)
      .or(`user1_id.eq.${session.user.id}, user2_id.eq.${session.user.id}`)
      .or(`user1_id.eq.${chatPartnerId}, user2_id.eq.${chatPartnerId}`)
      .single();
    if (error) {
      console.log("채팅방 조회 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 메시지 가져오기 (채팅방id)
export const fetchMessages = async (chatRoomId: string) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        user:sender_id(
          id,
          nickname,
          main_image
        )
        `
      )
      .eq("chat_room_id", chatRoomId);
    if (error) {
      console.log("메시지 조회 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 메시지 전송 (채팅방id, 메시지 내용, 수신자 id)
export const sendMessage = async (
  chat_room_id: string,
  message: string,
  receiver_id: string
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          chat_room_id,
          message,
          sender_id: session.user.id,
          receiver_id,
        },
      ])
      .select("*")
      .single();
    if (error) {
      console.log("메시지 전송 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 메시지 읽기 (채팅방id)
export const readMessage = async (
  chat_room_id: string,
  receiver_id: string
) => {
  try {
    const { error } = await supabase
      .from("messages")
      .update({
        seen: true,
      })
      .eq("chat_room_id", chat_room_id)
      .eq("receiver_id", receiver_id)
      .eq("seen", false);
    if (error) {
      console.log("메시지 읽기 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
// 메시지 실시간 확인
export const subscribeToMessages = async (
  chat_room_id: string,
  updateMessage: (msg: unknown) => void,
  updateSeen: () => void
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const channel = supabase.channel("messages");
    // 상대방이 메시지를 보낼 경우, 메세지 받아옴 + 읽음 처리
    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_room_id=eq.${chat_room_id}`,
      },
      async (payload) => {
        if (payload.new.sender_id === session.user.id) return;
        const { error } = await supabase
          .from("messages")
          .update({
            seen: true,
          })
          .eq("chat_room_id", chat_room_id)
          .eq("receiver_id", session.user.id)
          .eq("seen", false);
        if (error) {
          console.log("메시지 읽기 실패:", error.message);
          return;
        }
        updateMessage({ ...payload.new, seen: true });
      }
    );
    // 내가 보낸 메시지를 상대가 읽은 경우, 내가 보낸 메시지 전부 읽음 처리
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "messages",
        filter: `chat_room_id=eq.${chat_room_id}`,
      },
      async (payload) => {
        if (payload.new.receiver_id === session.user.id) return;
        updateSeen();
      }
    );
    channel.subscribe();
    return channel;
  } catch (e) {
    console.error(e);
  }
};
