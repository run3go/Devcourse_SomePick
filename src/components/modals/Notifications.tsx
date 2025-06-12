import { twMerge } from "tailwind-merge";
import {
  fetchNotifications,
  readNotification,
  readAllNotification,
  subscribeNotification,
} from "../../apis/notification";
import { useState } from "react";

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
  comment_id?: number;
  message_id?: number;
  matching_id?: number;
  like_id?: number;
  chat_room_id?: number;
  is_matched?: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState(null);

  // 전체 알림 목록 가져오기
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await fetchNotifications();
      console.log(data);
      // setNotifications(data)
    } catch (e) {
      console.log("에러", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 알림 하나 하나 읽음 처리
  const handleNotification = async () => {
    try {
      //읽지 않은 알림을 읽음 처리
    } catch (e) {
      console.log("알림읽기", e);
    }
  };

  // 전체 읽음
  const handleAllNotifications = async () => {
    try {
      const data = await readAllNotification();
      console.log(data);
      // setNotifications((prev) => prev.map(n => ({...n, })))
    } catch (e) {
      console.log("전체 알림", e);
    }
  };

  //  알림 형태
  const formatNotifications = (notification: Notifications) => {
    const senderName = notification.sender.nickname || "누군가";
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
