import { twMerge } from "tailwind-merge";
import {
  fetchNotifications,
  readNotification,
  readAllNotification,
  subscribeNotification,
} from "../../apis/notification";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Notifications {
  id: number;
  created_at: string;
  sender: {
    id: string;
    nickname: string;
  };
  sender_id: string;
  receiver_id: string;
  post_id?: number;
  message_id?: number;
  matching_id?: number;
  chat_room_id?: number;
  is_matched?: boolean;
  type:
    | "like"
    | "comment"
    | "heart"
    | "follow"
    | "message"
    | "approve"
    | "reject"
    | "schedule";
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);

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

  // 알림 하나 하나 읽음 처리
  const handleNotification = async (notification: Notifications) => {
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

  //  알림 형태
  const formatNotifications = (notification: Notifications) => {
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

  // 새로운 알림 실시간 반영
  // const newNotifications = async () => {
  // }
  return (
    <div
      className={twMerge(
        "w-[450px] h-[353px] p-[10px] border border-[var(--primary-pink)] rounded-[20px]",
        "bg-[#f6f6f6] absolute right-[10px] top-[50px] text-[var(--gray-50)]",
        "flex flex-col items-stretch gap-[10px]"
        // 알림이 전혀 없을 경우
        // "h-[295px]"
      )}
    >
      <div className="relative flex w-full justify-end">
        <span className="absolute left-[10px] top-[7px]">알림</span>
        <button
          onClick={loadNotifications}
          className={twMerge("notification_item px-[18px] cursor-pointer")}
        >
          전체 읽음
        </button>
      </div>
      <ul className="notification_list flex flex-col gap-[10px] overflow-y-scroll">
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
      </ul>
      {/* 알림이 전혀 없을 경우 */}
      {/* <div className="absolute top-[90px] left-1/2 -translate-x-1/2 border w-25 h-25"></div>
      <span className="absolute bottom-[65px] left-1/2 -translate-x-1/2">
        새로운 알림이 없어요!
      </span> */}
    </div>
  );
}
