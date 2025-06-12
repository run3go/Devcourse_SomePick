import supabase from "../utils/supabase";
//좋아요 알림 보내기 ( 게시글 작성자 아이디, 게시글 아이디)
export const notifyLike = async (receiver_id: string, post_id: number) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("notifications")
      .insert([
        { sender_id: session.user.id, receiver_id, post_id, type: "like" },
      ]);
    if (error) {
      console.log("좋아요 알림 실패:", error.message);
      return;
    }
    console.log("좋아요 알림 성공");
  } catch (e) {
    console.error(e);
  }
};
//댓글 작성 알림 보내기 ( 게시글 작성자 아이디, 게시글 아이디 )
export const notifyComment = async (receiver_id: string, post_id: number) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("notifications")
      .insert([
        { sender_id: session.user.id, receiver_id, post_id, type: "comment" },
      ]);
    if (error) {
      console.log("댓글 알림 실패:", error.message);
      return;
    }
    console.log("댓글 알림 성공");
  } catch (e) {
    console.error(e);
  }
};
//소개팅 하트 알림 보내기 ( 상대방 아이디, 매칭 아이디 )
export const notifyHeart = async (receiver_id: string, matching_id: number) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("notifications")
      .insert([
        { sender_id: session.user.id, receiver_id, matching_id, type: "heart" },
      ]);
    if (error) {
      console.log("하트 알림 실패:", error.message);
      return;
    }
    console.log("하트 알림 성공");
  } catch (e) {
    console.error(e);
  }
};
//매칭 수락/거절 알림 보내기 ( 상대방 아이디, 매칭 아이디 )
export const notifyMatching = async (
  receiver_id: string,
  is_matched: boolean,
  chat_room_id?: string
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("notifications").insert([
      {
        sender_id: session.user.id,
        receiver_id,
        chat_room_id,
        type: is_matched ? "approve" : "reject",
      },
    ]);
    if (error) {
      console.log("매칭 알림 실패:", error.message);
      return;
    }
    console.log("매칭 알림 성공");
  } catch (e) {
    console.error(e);
  }
};
//팔로우 알림 보내기
export const notifyFollow = async (receiver_id: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("notifications")
      .insert([{ sender_id: session.user.id, receiver_id, type: "follow" }]);
    if (error) {
      console.log("팔로우 알림 실패:", error.message);
      return;
    }
    console.log("팔로우 알림 성공");
  } catch (e) {
    console.error(e);
  }
};
//메시지 알림 보내기
export const notifyMessage = async (
  receiver_id: string,
  chat_room_id: string
) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("notifications").insert([
      {
        sender_id: session.user.id,
        receiver_id,
        chat_room_id,
        type: "message",
      },
    ]);
    if (error) {
      console.log("메시지 알림 실패:", error.message);
      return;
    }
    console.log("메시지 알림 성공");
  } catch (e) {
    console.error(e);
  }
};

// 스케줄 알림 보내기
export const notifySchedule = async (receiver_id: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("notifications").insert([
      {
        sender_id: session.user.id,
        receiver_id,
        type: "schedule",
      },
    ]);
    if (error) {
      console.log("일정 알림 실패:", error.message);
      return;
    }
    console.log("일정 알림 성공");
  } catch (e) {
    console.error(e);
  }
};

//알림 가져오기
export const fetchNotifications = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase
      .from("notifications")
      .select(
        `
        *,
        sender:profiles!notifications_sender_id_fkey(
            id,
            nickname
        )
        `
      )
      .eq("receiver_id", session.user.id);
    if (error) {
      console.log("알림 조회 실패:", error.message);
      return;
    }
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
//알림 읽기 (알림 id)
export const readNotification = async (notificationId: number) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);
    if (error) {
      console.log("알림 읽기 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
//알림 전부 읽기
export const readAllNotification = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("receiver_id", session.user.id);
    if (error) {
      console.log("알림 읽기 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
//실시간 알림 받기 (알림 업데이트 함수)
export const subscribeNotification = async (
  updateNotification: (payload: unknown) => void
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;
  const channel = supabase.channel("notifications");
  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "notifications",
      filter: `receiver_id=eq.${session.user.id}`,
    },
    (payload) => {
      console.log(payload.new);
      updateNotification(payload.new);
    }
  );
  channel.subscribe();
  return channel;
};
