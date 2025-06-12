import { twMerge } from "tailwind-merge";
import {
  fetchNotifications,
  readNotification,
  readAllNotification,
  subscribeNotification,
} from "../../apis/notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Icon from "../common/Icon";
import type { Notification } from "../../types/notification";
// import type { RealtimeChannel } from "@supabase/supabase-js";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 알림이 있으면 동그라미 띄우고 없으면 안띄움
  const [isSeen, setIsSeen] = useState(false);

  // 전체 알림 목록 가져오기
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await fetchNotifications();
      console.log("안녕", data);
      if (data) {
        setNotifications(data);
      }
    } catch (e) {
      console.log("에러", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadNotifications();
    };
    fetchData();
  }, []);

  // 알림 하나 하나 읽음 처리
  const handleNotification = async (notification: Notification) => {
    try {
      if (notification.id) {
        await readNotification(notification.id);
      }
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));

      switch (notification.type) {
        case "like":
        case "comment":
          if (notification.post_id) {
            navigate(`/post/detail/${notification.post_id}`);
          }
          break;
        case "heart":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/request`);
          }
          break;
        case "message":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/room`);
          }
          break;
        case "approve":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/room`);
          }
          break;
        case "reject":
          break;
        case "follow":
          if (notification.sender_id) {
            navigate(`/profile/${notification.sender_id}`);
          }
          break;
        case "schedule":
          if (notification.sender_id) {
            navigate(`/couplecalendar`);
          }
          break;
        default:
          return `새로운 알림이 없어요!`;
      }
    } catch (e) {
      console.log("알림읽기", e);
    }
  };

  // 전체 읽음
  const handleAllNotifications = async () => {
    try {
      await readAllNotification();
      setNotifications([]);
    } catch (e) {
      console.log("전체 알림", e);
    }
  };

  // 실시간 알림
  // useEffect(() => {
  // const channel: RealtimeChannel | null;

  //   const subscribe = async () => {
  //       channel = await subscribeNotification((notification: Notification) => {
  //       setNotifications((prev) => [notification, ...prev]);
  //     });
  //   };

  //   subscribe();

  //   return () => {
  //     channel?.unsubscribe();
  //   };
  // }, []);

  //  알림 형태
  const formatNotifications = (notification: Notification) => {
    const senderName = notification.sender.nickname || "누군가";
    switch (notification.type) {
      case "like":
        return `${senderName}님이 회원님의 게시글에 좋아요를 눌렀어요.`;
      case "comment":
        return `${senderName}님이 회원님의 게시글에 댓글을 달았어요.`;
      case "heart":
        return `누군가가 회원님에게 소개팅 하트를 보냈어요!`;
      case "follow":
        return `${senderName}님이 회원님을 팔로우 했어요.`;
      case "message":
        return `${senderName}님이 메세지를 보냈어요!`;
      case "approve":
        return `${senderName}님이 소개팅을 수락했어요!`;
      case "reject":
        return `${senderName}님이 소개팅을 거절했어요...ㅠㅠ`;
      case "schedule":
        return `${senderName}님이 일정을 추가했어요!`;
      default:
        return `새로운 알림이 없어요!`;
    }
  };

  return (
    <div
      className={twMerge(
        "w-[450px] h-[353px] p-[10px] border border-[var(--primary-pink)] rounded-[20px]",
        "bg-[#f6f6f6] absolute right-[10px] top-[50px] text-[var(--gray-50)]",
        "flex flex-col items-stretch gap-[10px]"
      )}
    >
      <div className="relative flex w-full justify-end">
        <span className="absolute left-[10px] top-[7px]">알림</span>
        {notifications.length > 0 && (
          <>
            <button
              onClick={handleAllNotifications}
              className={twMerge("notification_item px-[18px] cursor-pointer")}
            >
              전체 읽음
            </button>
          </>
        )}
      </div>
      <ul className="notification_list flex flex-col gap-[10px] overflow-y-scroll">
        {isLoading ? (
          <li className="notification_item w-full text-center">
            불러오는 중..
          </li>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotification(notification)}
              className="notification_item w-full text-center"
            >
              {formatNotifications(notification)}
            </li>
          ))
        ) : (
          <>
            <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-25 h-25">
              <Icon
                width="100px"
                height="100px"
                left="-41px"
                top="-605.09px"
                className="cursor-pointer"
              ></Icon>
            </div>
            <span className="absolute bottom-[65px] left-1/2 -translate-x-1/2">
              새로운 알림이 없어요!
            </span>
          </>
        )}
      </ul>
      {notifications.length > 0 && !isSeen && (
        <span className="absolute top-[-58px] right-[-12px] text-[var(--primary-pink)] text-[18px]">
          ●
        </span>
      )}
    </div>
  );
}
